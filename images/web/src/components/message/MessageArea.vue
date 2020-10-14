<template>
  <div class="bg-white md:shadow-2xl rounded px-8 py-6 pb-8 mb-4 w-full h-full flex flex-col">
    <div class="h-full" v-smoothscrollbar="{ undefined, undefined }" id="scroller">
      <div class="h-full px-4 mb-2">
        <message v-for="message in messages" :name="message.name" :message="message.message" :receiver="message.receiver" :key="message.name"></message>
      </div>
    </div>
    <div class="">
      <message-box></message-box>
    </div>
  </div>
</template>

<script>
import Message from "@/components/message/Message";
import MessageBox from "@/components/message/MessageBox";
// import axios from "axios";
export default {
  name: "MessageArea",
  components: {MessageBox, Message},
  data: () => ({
    messages: [
      {
        name: "John Doe",
        message: "Test message",
        receiver: true
      }
    ]
  }),
  methods: {
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    incoming_message: function (data) {
      console.log(data)
      let message = {
        name: data.name,
        message: data.message,
        receiver: data.receiver
      }
      this.messages.push(message)
      this.$scrollbar.get(document.getElementById("scroller").scrollTop)
    },
    previous_messages: function (data) {
      console.log(data)
      let old_messages = data.data
      for(let i = 0; i < old_messages.length; i++){
        if(parseInt(localStorage.getItem('userId')) === parseInt(old_messages[i].userId)){
          let message = {
            name: old_messages[i].first_name,
            message: old_messages[i].message,
            receiver: false
          }
          this.messages.push(message)
        }else{
          let message = {
            name: old_messages[i].first_name,
            message: old_messages[i].message,
            receiver: true
          }
          this.messages.push(message)
        }
      }
    }
  },
  mounted() {
    let email = localStorage.getItem('email')
    let token = localStorage.getItem('token')
    this.$socket.emit('setup_client', {
      email: email,
      token: token
    })
  },
  destroyed() {
    this.$socket.emit('disconnect')
  }

}
</script>

<style scoped>

</style>