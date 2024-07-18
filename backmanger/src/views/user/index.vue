<template>
   <div>
      <el-button type="primary" @click="open">新增用户</el-button>
   </div>
   <el-table border :data="data">
      <el-table-column align="center" label="姓名" prop="username"></el-table-column>
      <el-table-column align="center" label="账号" prop="account"></el-table-column>
      <el-table-column align="center" label="权限" prop="role"></el-table-column>
      <el-table-column align="center" label="角色" prop="leval">
         <template #default="scope">
            {{ getLeval(scope.row.leval) }}
         </template>
      </el-table-column>
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
   <CreateUser ref="User" @on-submit="getList" v-model="isShow"></CreateUser>
</template>

<script setup lang='ts'>
import { useUser } from './hooks';
import { getCurrentInstance, ref, nextTick } from 'vue'
import CreateUser from './create.vue'
import { deleteUser } from '@/apis/user'
import { ElMessage } from 'element-plus'
import type { UserList } from '@questionbank/config/user/index.ts'
const User = ref<InstanceType<typeof CreateUser>>()
const isShow = ref<boolean>(false)
const app = getCurrentInstance()
const { data, getList, getLeval } = useUser()
const open = () => {
   isShow.value = true
   nextTick(() => {
      User.value?.onReset()
   })
}
const del = async (item: UserList) => {
   const res = await deleteUser({ _id: item._id })
   if (res) {
      ElMessage.success(res.message)
      getList()
   } else {
      ElMessage.error(res.message)
   }
}

const update = (item: UserList) => {
   isShow.value = true
   nextTick(() => {
      User.value?.onUpdateForm(item)
   })
}


</script>

<style></style>