<template>
    <el-dialog @close="closeDialog" v-model="dialogVisible" draggable :title="`课程代码(${form._id ? '修改' : '新增'})`">
        <el-form :label-width="60" ref="formRef" :model="form" :rules="ruels">
            <el-form-item key="1" prop="name" label="名称">
                <el-input v-model="form.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item key="2" label="其他">
                <el-input placeholder="待定暂时不需要填写" disabled></el-input>
            </el-form-item>
            <el-form-item key="3" prop="desc" label="描述">
                <el-input type="textarea" v-model="form.desc" placeholder="请输入描述"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="submit">提交</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import type { CourseCodeItem } from '@questionbank/config/course/index.ts'
import { watch, ref, reactive } from 'vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { createCourseCode, updateCourseCode } from '@/apis/course/code'
import { ElMessage } from 'element-plus'
const form = reactive({
    name: '',
    desc: '',
    _id: ''
})
const ruels = reactive<FormRules>({
    name: [
        { required: true, trigger: 'change', message: '请输入名称' },
        { message: '请输入名称', trigger: 'blur' },
        { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
    ],
    desc: [
        { required: true, message: '请输入描述', trigger: 'change' },
        { message: '请输入描述', trigger: 'blur' }
    ],

})
const emits = defineEmits(['on-submit'])
const formRef = ref<FormInstance>()
const dialogVisible = ref(false)
const modelValue = defineModel<boolean>({ required: true, default: false })
watch(modelValue, (val) => {
    dialogVisible.value = val
})
// 关闭弹框
const closeDialog = () => {
    modelValue.value = false
}
const submit = () => {
    formRef.value?.validate(async (valid) => {
        if (valid) {
            const forms = JSON.parse(JSON.stringify(form))
            if (!forms._id) {
                Reflect.deleteProperty(forms, '_id')
            }
            const res = await (forms._id ? updateCourseCode(forms) : createCourseCode({ ...forms }))
            if (res.code == 200) {
                ElMessage.success(res.message)
                emits('on-submit')
                closeDialog()
            } else {
                ElMessage.error(res.message)
            }
        }
    })
}
const onReset = () => {
    formRef.value?.resetFields()
    form._id = ''
}
const onUpdateForm = (item: CourseCodeItem) => {
    form._id = item._id
    form.name = item.name
    form.desc = item.desc
}
defineExpose({
    onReset,
    submit,
    onUpdateForm
})
</script>

<style></style>