<template>
    <div ref="questionRef" class="question-create">
        <el-form>
            <el-form-item v-for="(item, index) in question">
                <h2 class="question-title">题目{{ index+1 }}</h2>
                <el-row>
                    <el-col :span='3'>学科</el-col>
                    <el-col :span="21">
                        <el-select @change="changeSubject(item)" v-model="item.subjectCode" clearable
                            placeholder="请选择学科">
                            <el-option-group :label="getLabel(group)" v-for="group in list">
                                <el-option :value="item.id" :label="`${getLabel(group)}(${item.name})`"
                                    v-for="item in group.subject"></el-option>
                            </el-option-group>
                        </el-select>
                    </el-col>
                    <el-col :span='3'>课程代码</el-col>
                    <el-col :span="21">
                        <el-select v-model="item.courseCode" clearable placeholder="请选择学科">
                            <el-option :value="item._id" :label="item.name" v-for="item in data"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3"><b>题目{{ index + 1 }}：</b></el-col>
                    <el-col :span="21">
                        <el-radio-group v-model="item.type">
                            <el-radio-button v-for="item in subjecetList" :value="item.value"
                                :label="item.label"></el-radio-button>
                        </el-radio-group>
                    </el-col>
                    <el-col :span="3">难度等级：</el-col>
                    <el-col :span="21">
                        <el-select v-model="item.degree">
                            <el-option :value="diff.value" :label="diff.label" v-for="diff in difficulty"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3">关联知识点：</el-col>
                    <el-col :span="21">
                        <el-tree-select multiple filterable v-model="item.knowledgeId" default-expand-all value-key='id'
                            :data="dataSource"></el-tree-select>
                    </el-col>
                    <el-col :span="3">分值：</el-col>
                    <el-col :span="21">
                        <el-input :min="1" :max="5" v-model="item.score" type="number" placeholder="请输入分值" />
                    </el-col>
                    <el-col :span="3">原始分值：</el-col>
                    <el-col :span="21">
                        <el-input :min="1" :max="100" v-model="item.originalScore" type="number"
                            placeholder="请输入原始分值" />
                    </el-col>
                    <el-col :span="3">最快速度：</el-col>
                    <el-col :span="21">
                        <el-input :min="1" :max="9999" v-model="item.fastestSpeed" type="number"
                            placeholder="请输入最快速度" />
                    </el-col>
                    <el-col :span="3">最慢速度：</el-col>
                    <el-col :span="21">
                        <el-input :min="1" :max="9999" v-model="item.slowestSpeed" type="number"
                            placeholder="请输入最慢速度" />
                    </el-col>
                    <el-col :span="3">阅读时间：</el-col>
                    <el-col :span="21">
                        <el-input :min="1" :max="9999" v-model="item.readingTime" type="number" placeholder="请输入阅读时间" />
                    </el-col>
                    <el-col :span="3">选文地址：</el-col>
                    <el-col :span="21">
                        <Editor v-model="item.selectedArticleAddress"></Editor>
                    </el-col>
                    <el-col :span="3">图片地址：</el-col>
                    <el-col :span="21">
                        <Editor v-model="item.pictureAddress"></Editor>
                    </el-col>
                    <el-col :span="3">音频地址：</el-col>
                    <el-col :span="21">
                        <Editor v-model="item.audioAddress"></Editor>
                    </el-col>
                    <el-col :span="3">视频地址：</el-col>
                    <el-col :span="21">
                        <Editor v-model="item.videoAddress"></Editor>
                    </el-col>
                    <el-col :span="3">答题要求：</el-col>
                    <el-col :span="21">
                        <Editor v-model="item.answeringRequirements"></Editor>
                    </el-col>
                    <el-col :span="3">试题描述：</el-col>
                    <el-col :span="21">
                        <Editor v-model="item.testDescription"></Editor>
                    </el-col>
                    <el-col :span="3">参考答案：</el-col>
                    <el-col :span="21">
                        <answer v-model="item.awnsers" :type="item.type"></answer>
                    </el-col>
                    <el-col :span="3">选项：</el-col>
                    <el-col :span="21">
                        <el-input :rows="3" type="textarea" :maxlength="500" v-model="item.options" style="width:100%;"
                            placeholder="请输入解析" />
                    </el-col>
                    <el-col :span="3">解析：</el-col>
                    <el-col :span="21">
                        <el-input :rows="3" type="textarea" :maxlength="500" v-model="item.analysis" style="width:100%;"
                            placeholder="请输入解析" />
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <div class="question-footer">
                    <el-button type="primary" v-if="isLast(index)" @click="addQuestion">添加题目</el-button>
                    <el-button v-if="index != 0" @click="deleteQuestion(index)" type="danger">删除题目</el-button>
                </div>
            </el-form-item>
        </el-form>
        <sliderBar @on-submit="submit" :slide-bar-length="question.length"></sliderBar>
    </div>
</template>

<script setup lang='ts'>
import {useRouter} from 'vue-router'
import { reactive, computed, nextTick, ref } from 'vue'
import { useInitObj } from './hooks'
import { subjecetList, difficulty } from '@questionbank/config/subject/index.ts'
import answer from './answer.vue';
import { createSubject } from '@/apis/subject'
import { ElMessage } from 'element-plus'
import { useTreeHooks } from '../knowledge/treeHooks';
import { useKnowledge } from '../knowledge/knowledgeHooks';
import { useCourseCode } from '../course/code/hooks'
import Editor from '@/components/Editor.vue';
import sliderBar from './sidebar.vue'
const router = useRouter()
const { getTree, dataSource } = useKnowledge()
const { getLabel, list } = useTreeHooks()
const { data } = useCourseCode()
const questionRef = ref<HTMLElement>()
const question = reactive([
    {
        ...useInitObj()
    }
])

const isLast = computed(() => {
    return (index: number) => {
        console.log(index)
        return index === question.length - 1
    }
})

const changeSubject = (item) => {
    if (!item.subjectCode) return;
    getTree(item.subjectCode)
    item.knowledgeId.value = []
}

const addQuestion = async () => {
    question.push({ ...useInitObj() })
    await nextTick()
    questionRef.value?.scrollTo(0, questionRef.value?.scrollHeight)
}

const deleteQuestion = (index: number) => {
    question.splice(index, 1)
}

const submit = async () => {
    const res = await createSubject(question)
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

.question-title{
    margin-bottom: 15px;
}

.question-create {
    padding: 20px;
    overflow-y: auto;
}
</style>