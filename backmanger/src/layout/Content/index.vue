<template>
   <div class="content">
      <router-view v-slot="{ Component }">
         <keep-alive :include="['Question']">
            <component :is="Component" />
         </keep-alive>
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