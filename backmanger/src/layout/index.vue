<template>
    <div class="layout">
        <Menu></Menu>
        <main class="main">
            <Header></Header>
            <Content></Content>
        </main>
    </div>
</template>

<script setup lang='ts'>
import Header from './Header/index.vue'
import Content from './Content/index.vue'
import Menu from './Menu/index.vue'
</script>

<style scoped lang="less">
.layout {
    height: 100%;
    overflow: hidden;
    display: flex;
    .main {
        flex: 1;
        display: flex;
        flex-direction: column;
    }
}
</style>