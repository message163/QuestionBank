<template>
    <el-form-item label="问题描述：">
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
            <el-col>题目{{ index + 1 }}： <el-button link @click="deleteQuestion(index)">删除</el-button> </el-col>
            <el-col>
                <Editor v-model="item.content"></Editor>
            </el-col>
            <el-col>参考答案</el-col>
            <el-col>
                <Editor v-model="item.answer"></Editor>
            </el-col>
            <el-table :data="item.terms">
                <el-table-column prop="keyword" label="关键词">
                    <template #default="scope">
                        <el-input placeholder="请输入关键词" v-model="scope.row.keyword"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="synonym" label="近义词">
                    <template #default="scope">
                        <el-input placeholder="请输入近义词" v-model="scope.row.synonym"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="antonym" label="反义词">
                    <template #default="scope">
                        <el-input placeholder="请输入反义词" v-model="scope.row.antonym"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="score" label="得分">
                    <template #default="scope">
                        <el-input placeholder="请输入得分" v-model="scope.row.score"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" link
                            @click="item.terms.push({ keyword: '', synonym: '', antonym: '', score: '' })">添加</el-button>
                        <el-button type="danger" link @click="item.terms.splice(scope.$index, 1)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        terms: [
            {
                keyword: '',
                synonym: '',
                antonym: '',
                score: ''
            }
        ]
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