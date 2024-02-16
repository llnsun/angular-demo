<template>
    <el-form ref="ruleFormRef" :model="form" :inline="true" :rules="rules" class="demo-ruleForm" status-icon>
        <el-form-item label="授权码" prop="user" style="width: 60%">
            <el-input v-model="form.user" />
        </el-form-item>
        <el-form-item style="width: 20%">
            <el-button type="primary" @click="login(ruleFormRef)">提交</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { userlogin } from '../util/axiosHttp.js';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
const ruleFormRef = ref()
const form = reactive({
    user: '',
})
const rules = reactive({
    user: [
        { required: true, message: '请输入授权码', trigger: 'blur' },
    ]
})
const router = useRouter();
const login = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const params = {
                username: form.user
            }
            userlogin(params).then((res) => {
                if (res == 'ok') {
                    localStorage.setItem('is$$Login$$xxm&&ccb', Cookies.get('session'))
                    Cookies.set('isLogin', true, { expires: 30 })
                    router.push('/index');
                } else {
                    form.user = '';
                    Cookies.remove('isLogin')
                    localStorage.removeItem('is$$Login$$xxm&&ccb')
                }
            }).catch(() => {
                Cookies.remove('isLogin')
                localStorage.removeItem('is$$Login$$xxm&&ccb')
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>


