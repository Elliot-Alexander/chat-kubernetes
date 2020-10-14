<template>
  <div class="w-full flex flex-row shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700">
    <div class="w-full">
      <input v-on:keyup.enter="sendMessage" v-model="message" type="text" placeholder="Send a message" class="w-full leading-tight focus:outline-none">
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  data: () => ({
    message: ''
  }),
  methods: {
    sendMessage: function (){
      console.log("sending message")
      this.$socket.emit('new_message', {
        userId: localStorage.getItem('userId'),
        email: localStorage.getItem('email'),
        token: localStorage.getItem('token'),
        message: this.message
      })
      this.message = ''
    }
  }
}
</script>

<style scoped>

</style>