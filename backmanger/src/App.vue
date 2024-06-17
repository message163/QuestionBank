<template>
    <router-view />
</template>

<script setup lang='ts'>

</script>

<style lang="less">
#app {
    height: 100%;
    overflow: hidden;
}

/**
    table全局样式
*/
.el-table {
    margin-top: 30px;
}

.el-pagination {
    float: right;
    margin: 20px 10px;
    &::after {
        content: '';
        clear: both;
    }
}
</style>