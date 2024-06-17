<template>
    <el-card>
        <div class="course-header">
            <el-input clearable v-model.trim="keyWord" style="max-width: 600px" placeholder="请输入课程名称进行查询...">
                <template #append>
                    <el-button @click="searchData" :icon="Search" />
                </template>
            </el-input>
            <div class="course-header-btn">
                <el-button @click="create" type="primary">新建</el-button>
                <el-upload :on-success="uploadCallback" name="file" method="post" :action="importExcelUrl"
                    accept=".xlsx" :show-file-list="false">
                    <el-button type="success">导入</el-button>
                </el-upload>
            </div>
        </div>
        <el-table element-loading-text="Loading..." v-loading="loading" :data="data" empty-text="暂无数据" border>
            <el-table-column align="center" prop="stage" label="阶段" />
            <el-table-column align="center" prop="semester" label="学期" />
            <el-table-column align="center" prop="unit" label="单元" />
            <el-table-column align="center" prop="chapter" label="章节" />
            <el-table-column align="center" prop="courseId" label="课程编号" />
            <el-table-column align="center" prop="courseNumberd" label="课号" />
            <el-table-column align="center" prop="courseName" label="课程名称" />
            <el-table-column align="center" prop="author" label="课程作者" />
            <el-table-column align="center" prop="courseCategories" label="课程分类" />
            <el-table-column align="center" prop="lessonType" label="课程类型" />
            <el-table-column align="center" prop="writingStyle" label="文体" />
            <el-table-column align="center" prop="languageStyle" label="语体" />
            <el-table-column width="150px" align="center" label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
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
        <el-dialog top="7vh" v-model="isShow">
            <dataTemplate @on-submit="handlderData" ref="dataTemp"></dataTemplate>
        </el-dialog>
    </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'
import dataTemplate from './create.vue'
import { getCourseList, deleteCourse, importExcelUrl } from '@/apis/course'
import type { Course } from './type'
import { page } from '@/config'
import { ElMessage } from 'element-plus'
const loading = ref<boolean>(false)
const keyWord = ref<string>('') // 搜索
let data = ref<Course[]>([]) // 数据
const isShow = ref<boolean>(false) // 弹窗
const total = ref<number>(0) // 总数
const dataTemp = ref<InstanceType<typeof dataTemplate>>() // 弹窗实例
// 获取数据
const getList = async () => {
    loading.value = true
    const res = await getCourseList<{ data: { data: Course[], total: number } }>({ ...page, keyWord: keyWord.value })
    res.data.data.forEach((item: Course) => {
        item.showpopover = false;
    })
    data.value = res.data.data
    total.value = res.data.total
    loading.value = false
}
// 分页
const handleCurrentChange = (val: number) => {
    page.pageNo = val
    getList()
}
// 弹窗
const create = async () => {
    isShow.value = true
    await nextTick()
    dataTemp.value?.onReset()
}
// 删除
const del = async (item: Course) => {
    const res = await deleteCourse({ _id: item._id })
    item.showpopover = false
    if (res.code == 200) {
        ElMessage.success(res.message)
        getList()
    } else {
        ElMessage.error(res.message)
    }
}
// 编辑
const edit = async (item: Course) => {
    isShow.value = true
    await nextTick()
    dataTemp.value?.onUpdateForm(item)
}
// onsubmit 处理函数
const handlderData = () => {
    isShow.value = false
    getList()
}
// 搜索
const searchData = () => {
    getList()
}
// 导入
const uploadCallback = () => {
    ElMessage.success('导入成功')
    getList()
}
// 搜索数据
onMounted(() => {
    getList()
})
</script>

<style lang="less" scoped>
.course-header {
    display: flex;
    justify-content: space-between;

    &-btn {
        display: flex;

        .el-button {
            margin-left: 10px;
        }
    }
}
</style>