<template>
   <div class="content">
      <router-view v-slot="{ Component }">
         <component :is="Component" />
      </router-view>
   </div>
</template>

<script setup lang='ts'>

</script>

<style scoped>
.content {
   flex: 1;
   overflow: auto;
   padding: 20px;
}
</style>