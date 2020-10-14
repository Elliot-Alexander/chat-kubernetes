const axios = require("axios");
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {})

const numCPUs = require('os').cpus().length/2;
const cluster = require('cluster')
const sticky = require('sticky-session')
const redis = require('socket.io-redis')

if (!sticky.listen(server, 4000)) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('death', function (worker) {
        console.log('worker ' + worker.pid + ' died. restarting...');
        cluster.fork()
    })
} else {
    io.adapter(redis({ host: 'redis', port: 6379 }));
    console.log("Started socket Worker " + cluster.worker.id )
    io.on('connection', socket => {
        socket.on('setup_client', (data) => {
            console.log("Setting up client on Worker " + cluster.worker.id)
            axios.post('http://auth-api:3000/api/auth/tokenCheck', {
                email: data.email,
                token: data.token
            }).then(res => {
                if(res.data){
                    socket.user = data.email
                    axios.post('http://auth-api:3000/api/chat/generate', {
                        email: data.email,
                        token: data.token
                    }).then(response => {
                        console.log("Emitting previous messages from Worker " + cluster.worker.id)
                        socket.emit('previous_messages', {
                            data: response.data
                        })
                    })
                    console.log("Added user " + socket.user)
                }
            })
        })

        socket.on('new_message', (data) => {
            console.log("Received new message on Worker " + cluster.worker.id)
            axios.post('http://auth-api:3000/api/chat/new', {
                userId: data.userId,
                email: data.email,
                token: data.token,
                message: data.message
            }).then(res => {
                console.log("Emitting new message from Worker " + cluster.worker.id)
                socket.emit('incoming_message', {
                    name: '',
                    message: data.message,
                    receiver: false
                })
                socket.broadcast.emit('incoming_message', {
                    name: res.data[0].first_name,
                    message: data.message,
                    receiver: true
                })
            })
        })


        // socket.on('chat', (data) => {
        //     socket.join(data.friendName)
        //     //TODO get all previous messages
        //     socket.emit()
        // })

        socket.on('disconnect', socket => {
            console.log(socket.user + " disconnected")
        })
    })
}

