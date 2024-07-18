<template>
    <el-dialog draggable :model-value="true" title="题目">
        <div ref="questionRef" class="question-create">
            <el-form>
                {{ knowledgeId }}
                <el-form-item v-for="(item, index) in question">
                    <el-row>
                        <el-col :span='3'>科目</el-col>
                        <el-col :span="21">
                            <el-select @change="changeSubject" v-model="subjectId" clearable placeholder="请选择知识点">
                                <el-option-group :label="getLabel(group)" v-for="group in list">
                                    <el-option :value="item.id" :label="`${getLabel(group)}(${item.name})`"
                                        v-for="item in group.subject"></el-option>
                                </el-option-group>
                            </el-select>
                        </el-col>
                        <el-col :span="3"><b>题目{{ index + 1 }}：</b></el-col>
                        <el-col :span="21">
                            <el-radio-group v-model="item.type">
                                <el-radio-button v-for="item in subjecetList" :value="item.value"
                                    :label="item.label"></el-radio-button>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="3">题干：</el-col>
                        <el-col :span="21">
                            <el-input :maxlength="200" v-model="item.title" placeholder="请编写题干" />
                        </el-col>
                        <el-col :span="3">题目难度：</el-col>
                        <el-col :span="21">
                            <el-radio-group v-model="item.difficulty">
                                <el-radio-button :value="1" label="简单"></el-radio-button>
                                <el-radio-button :value="2" label="普通"></el-radio-button>
                                <el-radio-button :value="3" label="困难"></el-radio-button>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="3">难度系数：</el-col>
                        <el-col :span="21">
                            <el-rate show-score v-model="item.degree"> </el-rate>
                        </el-col>
                        <el-col :span="3">关联知识点：</el-col>
                        <el-col :span="21">
                            <el-tree-select multiple filterable  v-model="knowledgeId" default-expand-all value-key='id'
                                :data="dataSource"></el-tree-select>
                        </el-col>
                        <el-col :span="3">附件：</el-col>
                        <el-col :span="21">
                            <el-upload>
                                <el-button v-if="item.type != 6" type="primary">上传图片</el-button>
                                <el-button v-else type="primary">上传音频</el-button>
                            </el-upload>
                        </el-col>
                        <el-col :span="3">答案：</el-col>
                        <el-col :span="21">
                            <answer v-model="item.awnsers" :type="item.type"></answer>
                        </el-col>
                        <el-col :span="3">分值：</el-col>
                        <el-col :span="21">
                            <el-input v-model="item.score" type="number" placeholder="请输入分值" />
                        </el-col>
                        <el-col :span="3">答题时间：</el-col>
                        <el-col :span="21">
                            <el-input v-model="item.time" type="number" placeholder="请输入本题答题时间" />
                        </el-col>
                        <el-col :span="3">试题来源：</el-col>
                        <el-col :span="21">
                            <el-input :rows="3" type="textarea" :maxlength="500" v-model="item.analysis"
                                style="width:100%;" placeholder="请输入试题来源" />
                        </el-col>
                        <el-col :span="3">解析：</el-col>
                        <el-col :span="21">
                            <el-input :rows="3" type="textarea" :maxlength="500" v-model="item.analysis"
                                style="width:100%;" placeholder="请输入解析" />
                        </el-col>

                    </el-row>
                    <div class="question-footer">
                        <el-button type="primary" v-if="isLast(index)" @click="addQuestion">添加题目</el-button>
                        <el-button v-if="index != 0" @click="deleteQuestion(index)" type="danger">删除题目</el-button>
                    </div>
                    <el-divider></el-divider>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <el-button @click="submit" type="primary">提交</el-button>
            <el-button>取消</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { reactive, computed, nextTick, ref } from 'vue'
import { useInitObj } from './hooks'
import { subjecetList, categoryList } from '@questionbank/config/subject/index.ts'
import answer from './answer.vue';
import { createSubject } from '@/apis/subject'
import { ElMessage } from 'element-plus'
import { useTreeHooks } from '../knowledge/treeHooks';
import { useKnowledge } from '../knowledge/knowledgeHooks';
const { getTree, dataSource } = useKnowledge()
const { getLabel, list } = useTreeHooks()
const questionRef = ref<HTMLElement>()
const subjectId = ref<string>('')
const knowledgeId = ref<string[]>([])
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

const changeSubject = () => {
    if (!subjectId.value) return;
    getTree(subjectId.value)
    knowledgeId.value = []
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

.question-create {
    padding: 20px;
    height: 750px;
    overflow-y: auto;
}
</style>