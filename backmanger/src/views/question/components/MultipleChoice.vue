<template>
    <el-form-item label="试题内容：">
        <el-row>
            <el-col>
                <div class="flex align-center">
                    <el-button :icon="CirclePlusFilled" @click="addQuestion" type="primary">添加题目{{ data.length ?
                        `(${data.length})` : '' }}</el-button>
                    <el-pagination @current-change="handleCurrentChange" v-if="data.length" :page-size="1" class="page"
                        background layout="prev, pager, next" :total="data.length" />
                    <!-- <el-button :icon="ArrowLeftBold" type="primary">上一题</el-button>
                <el-button :icon="ArrowRightBold" type="primary">下一题</el-button> -->
                    <el-button @click="submit" :icon="SuccessFilled" type="primary">提交</el-button>
                </div>
            </el-col>
            <el-col>
                <Editor class="top" v-model="value"></Editor>
            </el-col>
        </el-row>
    </el-form-item>
    <el-form-item label="" v-for="(item, index) in data">
        <el-row v-if="current == index">
            <el-col>题目{{ index + 1 }}： <el-button link @click="deleteQuestion(index)">删除</el-button> </el-col>
            <el-col>
                <Editor v-model="item.title"></Editor>
            </el-col>
            <el-col>选项A</el-col>
            <el-col>
                <Editor v-model="item.A"></Editor>
            </el-col>
            <el-col>选项B</el-col>
            <el-col>
                <Editor v-model="item.B"></Editor>
            </el-col>
            <el-col>选项C</el-col>
            <el-col>
                <Editor v-model="item.C"></Editor>
            </el-col>
            <el-col>选项D</el-col>
            <el-col>
                <Editor v-model="item.D"></Editor>
            </el-col>
            <el-col>正确答案</el-col>
            <el-col>
                <el-radio-group v-model="item.answer">
                    <el-radio label="A" value="A"></el-radio>
                    <el-radio label="B" value="B"></el-radio>
                    <el-radio label="C" value="C"></el-radio>
                    <el-radio label="D" value="D"></el-radio>
                </el-radio-group>
            </el-col>
            <el-col>答案解析A</el-col>
            <el-col>
                <Editor v-model="item.analysisA"></Editor>
            </el-col>
            <el-col>答案解析B</el-col>
            <el-col>
                <Editor v-model="item.analysisB"></Editor>
            </el-col>
            <el-col>答案解析C</el-col>
            <el-col>
                <Editor v-model="item.analysisC"></Editor>
            </el-col>
            <el-col>答案解析D</el-col>
            <el-col>
                <Editor v-model="item.analysisD"></Editor>
            </el-col>
        </el-row>
        <el-divider v-if="current == index" />
    </el-form-item>
</template>

<script setup lang='ts'>
import Editor from '@/components/Editor.vue';
import { ref, reactive, onMounted } from 'vue';
import { SuccessFilled,  CirclePlusFilled } from '@element-plus/icons-vue'

const emits = defineEmits(['on-submit'])

const value = ref('')
const data = ref([])
const current = ref(data.value.length)

const addQuestion = () => {
    console.log(data)
    data.value.push({
        title: '',
        A: '',
        B: '',
        C: '',
        D: '',
        answer: '',
        analysisA: '',
        analysisB: '',
        analysisC: '',
        analysisD: ''
    })
}

const handleCurrentChange = (val: number) => {
    current.value = (val - 1)
}

onMounted(() => {
    current.value = 0
    data.value = []
})

const submit = () => {
    emits('on-submit',{
        data: data.value,
        content: value.value
    })
}


const deleteQuestion = (index: number) => {
    data.value.splice(index, 1)
}
defineExpose({
    data,
    value
})
</script>

<style scoped lang="less">
.top {
    margin-top: 10px;
}

.page {
    float: none !important;
    margin: 0 30px;
}
</style>