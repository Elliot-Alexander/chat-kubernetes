<template>
  <div class="flex flex-col lg:flex-row w-full h-screen lg:h-full lg:h-3/4 mx-2">
<!--    <div class="w-full lg:w-1/3 my-2 lg:mx-2">-->
<!--      <friends></friends>-->
<!--    </div>-->
    <div class="w-full my-2">
      <message-area></message-area>
    </div>
  </div>
</template>

<script>
import MessageArea from "@/components/message/MessageArea";
export default {
  name: "Chat",
  components: {MessageArea}
}
</script>

<style scoped>

</style>