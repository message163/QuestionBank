<template>
    <div>
        <el-button @click="isShow = true">新建</el-button>
        <CreateQuestion></CreateQuestion>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { getList } from '@/apis/subject';
import { page } from '@/config'
import CreateQuestion from './create.vue'
const isShow = ref<boolean>(false)
const data = ref<any[]>([])
const getSubjectList = async () => {
    const res = await getList(page)
    data.value = res.data.data
}

onMounted(() => {
    getSubjectList()
})
</script>

<style></style>