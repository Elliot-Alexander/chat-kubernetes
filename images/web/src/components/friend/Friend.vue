<template>
  <div class="block flex flex-row hover:bg-gray-200 p-4 rounded transition-colors ease-in-out duration-200 my-1" v-bind:class="{'bg-gray-200' : active}">
    <div class="object-contain lg:hidden xl:block">
      <div class="bg-gradient-to-r from-indigo-700 to-teal-400 rounded-full h-16 w-16 flex justify-center items-center">
        <font-awesome-icon :icon="['fas', 'user']" class="text-xl text-white"/>
      </div>
    </div>

    <div class="mx-4">
      <h1 class="text-2xl">{{ name }}</h1>
      <p class="text-gray-500">{{ recentMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Friend",
  data: () => ({
    name: 'John Doe',
    recentMessage: 'Just received this message from John Doe'
  }),
  props: {
    active: Boolean
  }
}
</script>

<style scoped>

</style>