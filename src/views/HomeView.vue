
<template>
    <el-row>
        <el-col :span="24">
            <el-card class="box-card">
                <el-row>
                    <el-col :span='12'>
                        <el-statistic title="净资产" :value="total" v-if="isShow" :precision="'2'">
                            <template #suffix>
                                <el-icon style="vertical-align: -0.125em">
                                    <IconShow @click="changeShow" />
                                </el-icon>
                            </template>
                        </el-statistic>
                        <el-statistic title="净资产" :value="'*****'" v-if="!isShow">
                            <template #suffix>
                                <el-icon style="vertical-align: -0.125em">
                                    <IconHide @click="changeShow" />
                                </el-icon>
                            </template>
                        </el-statistic>
                    </el-col>
                    <el-col :span='6'>
                        <el-statistic title="月度预算" :value="monthBudget" v-if="isShow" :precision="'2'">
                        </el-statistic>
                        <el-statistic title="月度预算" :value="'*****'" v-if="!isShow">
                        </el-statistic>
                    </el-col>
                    <el-col :span='6'>
                        <el-statistic title="年度预算" :value="yearBudget" v-if="isShow" :precision="'2'">
                        </el-statistic>
                        <el-statistic title="年度预算" :value="'*****'" v-if="!isShow">
                        </el-statistic>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="box-card">
                <el-row>
                    <el-col :span='12' :xs="24">
                        <div class="item">本月开支：
                            <span class="expend">{{ monthExpend }}</span>/
                            <span class="income">{{ monthIncome }}</span>
                        </div>
                    </el-col>
                    <el-col :span='12' :xs="24">
                        <div class="item">本年开支：
                            <span class="expend">{{ yearExpend }}</span>/
                            <span class="income">{{ yearIncome }}</span>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="记账" name="first">
                    <AddAccount :categorys="categoryOptions" :key="'add'" v-if="isready" />
                </el-tab-pane>
                <el-tab-pane label="统计表" name="second">
                    <Statistics :categorys="categoryOptions" :key="'table'" v-if="isready" />
                </el-tab-pane>
                <el-tab-pane label="统计图" name="third">
                    <Diagram v-if="isready" :key="'diagram'" />
                </el-tab-pane>
            </el-tabs>

        </el-col>
    </el-row>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getBalance, getMainCategory } from '../util/axiosHttp'
import AddAccount from '../components/AddAccount.vue'
import Statistics from '../components/Statistics.vue'
import Diagram from '../components/Diagram.vue'
import IconShow from '../components/icons/IconShow.vue'
import IconHide from '../components/icons/IconHide.vue'
const total = ref(0);
const monthIncome = ref(0);
const monthExpend = ref(0);
const yearIncome = ref(0);
const yearExpend = ref(0);
const monthBudget = ref(0);
const yearBudget = ref(0);
const budget = ref(0);
const isready = ref(false)
const activeName = ref('first');
const categoryOptions = reactive([]);
const isShow = ref(false)

onMounted(() => {
    getBalance().then(res => {
        const data = res;
        total.value = data.balance;
        monthIncome.value = data.month_income;
        monthExpend.value = data.month_costs;
        yearIncome.value = data.year_income;
        yearExpend.value = data.year_costs;
        monthBudget.value = data.month_budget;
        yearBudget.value = data.year_budget;
    })
    getMainCategory().then(res => {
        categoryOptions.length = 0;
        const categorys = res;
        for (let item of categorys) {
            const obj = {
                value: item[0],
                label: item[0],
                children: []
            }
            item[1].forEach(ele => {
                obj.children.push({ value: ele, label: ele });
            })
            categoryOptions.push(obj)
        }
    }).finally(() => {
        isready.value = true;
    });
})
const changeShow = () => {
    isShow.value = !isShow.value
}
</script>
<style scoped>
.box-card {
    margin-bottom: 10px;
}

.box-card .item {
    margin-bottom: 5px;
}

.box-card .item .expend {
    color: green;
}

.box-card .item .income {
    color: red;
}
</style>