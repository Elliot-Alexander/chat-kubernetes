<template>
  <div id="app">
    <div class="flex lg:items-center h-screen lg:w-3/4 mx-auto">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  data: () => ({

  }),
}
</script>
<style>
body{
  @apply bg-gradient-to-r from-indigo-700 to-teal-400;
}
</style>
