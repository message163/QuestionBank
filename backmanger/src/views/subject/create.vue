<template>
    <el-dialog @close="closeDialog" :model-value="props.modelValue">
        <el-form>
            <el-form-item v-for="(item, index) in formData">
                <el-select v-model="item.grade">
                    <el-option :value="item.value" :label="item.label" v-for="item in gradeList"></el-option>
                </el-select>
                <el-row>
                    <el-col v-for="(sub, index) in item.subject">
                        <el-input v-model="sub.name"></el-input>
                        <el-button v-if="isLast(index, item.subject.length - 1)"
                            @click="addSubject(item.subject)">增加学科</el-button>
                        <el-button @click="deleteSubject(item.subject, index)" v-if="index != 0">删除学科</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-button v-if="isLastGrade(index, formData.length - 1)"
                            @click="addGrade(formData)">添加年级</el-button>
                        <el-button v-if="isFirstGrade(index)" @click="deleteGrade(formData, index)">删除年级</el-button>
                    </el-col>
                </el-row>
            </el-form-item>

        </el-form>
        <el-button @click="submit(formData)">提交</el-button>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { gradeList } from '@questionbank/config/grade/index.ts'
import { useSubject } from './hooks/subjectHooks'
import { useGrade } from './hooks/gradeHooks'

const props = withDefaults(defineProps<{
    modelValue: boolean
}>(), {
    modelValue: false
})

const emits = defineEmits<{
    (e: 'update:modelValue', hide: boolean): void
}>()

const closeDialog = () => {
    emits('update:modelValue', false)
}

const { formData, addSubject, deleteSubject, isLast } = useSubject()

const { addGrade, deleteGrade, isFirstGrade, isLastGrade, submit } = useGrade()



</script>

<style></style>