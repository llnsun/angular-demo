<template>
    <div style="text-align: end;">
        <el-form label-width="80px" :inline="true">
            <el-form-item label="时间" style="width: 40%">
                <el-date-picker format="YYYY-MM-DD" value-format="YYYY-MM-DD" v-model="form.time" type="daterange"
                    start-placeholder="起始时间" end-placeholder="结束时间" />
            </el-form-item>
            <el-form-item label="类型" style="width: 40%">
                <el-select v-model="form.chartType" placeholder="Select">
                    <el-option label="按照大类统计支出" value="option1" />
                    <el-option label="按照小类统计支出" value="option2" />
                    <el-option label="按照人统计支出" value="option3" />
                    <el-option label="按照人统计收入" value="option4" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <div style="width: 100%;">
                    <el-button type="primary" @click="getData">生成图</el-button>
                </div>

            </el-form-item>
        </el-form>
        <div ref="chartContainer" class="chartContainer" style="width: 700px;height:400px;"></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted, ref, reactive } from 'vue';
import { getChartdata } from '../util/axiosHttp'
const chartContainer = ref(null);
const time = new Date();
const month = time.getMonth() >= 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)
const date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate()
const time1 = time.getFullYear() + '-' + month + '-01'
const time2 = time.getFullYear() + '-' + month + '-' + date;
const form = reactive({
    time: [time1, time2],
    chartType: 'option1'
})
const option = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left'
    },
    series: [
        {
            name: 'Account From',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
let myChart
const getData = () => {
    const obj = {
        chartType: form.chartType,
        start: form.time[0] || '',
        end: form.time[1] || '',
    }
    getChartdata(obj).then(res => {
        const seriesData = res.seriesData;
        option.series[0].data = seriesData;
        myChart.setOption(option);
    })
}
onMounted(() => {
    myChart = echarts.init(chartContainer.value);
    getData();
})
</script>  
<style scoped>
@media screen and (max-width:768px) {
    .chartContainer {
        width: 400px !important;
    }
}
</style>  