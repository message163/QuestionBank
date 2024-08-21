<template>
    <el-form-item label="试题内容：">
        <div>
            <div>
                <div class="flex align-center">
                    <el-button :icon="CirclePlusFilled" @click="addQuestion" type="primary">添加题目{{ data.length ?
                        `(${data.length})` : '' }}</el-button>
                    <el-pagination @current-change="handleCurrentChange" v-if="data.length" :page-size="1" class="page"
                        background layout="prev, pager, next" :total="data.length" />
                    <!-- <el-button :icon="ArrowLeftBold" type="primary">上一题</el-button>
                <el-button :icon="ArrowRightBold" type="primary">下一题</el-button> -->
                    <el-button @click="submit" :icon="SuccessFilled" type="primary">提交</el-button>
                </div>
            </div>
            <Editor class="top" v-model="value"></Editor>
        </div>
    </el-form-item>
    <el-form-item label="" v-for="(item, index) in data">
        <el-row v-if="current == index">
            <el-col>判断项{{ index + 1 }}： <el-button link @click="deleteQuestion(index)">删除</el-button> </el-col>
            <el-col>
                <Editor v-model="item.content"></Editor>
            </el-col>
            <el-col>正确答案</el-col>
            <el-col>
                <el-radio-group v-model="item.answer">
                    <el-radio label="正确" :value="1"></el-radio>
                    <el-radio label="错误" :value="0"></el-radio>
                </el-radio-group>
            </el-col>
            <el-col>答案解析</el-col>
            <el-col>
                <Editor v-model="item.analysis"></Editor>
            </el-col>
        </el-row>
        <el-divider v-if="current == index" />
    </el-form-item>
</template>

<script setup lang='ts'>
import Editor from '@/components/Editor.vue';
import { ref, reactive, onMounted } from 'vue';
import { SuccessFilled,  CirclePlusFilled } from '@element-plus/icons-vue'
const value = ref('')
const data = ref([])
const current = ref(data.value.length)
const handleCurrentChange = (val: number) => {
    current.value = (val - 1)
}
const emits = defineEmits(['on-submit'])
const addQuestion = () => {
    data.value.push({
        content: '',
        answer: '',
        analysis: ''
    })
}

onMounted(() => {
    data.value = []
    current.value = 0
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
</style>