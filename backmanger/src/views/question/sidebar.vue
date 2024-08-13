<template>
    <div class="question-sidebar">
        <div @click="toQuestion(i)" v-for="i in props.slideBarLength" class="question-items">
            <span>{{ i }}</span>
        </div>
        <div class="question-submit">
            <el-button @click="submit" type="primary">提交</el-button>
        </div>
        <div class="question-submit">
            <el-button @click="back" type="primary"> 返回</el-button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onMounted, nextTick, watch } from 'vue'
import { Promotion } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps<{
    slideBarLength: number
}>()

const back = () => {
    router.back()
}

const emit = defineEmits(['on-submit'])

const submit = () => {
    emit('on-submit')
}

const toQuestion = async (index: number) => {
    await nextTick()
    const slideBarList = document.querySelectorAll('.question-title')
    const target = slideBarList[index - 1]
    target.scrollIntoView({ behavior: 'smooth' })
}

</script>

<style lang="less">
.question-sidebar {
    width: 90px;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
    background: linear-gradient(0deg, #151515 0%, #545C64 100%);
    color: white;
    z-index: 5;
    min-height: 130px;
    max-height: 800px;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 5px;

    .question-items {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;

        span {
            border-radius: 100px;
            display: inline-block;
            border: 1px solid #ccc;
            width: 30px;
            height: 30px;
            line-height: 30px;

            &:hover {
                background: linear-gradient(0deg, #8F77E1 0%, #03CEDF 100%);
                width: 100%;
                color: black;
                transition: all .5s;
            }
        }

    }

    .question-submit {
        color: #fa9908;
        font-size: 23px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        margin-bottom: 15px;
    }
}
</style>