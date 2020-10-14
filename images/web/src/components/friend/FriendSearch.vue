<template>
 <div>
   <div class="w-full flex flex-row shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2">
     <div class="w-11/12">
       <input type="text" placeholder="Search friends" class="w-full leading-tight focus:outline-none">
     </div>
     <div class="w-1/12 flex items-center justify-center">
       <font-awesome-icon :icon="['fas', 'search']"/>
     </div>
   </div>
 </div>
</template>

<script>
export default {
name: "FriendSearch"
}
</script>

<style scoped>

</style>