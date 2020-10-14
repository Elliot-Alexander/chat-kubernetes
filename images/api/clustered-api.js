//Express Configuration
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
let corsOptions = {
    // origin: ['http://localhost', 'http://192.168.175.24'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//MySQL configuration
const mysql = require('mysql')
let connector = mysql.createConnection({
    host: "mariadb",
    user: "root",
    password: "MyDBRoot123",
    database: "chat"
})

//BCrypt Configuration
const bcrypt = require('bcrypt');
const  saltRounds = 10;

//JWT Configuration
const jwt = require('jsonwebtoken')
const axios = require("axios");
const secret = "5468576D5A7134743777217A25432A46";


const numCPUs = require('os').cpus().length/2;
const cluster = require('cluster')

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('death', function (worker) {
        console.log('worker ' + worker.pid + ' died. restarting...');
        cluster.fork()
    })
} else {
    app.use(cors(corsOptions))
    app.use(bodyParser.json())
    const port = 3000

    app.post('/api/auth/register', (req, res) => {
        console.log("Request made to /api/auth/register on Worker " + cluster.worker.id)
        try{
            let first = req.body.first
            let last = req.body.last
            let email = req.body.email
            let password = req.body.password
            let duplicateUser = false;

            let sql = `SELECT email FROM users WHERE email = '${email}'`
            connector.query(sql, function(err, result) {
                if (err) throw err
                if(result.length !== 0) duplicateUser = true
                console.log("Duplicate user detection resulted: "+ duplicateUser)

                if(email.includes("@") && email.includes(".") && !duplicateUser){
                    bcrypt.genSalt(saltRounds, function(err, salt) {
                        bcrypt.hash(password, salt, function(err, hash) {
                            let sql = `INSERT INTO users (first_name, last_name, email, password) VALUES ('${first}', '${last}', '${email}', '${hash}')`
                            connector.query(sql, function (err) {
                                if (err) throw err
                                console.log("Successfully added user " + email)
                                res.sendStatus(200)
                            })
                        });
                    });
                }else{
                    console.log("ERROR: Email in does not contain correct characters or already in use!")
                    res.sendStatus(400)
                }
            })
        }catch (err){
            console.log(err)
            res.sendStatus(400)
        }
    })

    app.post('/api/auth/login', (req, res) => {
        console.log("Request made to /api/auth/login on Worker " + cluster.worker.id)
        try{
            let email = req.body.email
            let password = req.body.password
            let hash = null
            let sql = `SELECT id, password FROM users WHERE email = '${email}'`
            connector.query(sql, function (err, result) {
                if (err) throw err
                hash = result[0].password
                let user = result[0].id
                bcrypt.compare(password, hash).then(function(result) {
                    if(result){
                        jwt.sign({'id': user}, secret, {expiresIn: "1h"}, function (err, token){
                            res.send({'email': email, 'token': token, 'userId': user});
                            console.log("User " + user + " logged in successful authenticated and received a token");
                        })
                    }else{
                        console.log("User " + user + " did not login successfully, was not passed a token");
                    }
                });
            })
        }catch (err){
            console.log(err)
        }
    })

    app.post('/api/auth/tokenCheck', (req, res) => {
        console.log("Request made to /api/auth/tokenCheck on Worker " + cluster.worker.id)
        let token = req.body.token
        let email = req.body.email
        if(token !== undefined){
            let sql = `SELECT id FROM users WHERE email='${email}'`
            connector.query(sql, function (error, result) {
                jwt.verify(token, secret, function (err, decoded){
                    try{
                        if(decoded.id === result[0].id){
                            console.log("User is authenticated")
                            res.send(true)
                        }else{
                            console.log("bad error")
                            res.send(false)
                        }
                    }catch (e){
                        console.log("Token probably expired")
                        res.send(false)
                    }
                })
            })
        }
    })

    app.post('/api/chat/new', (req, res) => {
        console.log("Request made to /api/chat/new on Worker " + cluster.worker.id)
        axios.post('http://localhost:3000/api/auth/tokenCheck', {
            email: req.body.email,
            token: req.body.token
        }).then(response => {
            if(response.data){
                let sql = `INSERT INTO messages (userId, message) VALUES ('${req.body.userId}', '${req.body.message}')`
                connector.query(sql, function (err) {
                    if (err) throw err
                    let sql = `SELECT first_name FROM users WHERE id = ${req.body.userId}`
                    connector.query(sql, function (err, result) {
                        res.send(result)
                    })
                })
            }
        })
    })

    app.post('/api/chat/generate', (req, res) => {
        console.log("Request made to /api/chat/generate on Worker " + cluster.worker.id)
        let sql = `SELECT messages.*, users.first_name FROM messages JOIN users ON users.id = messages.userId ORDER BY messages.id`
        connector.query(sql, function (error, result) {
            res.send(result)
        })
    })


    app.listen(port, () => {
        console.log(`Chat listening on http://localhost:${port} on Worker ${cluster.worker.id}`)
    })
}

