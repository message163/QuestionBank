<template>
    <el-card header="绑定知识点" shadow="never">
        <el-select @change="changeSubject" clearable placeholder="请选择科目绑定知识点" v-model="subjectId">
            <el-option-group :label="getLabel(group)" v-for="group in list">
                <el-option :value="item.id" :label="`${getLabel(group)}(${item.name})`"
                    v-for="item in group.subject"></el-option>
            </el-option-group>
        </el-select>
        <el-tree class="m-t" node-key="id" show-checkbox :data="dataSource" default-expand-all
            :expand-on-click-node="false" :render-content="renderContent" />

        <template #footer>
            <el-button @click="submit" :type="isData ? 'primary' : 'success'">{{ isData ? '修改' : '保存' }}</el-button>
        </template>
    </el-card>

</template>

<script setup lang='ts'>
import { useTreeHooks } from './treeHooks'
import { useKnowledge } from './knowledgeHooks';
const { list, getLabel } = useTreeHooks()
const { subjectId, dataSource, renderContent, submit, changeSubject, isData } = useKnowledge()
</script>

<style scoped lang="less">
.m-t {
    margin-top: 10px;
}
</style>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>