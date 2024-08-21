<template>
    <div ref="questionRef" class="question-create">
        <el-form :label-width="100">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-form-item label="试题集编号："> <el-input v-model="questionForm.testSetNumber"
                            placeholder="请输入试题集编号"></el-input> </el-form-item>
                </el-col>
                <el-col :span="20">
                    <el-form-item label="试题集名称："> <el-input v-model="questionForm.questionSetName"
                            placeholder="请输入试题集名称"></el-input> </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="学科：">
                        <el-select @change="changeSubject" v-model="questionForm.subjectCode" clearable
                            placeholder="请选择学科">
                            <el-option-group :label="getLabel(group)" v-for="group in list">
                                <el-option :value="item.id" :label="`${getLabel(group)}(${item.name})`"
                                    v-for="item in group.subject"></el-option>
                            </el-option-group>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="课程代码：">
                        <el-select v-model="questionForm.courseCode" clearable placeholder="请选择课程代码">
                            <el-option :value="item._id" :label="item.name" v-for="item in data"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="知识点：">
                        <el-tree-select placeholder="请选择知识点" v-model="questionForm.knowledgeId" multiple filterable
                            default-expand-all value-key='id' :data="dataSource"></el-tree-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="难度等级：">
                        <el-select v-model="questionForm.difficultyLevel" clearable placeholder="请选择难度等级">
                            <el-option :value="diff.value" :label="diff.label" v-for="diff in difficulty"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="分值：">
                        <el-input v-model="questionForm.score" :min="1" :max="5" type="number"
                            placeholder="请输入分值"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="原始分值：">
                        <el-input v-model="questionForm.originalScore" :min="1" :max="5" type="number"
                            placeholder="请输入原始分值"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="最快速度：">
                        <el-input v-model="questionForm.fastestSpeed" :min="1" :max="9999" type="number"
                            placeholder="请输入最快速度">
                            <template #append>
                                <div>秒</div>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="最慢速度：">
                        <el-input v-model="questionForm.slowestSpeed" :min="1" :max="9999" type="number"
                            placeholder="请输入最慢速度">
                            <template #append>
                                <div>秒</div>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="阅读时间：">
                        <el-input v-model="questionForm.readingTime" :min="1" :max="9999" type="number"
                            placeholder="请输入阅读时间">
                            <template #append>
                                <div>秒</div>
                            </template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-segmented v-model="questionForm.type" :options="subjecetList">
                <template #default="{ item }">
                    <div class="flex flex-col items-center gap-2 p-2">
                        <div>{{ item.label }}</div>
                    </div>
                </template>
            </el-segmented>
            <el-divider />
            <Anwser @on-submit="submit" :type="questionForm.type"></Anwser>
        </el-form>
    </div>
</template>

<script setup lang='ts'>

import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { useInitObj } from './hooks'
import { subjecetList, difficulty } from '@questionbank/config/subject/index.ts'
import { createSubject } from '@/apis/subject'
import { ElMessage } from 'element-plus'
import { useTreeHooks } from '../knowledge/treeHooks';
import { useKnowledge } from '../knowledge/knowledgeHooks';
import { useCourseCode } from '../course/code/hooks'
import Anwser from './components/index.vue'

const router = useRouter()
const { getTree, dataSource } = useKnowledge()
const { getLabel, list } = useTreeHooks()
const { data } = useCourseCode()
const questionRef = ref<HTMLElement>()
const questionForm = reactive(useInitObj())


const changeSubject = () => {
    if (!questionForm.subjectCode) return;
    getTree(questionForm.subjectCode)
    questionForm.knowledgeId = []
}


const submit = async (data) => {
    const res = await createSubject({ ...questionForm, ...data })
    if (res?.code == 200) {
        ElMessage.success(res.message)
        router.back()
    } else {
        ElMessage.error(res?.message || '提交失败')
    }
}
</script>

<style scoped lang="less">
.question-footer {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.question-title {
    margin-bottom: 15px;
}

.question-create {
    padding: 20px;
    overflow-y: auto;
}
</style>