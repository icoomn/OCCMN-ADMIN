<template>
    <!-- 搜索 -->
   <div class="search">
        <div class="search__left">
            <el-date-picker
                v-model="dateRange"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
            />
        </div>
        <div class="search__right"></div>
    </div>

    <!-- 图表 -->
    <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="12">
            <div class="charts-wrapper">
                <div class="charts-report" id="aa" style="width: 100%; height: 100%;"></div>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="charts-wrapper">
                <div class="charts-report"></div>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue'
    import * as echarts from 'echarts'
    const dateRange = ref('')
    type EChartsOption = echarts.EChartsOption
    const option: EChartsOption = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
            }
        ]
    };
    onMounted(() => {
        echarts.init(document.getElementById('aa')!).setOption(option)
    })
</script>

<style scoped>
    .charts-wrapper {
        height: 500px;
        background-color: #eee;
    }
</style>