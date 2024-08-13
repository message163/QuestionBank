<template>
   <div>
      <el-button type="primary" @click="open">新增课程代码</el-button>
   </div>
   <el-table :data="data" border>
      <el-table-column align="center" label="名称" prop="name"></el-table-column>
      <el-table-column align="center" label="创建时间" prop="createTime">
         <template #default="scope">
            {{ app?.proxy?.$timeFormat(scope.row.createTime) }}
         </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" prop="updateTime">
         <template #default="scope">
            {{ app?.proxy?.$timeFormat(scope.row.updateTime) }}
         </template>
      </el-table-column>
      <el-table-column align="center" label="描述" prop="desc"></el-table-column>
      <el-table-column align="center" label="操作">
         <template #default="scope">
            <el-button @click="update(scope.row)" type="primary" size="small">编辑</el-button>
            <el-popover :visible="scope.row.showpopover" trigger="click" placement="bottom" :width="160">
               <p>是否删除{{ scope.row.username }}</p>
               <div style="margin-top:10px;">
                  <el-button @click="scope.row.showpopover = false" type="primary" size="small">取消</el-button>
                  <el-button type="danger" size="small" @click="del(scope.row)">
                     确定
                  </el-button>
               </div>
               <template #reference>
                  <el-button v-if="scope.row.role !== 1" @click="scope.row.showpopover = true" size="small"
                     type="danger">删除</el-button>
               </template>
            </el-popover>
         </template>
      </el-table-column>
   </el-table>
   <createCode @on-submit="getList" ref="CourseCode" v-model="isShow"></createCode>
</template>

<script setup lang='ts'>
import { getCurrentInstance, ref, nextTick } from 'vue'
import createCode from './create.vue'
import { useCourseCode } from './hooks'
import { ElMessage } from 'element-plus'
import type { CourseCodeItem } from '@questionbank/config/course/index.ts'
import { deleteCourseCode } from '@/apis/course/code'
const CourseCode = ref<InstanceType<typeof createCode>>()
const { data, getList } = useCourseCode()
const isShow = ref<boolean>(false)
const app = getCurrentInstance()
const open = () => {
   isShow.value = true
   nextTick(() => {
      CourseCode.value?.onReset()
   })
}

const del = async (item: CourseCodeItem) => {
   const res = await deleteCourseCode({ _id: item._id })
   if (res) {
      ElMessage.success(res.message)
      getList()
   } else {
      ElMessage.error(res.message)
   }
}

const update = (item: CourseCodeItem) => {
   isShow.value = true
   nextTick(() => {
      CourseCode.value?.onUpdateForm(item)
   })
}


</script>

<style></style>