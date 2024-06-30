<template>
    <el-dialog title="学科" @close="closeDialog" :model-value="props.modelValue">
        <el-form ref="formInstance" :model="formData">
            <el-form-item
                :rules="{ required: true, trigger: 'change', validator: (rule, value, callback) => validator(rule, value, callback, item, index) }"
                :prop="`gradeList.${index}.grade`" label="年级" v-for="(item, index) in formData.gradeList">
                <el-select clearable v-model="item.grade">
                    <el-option :disabled="disableGrade.includes(subItem.value)" :value="subItem.value"
                        :label="subItem.label" v-for="subItem in gradeList"></el-option>
                </el-select>
                <el-row class="full m-t">
                    <el-col v-for="(sub, index) in item.subject">
                        <div class="flex full">
                            <el-input placeholder="请输入学科例如(语文，数学，英语)" v-model="sub.name"></el-input>
                            <div class="button-group flex m-l">
                                <el-button :icon="CirclePlus" type="primary"
                                    v-if="isLast(index, item.subject.length - 1)"
                                    @click="addSubject(item.subject)"></el-button>
                                <el-button :icon="CircleClose" type="danger" @click="deleteSubject(item.subject, index)"
                                    v-if="index != 0"></el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-divider></el-divider>
                <el-row>
                    <el-col>
                        <div class="flex">
                            <el-button type="primary" v-if="isLastGrade(index, formData.gradeList.length - 1) && !formData.gradeList[0]._id"
                                @click="addGrade(formData.gradeList)">添加年级</el-button>
                            <el-button type="danger" v-if="isFirstGrade(index)"
                                @click="deleteGrade(formData.gradeList, index)">删除年级</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click="closeDialog" type="primary">取消</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, computed, reactive } from 'vue'
import type { FormInstance, FormItemRule } from 'element-plus';
import { gradeList, type GradeForm, type Grade } from '@questionbank/config/grade/index.ts'
import { useSubject } from './hooks/subjectHooks'
import { useGrade } from './hooks/gradeHooks'
import { CirclePlus, CircleClose } from '@element-plus/icons-vue'
import { createGrade, updateGrade } from '@/apis/grade'
const props = withDefaults(defineProps<{
    modelValue: boolean
}>(), {
    modelValue: false
})

const formInstance = ref<FormInstance>()

const emits = defineEmits<{
    (e: 'update:modelValue', hide: boolean): void
    (e: 'on-submit'): void
}>()

const closeDialog = () => {
    emits('update:modelValue', false)
}

const submitSuccess = () => {
    emits('on-submit')
}

const { addSubject, deleteSubject, isLast } = useSubject()

const { addGrade, deleteGrade, isFirstGrade, isLastGrade, formData, disableGrade, resetForm } = useGrade()

const validator = (_: any, value: number, callback: Function, item: Grade, index: number) => {
    const subjectValue = item.subject.every((sub) => sub.name)
    if (item.grade && subjectValue) {
        callback()
    } else {
        callback(new Error('请选择年级并且填写学科'))
    }
}

const submit = () => {
    formInstance.value?.validate((valid) => {
        if (valid) {
            const originalFormData = JSON.parse(JSON.stringify(formData))
            originalFormData.gradeList.forEach((item: Grade) => {
                Reflect.deleteProperty(item, '_id')
            })
            formData.gradeList[0]._id ? updateGrade(formData.gradeList[0]) : createGrade(originalFormData.gradeList)
            closeDialog()
            submitSuccess()
        }
    })
}

const refInjectGrade = (params: Grade) => {
    formData.gradeList[0] = params as any
}

const reset = () => {
    formInstance.value?.resetFields()
    resetForm()
}

defineExpose({
    reset,
    submit,
    refInjectGrade
})

</script>

<style scoped lang="less">
.flex {
    display: flex;
}

.flex-1 {
    flex: 1
}

.full {
    width: 100%
}

.m-t {
    margin-top: 10px;
}

.m-l {
    margin-left: 10px;
}

.block {
    display: block;
}

.button-group {
    width: 130px;
}
</style>