<template>
    <h3 class="title">课程目录</h3>
    <el-form ref="formEl" class="form" :model="form" :rules="rules" label-width="auto">
        <el-form-item prop="stage" label="阶段：">
            <el-input type="number" placeholder="请输入阶段" v-model.number="form.stage" />
        </el-form-item>
        <el-form-item prop="semester" label="学期：">
            <el-input type="number" placeholder="请输入学期" v-model.number="form.semester" />
        </el-form-item>
        <el-form-item prop="unit" label="单元：">
            <el-input type="number" placeholder="请输入单元" v-model.number="form.unit" />
        </el-form-item>
        <el-form-item prop="chapter" label="章节：">
            <el-input type="number" placeholder="请输入章节" v-model.number="form.chapter" />
        </el-form-item>
        <el-form-item prop="courseId" label="课程编号：">
            <el-input type="number" placeholder="请输入课程编号" v-model.number="form.courseId" />
        </el-form-item>
        <el-form-item prop="courseNumberd" label="课号：">
            <el-input type="number" placeholder="请输入课号" v-model.number="form.courseNumberd" />
        </el-form-item>
        <el-form-item prop="courseName" label="课程名称：">
            <el-input placeholder="请输入课程名称" v-model="form.courseName" />
        </el-form-item>
        <el-form-item prop="author" label="课程作者：">
            <el-input placeholder="请输入课程作者" v-model="form.author" />
        </el-form-item>
        <el-form-item prop="courseCategories" label="课程分类：">
            <el-input placeholder="请输入课程分类" v-model="form.courseCategories" />
        </el-form-item>
        <el-form-item prop="lessonType" label="课程类型：">
            <el-input placeholder="请输入课程类型" v-model="form.lessonType" />
        </el-form-item>
        <el-form-item prop="writingStyle" label="文体：">
            <el-input placeholder="请输入文体" v-model="form.writingStyle" />
        </el-form-item>
        <el-form-item prop="languageStyle" label="语体：">
            <el-input placeholder="请输入语体" v-model="form.languageStyle" />
        </el-form-item>
        <el-form-item>
            <div class="form-btns">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="onReset">重置</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { createCourse, updateCourse } from '@/apis/course'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus';
import type { Course } from './type'
const emit = defineEmits<{ (e: 'on-submit'): void }>()
const formEl = ref<FormInstance>()
const form = reactive<Course>({
    stage: 0,
    semester: 0,
    unit: 0,
    chapter: 0,
    courseId: 0,
    courseNumberd: 0,
    courseName: '',
    author: '',
    courseCategories: '',
    lessonType: '',
    writingStyle: '',
    languageStyle: '',
    showpopover: false,
    _id: ''
})
const rules = reactive<FormRules<Course>>({
    stage: [{ type: 'number', required: true, message: '请输入阶段', trigger: 'change' }, { type: 'number', message: '请输入阶段', trigger: 'blur' }],
    semester: [{ type: 'number', required: true, message: '请输入学期', trigger: 'change' }, { type: 'number', message: '请输入学期', trigger: 'blur' }],
    unit: [{ type: 'number', required: true, message: '请输入单元', trigger: 'change' }, { type: 'number', message: '请输入单元', trigger: 'blur' }],
    chapter: [{ type: 'number', required: true, message: '请输入章节', trigger: 'change' }, { type: 'number', message: '请输入章节', trigger: 'blur' }],
    courseId: [{ type: 'number', required: true, message: '请输入课程编号', trigger: 'change' }, { type: 'number', message: '请输入课程编号', trigger: 'blur' }],
    courseNumberd: [{ type: 'number', required: true, message: '请输入课号', trigger: 'change' }, { type: 'number', message: '请输入课号', trigger: 'blur' }],
    courseName: [{ required: true, message: '请输入课程名称', trigger: 'change' }, { message: '请输入课程名称', trigger: 'blur' }],
    author: [{ required: true, message: '请输入课程作者', trigger: 'change' }, { message: '请输入课程作者', trigger: 'blur' }],
    courseCategories: [{ required: true, message: '请输入课程分类', trigger: 'change' }, { message: '请输入课程分类', trigger: 'blur' }],
    lessonType: [{ required: true, message: '请输入课程类型', trigger: 'change' }, { message: '请输入课程类型', trigger: 'blur' }],
    writingStyle: [{ required: true, message: '请输入文体', trigger: 'change' }, { message: '请输入文体', trigger: 'blur' }],
    languageStyle: [{ required: true, message: '请输入语体', trigger: 'change' }, { message: '请输入语体', trigger: 'blur' }],
})
const onSubmit = async () => {
    formEl.value?.validate(async (valid) => {
        if (valid) {
            form._id ? null : Reflect.deleteProperty(form, '_id')
            const res = await (form._id ? updateCourse(form) : createCourse(form))
            if (res?.code == 200) {
                ElMessage.success(res.message)
                emit('on-submit')
                onReset()
            } else {
                ElMessage.error(res?.message || '提交失败')
            }
        }
    })
}

const onUpdateForm = (data: typeof form) => {
    Object.assign(form, data)
}
const onReset = () => {
    formEl.value?.resetFields()
    form._id = ''
}

defineExpose({
    onSubmit,
    onReset,
    onUpdateForm
})
</script>

<style scoped>
.title {
    margin-bottom: 20px;
}

.form {
    width: 90%;
    margin: 30px;
}

.form-btns {
    display: flex;
    justify-content: center;
    width: 100%
}
</style>