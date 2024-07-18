
import { ref, h as H, getCurrentInstance } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { createKnowledge, updateKnowledge, getList } from '@/apis/knowledge'
import { ElMessage } from 'element-plus'
export interface Tree {
    id: number
    label: string
    children?: Tree[]
    _id?: string //mongoose id
}
export const useKnowledge = () => {
    const app = getCurrentInstance()
    const subjectId = ref<string>('')
    const isData = ref<boolean>(false)
    let maxId = ref<number>(-Infinity)
    const dataSource = ref<Tree[]>([])
    const getMaxId = () => {
        maxId.value = -Infinity
        const traverse = (data: Tree[]) => {
            for (const item of data) {
                if (item.id > maxId.value) {
                    maxId.value = item.id
                }
                if (item.children) {
                    traverse(item.children)
                }
            }
        }
        traverse(dataSource.value)
    }


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
                        h('a', {
                            style: {
                                'margin-right': '8px',
                                color: '#67c23a'
                            },
                            onClick: () => edit(data),
                        },
                            '修改名称'
                        ),
                        h(
                            'a',
                            {
                                style: {
                                    color: '#409eff'
                                },
                                onClick: () => append(data),
                            },
                            '添加知识点 '
                        ),
                        h(
                            'a',
                            {
                                style: {
                                    'margin-left': '8px',
                                    color: '#f56c6c'
                                },
                                onClick: () => remove(node, data),
                            },
                            '删除知识点'
                        )
                    ]
                )
            ]
        )
    }

    const append = async (data: Tree) => {
        const messageBox = await app?.proxy?.$prompt('请输入知识点名称', '添加知识点', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /\S/,
            inputErrorMessage: '知识点名称不能为空',
        })
        if (!messageBox?.value) return
        const newChild = {
            id: maxId.value + 1, label: messageBox!.value, children: []
        }
        if (!data.children) {
            data.children = []
        }
        data.children.push(newChild)
        dataSource.value = [...dataSource.value]
        getMaxId()

    }

    const edit = async (data: Tree) => {
        const editvalue = await app?.proxy?.$prompt('请输入知识点名称', '修改知识点', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: data.label,
            inputPattern: /\S/,
            inputErrorMessage: '知识点名称不能为空',
        })
        data.label = editvalue!.value
    }

    const remove = (node: Node, data: Tree) => {
        if (data.id === 1) {
            app?.proxy?.$message.error('根知识点不能删除')
            return
        }
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex((d: any) => d.id === data.id)
        children.splice(index, 1)
        getMaxId()
    }

    const submit = async () => {
        if (!subjectId.value) return ElMessage.error('请选择科目')
        const body = {
            subjectId: subjectId.value,
            gradeId: subjectId.value.split('-')[0],
            gradeName: subjectId.value.split('-')[1],
            TreeKnowledge: dataSource.value
        }
        const res = await (isData.value ? updateKnowledge(body) : createKnowledge(body))
        if (res?.code == 200) {
            ElMessage.success(res.message)
            getTree(subjectId.value)
        } else {
            ElMessage.error(res?.message || '提交失败')
        }
    }

    const changeSubject = () => {
        getTree(subjectId.value)
    }
    const getTree = async (subjectId: string) => {
        if (subjectId) {
            const res = await getList({ subjectId })
            if (res.data) {
                //如果有值说明存过了返回赋值即可
                dataSource.value = res.data.TreeKnowledge
                isData.value = true
            } else {
                //没有值说明是第一次存 填充默认值数据
                dataSource.value = [
                    {
                        id: 1,
                        label: '知识点',
                        children: []
                    }
                ]
                isData.value = false
            }
            getMaxId()
        } else {
            dataSource.value = []
            isData.value = false
        }
    }


    return {
        renderContent,
        append,
        edit,
        remove,
        submit,
        changeSubject,
        getTree,
        subjectId,
        dataSource,
        isData
    }

}