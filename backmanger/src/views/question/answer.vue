<template>
    <div>
        <div v-if="props.type === 1 || props.type === 2">
            <el-input  v-model="item.value" class="multChoice" v-for="(item, index) in multChoice" placeholder="请输入选项内容">
                <template #prepend>
                    <el-checkbox @change="(flag: CheckboxValueType) => checkboxHandler(index, flag)" v-model="item.isAnswer"></el-checkbox>
                    <span class="multChoice-text">{{ item.text }}</span>
                </template>
                <template #append>
                    <div class="multChoice-append" @click="delAwsnser(index)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </div>
                </template>
            </el-input>
            <el-button @click="pushAwnser" class="multChoice-btn">增加一行</el-button>
        </div>
        <div v-if="props.type === 3">
            <el-radio-group v-model="judgeVal">
                <el-radio :value="1" label="正确"></el-radio>
                <el-radio :value="0" label="错误"></el-radio>
            </el-radio-group>
        </div>
        <div v-if="props.type === 4">
            <el-input v-model="fillVal" placeholder="请输入填空题答案"></el-input>
        </div>
        <div v-if="props.type === 5">
            <el-input v-model="textVal" type="textarea" placeholder="请输入简答题答案"></el-input>
        </div>
        <div v-if="props.type === 6">
            <el-input v-model="listenVal" placeholder="请输入听力题答案"></el-input>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, watch, watchEffect } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import type { CheckboxValueType } from 'element-plus'
import type { Awnsers, SubjectType } from '@questionbank/config/subject/index.ts'
const judgeVal = ref(0); // 判断
const fillVal = ref(''); // 填空
const listenVal = ref(''); // 听力
const textVal = ref(''); // 简答
// 多选 和 单选
const multChoiceVal = [{
    text: 'A',
    value: '',
    isAnswer: false
}, {
    text: 'B',
    value: '',
    isAnswer: false
}, {
    text: 'C',
    value: '',
    isAnswer: false
}, {
    text: 'D',
    value: '',
    isAnswer: false
}]
const props = withDefaults(defineProps<{
    type?: SubjectType
    modelValue?: Awnsers
}>(), {
    type: 1 //1 单选 2 多选
})

const emit = defineEmits(['update:modelValue'])

const multChoice = ref([...window.structuredClone(multChoiceVal)])
// 增加
const pushAwnser = () => {
    const length = multChoice.value.length
    const code = String.fromCharCode(65 + length)
    multChoice.value.push({
        text: code,
        value: '',
        isAnswer: false
    })
}
// 删除
const delAwsnser = (index: number) => {
    multChoice.value.splice(index, 1)
}

const checkboxHandler = (index: number, flag: CheckboxValueType) => {
    if (props.type !== 1) return; //1 单选 2 多选
    multChoice.value.forEach((item) => item.isAnswer = false)
    multChoice.value[index].isAnswer = flag as boolean
}
// 重置
const reset = () => {
    multChoice.value = [...window.structuredClone(multChoiceVal)]
    fillVal.value = ''
    textVal.value = ''
    listenVal.value = ''
    judgeVal.value = 0
}
// 监听 变化 之后 重置
watch(() => props.type, () => {
    reset()
})

watchEffect(() => {
    const AwnsersContent: Awnsers = {
        type: props.type,
        content: ''
    }
    switch (props.type) {
        case 1:
            AwnsersContent.content = multChoice.value
            emit('update:modelValue', AwnsersContent)
            break
        case 2:
            AwnsersContent.content = multChoice.value
            emit('update:modelValue', AwnsersContent)
            break
        case 3:
            AwnsersContent.content = judgeVal.value
            emit('update:modelValue', AwnsersContent)
            break
        case 4:
            AwnsersContent.content = fillVal.value
            emit('update:modelValue', AwnsersContent)
            break
        case 5:
            AwnsersContent.content = textVal.value
            emit('update:modelValue', AwnsersContent)
            break
        case 6:
            AwnsersContent.content = listenVal.value
            emit('update:modelValue', AwnsersContent)
            break
        default:
            console.error('未知题型')
            break
    }
})


defineExpose({
    reset
})
</script>

<style scoped lang="less">
.multChoice {
    margin-top: 10px;
    :deep(.el-input-group__append) {
        padding: 0 !important;
    }

    &-text {
        margin-left: 10px;
        width: 10px;
        display: inline-block
    }

    &-append {
        padding: 5px 10px;
    }

    &-btn {
        margin-top: 10px;
    }
}
</style>