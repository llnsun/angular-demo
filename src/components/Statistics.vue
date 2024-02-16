<template>
    <div>
        <el-form label-width="80px" :inline="true">
            <el-form-item label="时间" style="width: 40%">
                <el-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="form.time" type="daterange"
                    start-placeholder="起始时间" end-placeholder="结束时间" />
            </el-form-item>
            <el-form-item label="所属人" style="width: 40%">
                <el-select v-model="form.user" placeholder="Select" style="width: 100%">
                    <el-option label="-" value="-" />
                    <el-option label="xxm" value="xxm" />
                    <el-option label="ccb" value="ccb" />
                </el-select>
            </el-form-item>
            <el-form-item label="类型" style="width: 40%">
                <el-radio-group v-model="form.in_ex" @change='redioChange'>
                    <el-radio label="option1">支出</el-radio>
                    <el-radio label="option2">收入</el-radio>
                    <el-radio label="option3">全部</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="分类" style="width: 40%">
                <el-cascader v-model="form.category" :options="categoryOptions" :props="cascaderProps"
                    style="width: 100%" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" :default-sort="{ prop: 'id' }" style="width: 100%">
            <el-table-column prop="id" label="序号" sortable />
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="amount" label="金额" />
            <el-table-column prop="category1" label="分类1" />
            <el-table-column prop="category2" label="分类2" />
            <el-table-column prop="owner" label="所属人" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF"
                        title="确认删除？" @confirm="deleteData(row)">
                        <template #reference>
                            <el-button>删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getTableList, deleteTableData } from '../util/axiosHttp.js';
const props = defineProps(['categorys']);
const categoryOptions1 = [{ value: '-', label: '-', children: [{ value: '-', label: '-' }] }];
const categoryOptions2 = [];
const categoryOptions3 = [{ value: '-', label: '-', children: [{ value: '-', label: '-' }] }];
props.categorys.forEach(ele => {
    const obj = JSON.parse(JSON.stringify(ele))
    obj.children.unshift({ value: '-', label: '-' });
    if (obj.value === '收入') {
        categoryOptions2.push(obj);
    } else {
        categoryOptions1.push(obj);
    }
})
let categoryOptions = [...categoryOptions1];
const tableData = ref([]);
const cascaderProps = {
    expandTrigger: 'hover',
}
const time = new Date();
const month = time.getMonth() >= 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
const date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
const time1 = time.getFullYear() + '-' + month + '-01'
const time2 = time.getFullYear() + '-' + month + '-' + date;
const form = reactive({
    category: ['-', '-'],
    time: [time1, time2],
    user: '-',
    in_ex: 'option1'
})
const redioChange = (ele) => {
    if (ele === 'option1') {
        categoryOptions = [...categoryOptions1];
        form.category = ['-', '-'];
    } else if (ele === 'option2') {
        categoryOptions = [...categoryOptions2];
        form.category = ['收入', '-'];
    } else if (ele === 'option3') {
        categoryOptions = [...categoryOptions3];
        form.category = ['-', '-'];
    }
}
const submitForm = () => {
    getList();
}
const getList = () => {
    tableData.value = [];
    const params = {
        start: form.time[0] || '',
        end: form.time[1] || '',
        category1: form.category[0] || '',
        category2: form.category[1] || '',
        category3: form.user,
        in_ex: form.in_ex
    }
    getTableList(params).then(res => {
        const list = res.content || [];
        list.forEach((ele, index) => {
            ele.id = index + 1;
        });
        tableData.value = list;
    });
}
const deleteData = (ele) => {
    deleteTableData({ timestamp: ele.timestamp }).then(() => {
        getList();
    })
}
onMounted(() => {
    getList();
})
</script>
