<template>
    <el-card header="绑定知识点" shadow="never">
        <el-select clearable placeholder="请选择知识点" v-model="subjectId">
            <el-option-group :label="getLabel(group)" v-for="group in list">
                <el-option :value="item.id" :label="item.name" v-for="item in group.subject"></el-option>
            </el-option-group>
        </el-select>
        <el-tree class="m-t" show-checkbox :data="dataSource" node-key="id" default-expand-all
            :expand-on-click-node="false" :render-content="renderContent" />

        <template #footer>
             <el-button type="primary">保存</el-button>
        </template>
    </el-card>

</template>

<script setup lang='ts'>
import { useTreeHooks } from './treeHooks'
import { ref, h as H } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
const subjectId = ref('')
const { list, getLabel } = useTreeHooks()
const dataSource = ref<any[]>([
    {
        id: 1,
        label: '知识点',
    }
])
interface Tree {
    id: number
    label: string
    children?: Tree[]
}

let id = 2
const renderContent = (
    h: typeof H,
    {
        node,
        data,
        store,
    }: {
        node: Node
        data: Tree
        store: Node['store']
    }
) => {
    return h(
        'span',
        {
            class: 'custom-tree-node',
        },
        [
            h('span', null, node.label),
            h(
                'span',
                null,
                [
                    h(
                        'a',
                        {
                            onClick: () => append(data),
                        },
                        'Append '
                    ),
                    h(
                        'a',
                        {
                            style: 'margin-left: 8px',
                            onClick: () => remove(node, data),
                        },
                        'Delete'
                    )
                ]
            )
        ]
    )
}

const append = (data: Tree) => {
    const newChild = { id: id++, label: 'testtest', children: [] }
    if (!data.children) {
        data.children = []
    }
    data.children.push(newChild)
    dataSource.value = [...dataSource.value]
}

const remove = (node: Node, data: Tree) => {
    const parent = node.parent
    const children = parent.data.children || parent.data
    const index = children.findIndex((d: any) => d.id === data.id)
    children.splice(index, 1)
}
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