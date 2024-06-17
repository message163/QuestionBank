<template>
    <header class="header">
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: item.path ? item.path : '' }" v-for="item in breadcrumbList">
                {{ item.title }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </header>

</template>

<script setup lang='ts'>
import useMenu from '@/stores/menu'
import { useRouter, useRoute } from 'vue-router'
import { watchEffect, ref } from 'vue'
const router = useRouter();
const route = useRoute()
const { menuList } = useMenu()
interface BreadcrumbList {
    path?: string
    title: string
}
const breadcrumbList = ref<BreadcrumbList[]>([])
const handler = (path: string) => {
    menuList.forEach((item) => {
        if (item.children) {
            item.children.forEach((child) => {
                if (child.path === path) {
                    breadcrumbList.value.push({ title: item.title })
                    breadcrumbList.value.push({ path: child.path, title: child.title })
                }
            })
        }
    })
}
watchEffect(() => {
    const path = route.path
    breadcrumbList.value = []
    handler(path)
})

</script>

<style scoped lang="less">
.header {
    height: 50px;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 10px 20px;
    width: 100%;
    border-bottom: 1px solid #ccc;
}
</style>