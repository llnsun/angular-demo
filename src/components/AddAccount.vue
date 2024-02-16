<template>
    <el-form ref="ruleFormRef" :model="form" label-width="80px" :rules="rules" class="demo-ruleForm" status-icon>
        <el-form-item label="分类" prop="category">
            <el-cascader v-model="form.category" :options="categorys" :props="cascaderProps" style="width: 100%" />
        </el-form-item>
        <el-form-item label="时间" prop="date">
            <el-date-picker format="YYYY/MM/DD" value-format="YYYY-MM-DD" v-model="form.date" type="date"
                placeholder="Pick a date" style="width: 100%" />
        </el-form-item>
        <el-form-item label="金额" prop="number">
            <el-input v-model="form.amount" type="number" clearable />
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="form.remark" clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { submitData } from '../util/axiosHttp.js'
defineProps(['categorys'])
const ruleFormRef = ref()
const cascaderProps = {
    expandTrigger: 'hover',
}
const form = reactive({
    category: [],
    date: '',
    amount: 0,
    remark: '',
})
const rules = reactive({
    category: [
        { required: true, message: '请选择分类', trigger: 'change' },
    ],
    date: [
        { required: true, message: '请选择时间', trigger: 'change' },
    ],
    amount: [
        {
            required: true,
            message: 'Please select Activity count',
            trigger: 'blur',
        },
        {
            min: 0, message: 'Please select Activity count',
            trigger: 'blur',
        }
    ]
})
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            const params = {
                date: form.date,
                'category-main': form.category[0] || '',
                'category-sub': form.category[1] || '',
                amount: form.amount,
                remark: form.remark
            }
            submitData(params).then(() => {
                form.amount = 0;
                form.remark = '';
                ElMessage({
                    message: '提交成功',
                    type: 'success',
                })
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>


