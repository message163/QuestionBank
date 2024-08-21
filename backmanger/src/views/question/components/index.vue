<template>
    <div>
        <MultipleChoice @on-submit="onSubmit" ref="question" v-if="props.type === 1"></MultipleChoice>
        <MultipleChoiceQuestions @on-submit="onSubmit" ref="question" v-else-if="props.type === 2">
        </MultipleChoiceQuestions>
        <TrueOfFalse @on-submit="onSubmit" ref="question" v-else-if="props.type === 3"></TrueOfFalse>
        <FillInTheBlanks @on-submit="onSubmit" ref="question" v-else-if="props.type === 4"></FillInTheBlanks>
        <ShortAnswer @on-submit="onSubmit" ref="question" v-else-if="props.type === 5"></ShortAnswer>
        <ReadingQuestion @on-submit="onSubmit" ref="question" v-else-if="props.type === 6"></ReadingQuestion>
    </div>
</template>

<script setup lang='ts'>
import MultipleChoice from './MultipleChoice.vue'
import MultipleChoiceQuestions from './MultipleChoiceQuestions.vue';
import TrueOfFalse from './TrueOfFalse.vue';
import FillInTheBlanks from './FillInTheBlanks.vue';
import ShortAnswer from './ShortAnswer.vue';
import ReadingQuestion from './ReadingQuestion.vue';
import type { SubjectType, } from '@questionbank/config/subject/index.ts'
import { ref } from 'vue'
const question = ref<InstanceType<typeof MultipleChoice | typeof MultipleChoiceQuestions | typeof TrueOfFalse | typeof FillInTheBlanks | typeof ShortAnswer | typeof ReadingQuestion>>()
const props = defineProps<{
    type: SubjectType
}>()

const emits = defineEmits(['on-submit'])

const onSubmit = (data: any) => {
    emits('on-submit', data)
}

defineExpose({
    question
})

</script>

<style></style>