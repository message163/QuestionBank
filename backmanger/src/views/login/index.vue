<template>
    <div class="login">
        <div class='login-right'>
            <div class="login-right-warp">
                <div class="login-right-warp-title">login</div>
                <div class="login-right-warp-form">
                    <div class="login-right-warp-form_title">用户名登录</div>
                    <el-form ref="form" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
                        label-width="auto" class="demo-ruleForm">
                        <el-form-item prop="account">
                            <el-input v-model="ruleForm.account" autocomplete="off" :prefix-icon="User"
                                placeholder="请输入账号" />
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="ruleForm.password" type="password" autocomplete="off" :prefix-icon="Lock"
                                placeholder="请输入密码" />
                        </el-form-item>
                        <el-form-item prop="code">
                            <div class="login-content-code">
                                <el-input class="login-content-code-input" v-model="ruleForm.code"
                                    :prefix-icon="Promotion" placeholder="请输入验证码" />
                                <div class="login-content-code-img" @click="generateCodeAsync" v-html="ruleForm.svg">
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item prop="remember">
                            <el-checkbox v-model="ruleForm.remember">记住我</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">登录</el-button>
                        </el-form-item>
                    </el-form>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { User, Lock, Promotion } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { getCode, login } from '@/apis/login';
import { ElMessage } from 'element-plus'
import { TOEKN } from '@/config/index'
import useMenu from '@/stores/menu'
import Cookie from 'js-cookie'
import md5 from 'md5'
const router = useRouter();
const { getRoutersList } = useMenu()
const form = ref<FormInstance>();

const generateCodeAsync = async () => {
    ruleForm.svg = await getCode<string>();
}

const init = () => {
    //如果是进入登录页那么应该清楚所有状态
    ruleForm.account = Cookie.get('account') || ''
    ruleForm.password = Cookie.get('password') || ''
    ruleForm.remember = (Cookie.get('account') || Cookie.get('password')) ? true : false
    localStorage.clear()
}

onMounted(() => {
    init()
    generateCodeAsync();
});

const ruleForm = reactive({
    account: '',
    password: '',
    svg: '',
    code: '',
    remember: false
});

const rules = reactive<FormRules<typeof ruleForm>>({
    account: [{ required: true, message: '请输入账号', trigger: 'change' }, { message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }, { message: '请输入密码', trigger: 'blur' }],
    code: [{ required: true, message: '请输入验证码', trigger: 'change' }, { message: '请输入验证码', trigger: 'blur' }],
    remember: [{ required: false, message: '请勾选记住我', trigger: 'change' }, { required: false, message: '请勾选记住我', trigger: 'blur' }],
});

const rememberCookie = () => {
    if (ruleForm.remember) {
        //存储三十天
        if (Cookie.get('account') || Cookie.get('password')) return;
        const expires = { expires: 30 }
        Cookie.set('account', ruleForm.account, expires)
        Cookie.set('password', ruleForm.password, expires)
    } else {
        Cookie.remove('account')
        Cookie.remove('password')
    }
}

const submitForm = () => {
    form.value?.validate(async (valid) => {
        if (valid) {
            try {
                const res = await login({ ...ruleForm, password: md5(ruleForm.password) });
                if (res.code == 200) {
                    ElMessage.info(res.data.message)
                    rememberCookie()
                    localStorage.setItem(TOEKN, res.data.token)
                    await getRoutersList()
                    router.replace('/page/course')
                } else {
                    ElMessage.error(res.data.message)
                }
            }
            catch (error: any) {
                const response = error?.response
                ElMessage.error(response?.data?.data?.message || '登录失败')
            }
        }
    })
};

</script>

<style scoped lang="less">
@theme: #29322F;

.login {
    width: 100vw;
    height: 100vh;
    background: url('@/assets/background/bg.jpg') no-repeat;
    background-size: 100%;

    .login-right {
        width: 650px;
        position: absolute;
        top: 200px;
        right: 100px;

        .login-right-warp {
            border: 1px solid #4C6256;
            border-radius: 10px;
            width: 500px;
            height: 550px;
            position: relative;
            overflow: hidden;
            background-color: #fff;
            margin: auto;

            .login-right-warp-title {
                height: 130px;
                line-height: 130px;
                font-size: 32px;
                font-weight: 800;
                text-align: center;
                animation: logoAnimation 0.3s ease;
                animation-delay: 0.3s;
                color: @theme;
            }

            .login-right-warp-form {
                padding: 0 50px 50px;
            }

            .login-right-warp-form_title {
                color: @theme;
                width: 100%;
                padding: 10px 0px;
                border-bottom: 1px solid #e4e7ed;
                position: relative;
            }

            .login-right-warp-form_title::after {
                content: '';
                position: absolute;
                width: 90px;
                height: 2px;
                background: @theme;
                bottom: 0;
                left: 0px;
            }
        }

        .el-form {
            margin-top: 30px;
        }

        .el-input {
            width: 100%;
            height: 40px;
        }

        .el-button {
            width: 100%;
            height: 40px;
            border-radius: 20px;
            background: @theme;
            border: @theme;
            margin: 20px 0px;
        }

        .login-content-code {
            display: flex;
            justify-content: space-between;
            width: 100%;
            margin-right: 10px;

            .login-content-code-input {
                flex: 1;
            }

            .login-content-code-img {
                width: 100px;
            }
        }
    }
}
</style>