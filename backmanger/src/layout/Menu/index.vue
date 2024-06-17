<template>
    <el-menu  text-color="#fff" background-color="#545c64"   class="el-menu-vertical">
        <el-sub-menu :index="item.title" v-for="(item, index) in menuList">
            <template #title>
                <el-icon> <component :is="item.icon"></component> </el-icon>
                <span>{{ item.title }}</span>
            </template>
            <el-menu-item @click="router.push(child.path)" :index="child.path" v-for="child in item.children">
                <span>{{ child.title }}</span>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import useMenu from '@/stores/menu'
import { useRouter } from 'vue-router'
const router = useRouter();
const { menuList } = useMenu()

</script>

<style>
.el-menu-vertical {
    height: 100%;
    width: 300px;
}
</style>