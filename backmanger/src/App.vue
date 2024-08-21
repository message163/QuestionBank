<template>
    <router-view></router-view>
</template>

<script setup lang='ts'>

</script>

<style lang="less">
#app {
    height: 100%;
    overflow: hidden;
}

/**
    table全局样式 App.vue
*/
.el-table {
    margin-top: 30px;
}

/**
    pagination全局样式 App.vue
*/
.el-pagination {
    float: right;
    margin: 20px 10px;

    &::after {
        content: '';
        clear: both;
    }
}

/**
   col全局样式 App.vue
*/
.el-col {
    margin-bottom: 20px;
}

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: rgb(179, 177, 177);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: var(--el-color-primary);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgb(100, 100, 100);
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:active {
    background: rgb(68, 68, 68);
    border-radius: 10px;
}

.flex {
    display: flex;
}

.align-center {
    align-items: center;
}

.primary {
    color: var(--el-color-primary);
    font-weight: 800;
    font-size: 16px;
}
</style>