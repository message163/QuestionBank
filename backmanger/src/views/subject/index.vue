<template>
    <el-card shadow="never">
        <div class="grade-header">
            <div class="grade-header-select">
                <el-select v-model="keyWord" clearable placeholder="请选择年级">
                    <el-option v-for="item in gradeList" :key="item.value" :label="item.label"
                        :value="item.value"></el-option>
                </el-select>
                <el-button type="primary" @click="searchData">查询</el-button>
            </div>
            <div class="grade-header-btn">
                <el-button type="primary" @click="open">新增</el-button>
            </div>
        </div>

        <el-table border :data="list">
            <el-table-column align="center" :width="90" label="年级" prop="grade">
                <template #default="scope">
                    {{ gradeItem(scope.row.grade) }}
                </template>
            </el-table-column>
            <el-table-column align="center" :width="180" label="创建时间" prop="createTime">
                <template #default="scope">
                    {{ timeFormat(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column align="center" :width="180" label="更新时间" prop="updateTime">
                <template #default="scope">
                    {{ timeFormat(scope.row.updateTime) }}
                </template>
            </el-table-column>
            <el-table-column label="科目">
                <template #default="scope">
                    <div>{{ scope.row.subject.map((v: any) => v.name).join(',') }}</div>
                </template>
            </el-table-column>
            <el-table-column :width="150" label="操作">
                <template #default="scope">
                    <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-popover :visible="scope.row.showpopover" trigger="click" placement="bottom" :width="160">
                        <p>是否删除{{ scope.row.courseName }}</p>
                        <div style="margin-top:10px;">
                            <el-button @click="scope.row.showpopover = false" type="primary" size="small">取消</el-button>
                            <el-button type="danger" size="small" @click="del(scope.row)">
                                确定
                            </el-button>
                        </div>
                        <template #reference>
                            <el-button @click="scope.row.showpopover = true" size="small" type="danger">删除</el-button>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" v-model:current-page="page.pageNo"
            v-model:page-size="page.pageSize" background layout="prev, pager, next, jumper, ->, total" :total="total" />
        <createSubject ref="subjectDialog" @on-submit="getApiList" v-model="openDialog"></createSubject>
    </el-card>

</template>

<script setup lang='ts'>
import createSubject from './create.vue'
import { onMounted, ref, getCurrentInstance, nextTick, toRaw } from 'vue'
import { getList, deleteGrade } from '@/apis/grade';
import type { GradeForm, Grade } from '@questionbank/config/grade'
import { gradeList } from '@questionbank/config/grade/index.ts'
import { page } from '@/config'
import { ElMessage } from 'element-plus'
const total = ref<number>(0) // 总数
const keyWord = ref<number>() // 搜索
const app = getCurrentInstance() // 获取当前实例
const timeFormat = app!.proxy!.$timeFormat // 时间戳格式化
const openDialog = ref<boolean>(false) // 弹窗
const list = ref<GradeForm>([]) // 数据
const subjectDialog = ref<InstanceType<typeof createSubject>>()
const getApiList = async () => {
    const data = await getList<{ data: { data: GradeForm, total: number } }>({ keyWord: keyWord.value })
    data.data.data.forEach((item: Grade) => {
        item.showpopover = false
    })
    list.value = data.data.data
    total.value = data.data.total || 0
}

const open = () => {
    openDialog.value = true
    nextTick(() => {
        subjectDialog.value?.reset()
    })
}

const del = async (item: Grade) => {
    const res = await deleteGrade({ _id: item._id })
    item.showpopover = false
    if (res.code == 200) {
        ElMessage.success(res.message)
        getApiList()
    } else {
        ElMessage.error(res.message)
    }
}

const edit = async (item: Grade) => {
    openDialog.value = true
    subjectDialog.value?.refInjectGrade(toRaw(item))
}

const handleCurrentChange = (val: number) => {
    page.pageNo = val
    getApiList()
}

const searchData = () => {
    getApiList()
}

const gradeItem = (value: null) => {
    return gradeList?.find((v) => v.value === value)?.label
}

onMounted(() => {
    getApiList()
})
</script>

<style scoped lang="less">
.grade-header {
    display: flex;
    justify-content: space-between;

    &-select {
        display: flex;
        width: 300px;
    }

    &-btn {
        display: flex;

        .el-button {
            margin-left: 10px;
        }
    }
}
</style>