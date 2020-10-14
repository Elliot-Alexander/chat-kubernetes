<template>
  <div class="flex-shrink w-11/12 lg:w-9/12  max-w-md mx-auto my-5">
    <h1 class="text-5xl text-center mb-8 text-white">Welcome to Chat</h1>
    <form class="bg-white md:shadow-2xl rounded px-8 py-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="firstname">
          First Name
        </label>
        <input v-model="first" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="firstname" type="text" placeholder="First Name">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="lastname">
          Last Name
        </label>
        <input v-model="last" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="lastname" type="text" placeholder="Last Name">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="email">
          Email
        </label>
        <input v-model="email" class="shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" id="email" type="email" placeholder="Email">
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
      <div v-if="submitted" class="shadow bg-green-700 rounded mb-6 text-center font-semibold text-white">
        <p class="py-2">Sweet! Check your email for confirmation </p>
      </div>
      <div class="flex mb-4 justify-center">
        <button v-on:click="register()" class="text-white font-bold py-3 rounded w-1/2 bg-gradient-to-r from-teal-400 to-indigo-700">
          <span>Sign Up</span>
        </button>
      </div>
    </form>
    <div class="text-center text-white">
      <p>Already have an account? <router-link to="/login" class="underline">Login here!</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Register",

  data: () => ({
    first: '',
    last: '',
    email: '',
    password: '',
    error: false,
    submitted: false
  }),

  methods: {
    register: function(){
      if(this.first === ''|| this.last === '' || this.email === '' || this.password === ''){
        this.error = true;
      }else{
        this.error = false;
        axios.post('http://'+ window.location.host + ':3000/api/auth/register', {
          first: this.first,
          last: this.last,
          email: this.email,
          password: this.password
        }).then(function (response) {
          console.log(response.status)
          if(response.status === 400){
            this.error = true;
          }else if(response.status === 200){
            this.submitted = true;
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>