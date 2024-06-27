<template>
    <el-card shadow="never">
        <el-button @click="open">新增</el-button>
        <el-table border :data="list">
            <el-table-column align="center" :width="90" label="年级" prop="grade"></el-table-column>
            <el-table-column align="center" :width="150" label="创建时间" prop="createTime"></el-table-column>
            <el-table-column align="center" :width="150" label="更新时间" prop="updateTime"></el-table-column>
            <el-table-column label="科目">
                <template #default="scope">
                    <div>{{ scope.row.subject.map((v: any) => v.name).join(',') }}</div>
                </template>
            </el-table-column>
            <el-table-column :width="150" label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <createSubject v-model="openDialog"></createSubject>
    </el-card>

</template>

<script setup lang='ts'>
import createSubject from './create.vue'
import { onMounted, ref } from 'vue'
import { getList } from '@/apis/grade';
import type { GradeForm } from '@questionbank/config/grade'
const openDialog = ref<boolean>(false)
const list = ref<GradeForm>([])
const getApiList = async () => {
    const data = await getList<{ data: GradeForm }>()
    list.value = data.data
}

const open = () => {
    openDialog.value = true
}


onMounted(() => {
    getApiList()
})
</script>

<style></style>