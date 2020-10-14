import Vue from 'vue'
import Router from 'vue-router'
import axios from "axios";
// import os from "os";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {name: 'login'}
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( '../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import( '../views/Register.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import( '../views/Chat.vue'),
      beforeEnter: (to, from, next) => {
        axios.post('http://' + window.location.host  + ':3000/api/auth/tokenCheck', {
          email: localStorage.getItem('email'),
          token: localStorage.getItem('token')
        }).then(response =>{
          if(response.data){
            next()
          }else{
            next({
              path: '/login',
              params: { nextUrl: to.fullPath }
            })
          }
        })
      }
    }
  ]
})
