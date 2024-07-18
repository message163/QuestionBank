<template>
    <el-dialog @close="closeDialog" v-model="dialogVisible" draggable title="用户">
        <el-form ref="formRef" :model="form" :rules="ruels">
            <el-form-item v-if="!form._id" key="1" prop="account" label="账号">
                <el-input v-model="form.account" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item key="2" v-if="!form._id" prop="password" label="密码">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item key="3" prop="username" label="名称">
                <el-input v-model="form.username" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item key="4" prop="leval" label="角色">
                <el-select v-model="form.leval" placeholder="请选择角色">
                    <el-option :label="item.name" :value="item.id" v-for="item in userLevalList"></el-option>
                </el-select>
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
import { userLevalList, UserLeval, type UserList } from '@questionbank/config/user/index.ts'
import { watch, ref, reactive } from 'vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { getAccount, createUser, updateUser } from '@/apis/user'
import { ElMessage } from 'element-plus'
const form = reactive({
    username: '',
    account: '',
    password: '',
    leval: UserLeval.guest,
    _id: ''
})
const ruels = reactive<FormRules>({
    username: [
        { required: true, trigger: 'change', message: '请输入名称' },
        { message: '请输入名称', trigger: 'blur' },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    ],
    account: [
        {
            required: true, message: '请输入账号', trigger: 'change'
        },
        {
            trigger: 'blur',
            validator: (rule, value, callback) => {
                if (!value) return callback(new Error('请输入账号'))
                getAccount({ keyWord: value }).then((res) => {
                    res.data.code == 200 ? callback() : callback(new Error(res.data.message))
                }).catch((err) => {
                    callback(new Error(err))
                })
            }
        }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
    ],
    leval: [{ required: true, message: '请选择角色', trigger: 'change', type: 'number' }, { message: '请选择角色', trigger: 'blur', type: 'number' }],
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
            } else {
                Reflect.deleteProperty(forms, 'password')
            }
            const res = await (forms._id ? updateUser(forms) : createUser({ ...forms }))
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
const onUpdateForm = (item: UserList) => {
    form._id = item._id
    form.username = item.username
    form.account = item.account
    form.password = item.password
    form.leval = item.leval
}
defineExpose({
    onReset,
    submit,
    onUpdateForm
})
</script>

<style></style>