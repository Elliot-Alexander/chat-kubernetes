<template>
  <div class="w-11/12 lg:w-9/12 max-w-md mx-auto my-5">
    <h1 class="text-5xl text-center mb-8 text-white">Login</h1>
    <form class="bg-white md:shadow-2xl rounded px-8 py-6 pb-8 mb-4 w-full">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="username">
          Email
        </label>
        <input v-model="email" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="username" type="email" placeholder="Email">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="password" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none" id="password" type="password" placeholder="Password">
      </div>
      <div v-if="error" class="shadow bg-red-700 rounded mb-6 text-center font-semibold text-white">
        <p class="py-2">Oops! Looks like there's something wrong.</p>
      </div>
      <div class="flex mb-4 justify-center mb-4">
        <button v-on:click="login()" class="text-white font-bold py-3 rounded w-1/2 bg-gradient-to-r from-teal-400 to-indigo-700">
          <span>Sign In</span>
        </button>
      </div>
    </form>
    <div class="text-center text-white">
      <p>New to Chat? <router-link to="/register" class="underline">Sign up here.</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Login",

  data: () => ({
    email: '',
    password: '',
    error: false,
    submitted: false
  }),

  methods: {
    login: function(){
      if(this.email === '' || this.password === ''){
        this.error = true;
      }else{
        this.error = false;
        axios.post('http://'+ window.location.host +':3000/api/auth/login', {
          email: this.email,
          password: this.password
        }).then(res => {
          console.log(res.data)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('email', res.data.email)
          localStorage.setItem('userId', res.data.userId)
          this.$router.push('/chat')
          this.$router.go(1)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>