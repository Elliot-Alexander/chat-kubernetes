<template>
  <div class="bg-white md:shadow-2xl rounded px-8 py-6 pb-8 mb-4 w-full h-full flex flex-col">
    <div>
      <friend-search></friend-search>
    </div>
    <div class="h-full" v-smoothscrollbar="{ listener, options }">
      <friend></friend>
      <friend></friend>
      <friend active></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
      <friend></friend>
    </div>
  </div>
</template>

<script>
import Friend from "@/components/friend/Friend";
import FriendSearch from "@/components/friend/FriendSearch";
export default {
  name: "Friends",
  components: {FriendSearch, Friend},
  data: () => ({

  })
}
</script>

<style scoped>

</style>