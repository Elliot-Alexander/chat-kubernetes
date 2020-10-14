<template>
  <div class="w-full" v-if="receiver">
    <p class="text-lg text-indigo-700">{{ name }}</p>
    <p class="text-xl">{{ message }}</p>
  </div>
  <div class="w-full text-right" v-else>
    <p class="text-lg text-teal-400">Me</p>
    <p class="text-xl">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "message",
  props: {
    name: String,
    message: String,
    receiver: Boolean
  }
}
</script>

<style scoped>

</style>