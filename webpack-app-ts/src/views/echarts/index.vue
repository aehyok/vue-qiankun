<template>
    <div class="dscreen-chart" ref="bar" id="bar" style="width: 400px;height: 216px;"></div>
</template>
    
<script setup lang='ts'>
import * as echarts from "echarts";
import { onMounted, reactive } from "vue";
enum OrientType {
    /**
     * 水平
     */
    horizontal = 'horizontal',

    /**
     * 竖直
     */
    vertical = 'vertical'
}
const state = reactive({
    chartsData: [
			{
				"name": "阿里",
				"value": 2.24
			},
			{
				"name": "腾讯",
				"value": 3.38
			},
			{
				"name": "字节",
				"value": 1.75
			},
            {
				"name": "1阿里",
				"value": 2.24
			},
            			{
				"name": "字节1",
				"value": 1.75
			},
            {
				"name": "1阿里2",
				"value": 2.24
			},
		],
})
onMounted(() => {
    let dom = document.getElementById("bar")
    let myChart: any
    if (dom) {
        myChart = echarts.init(dom)
    }

    // 绘制图表
    myChart.setOption({
        tooltip: {
            trigger: 'item',
            // 选中单项时的显示样式
            formatter: `{a} <br/>{b} : {c}万亿 ({d}%)`
        },
        // 每个饼的颜色
        color: ["#FA6400", "#44D7B6", "#0091FF", "#6DD400", "#F7B500"],
        
        // 分类块列表显示位置
        legend: {
            // 水平和竖直
            orient: OrientType.vertical,
            
            type: 'scroll',
            right: 10,
            x: 'center',
            textStyle: {
                color: "black"
            },
        },
        grid: {
            left: "40%",
            // right: "0%",
            // bottom: "0%",
            // top: "12%",
            // containLabel: true,
        },
        series: [
            {
                name: '企业市值',
                type: 'pie',
                radius: ['45%', '60%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: true,
                label: {
                    show: true,
                    color: "red",
                    formatter(data: any) {
                        console.log(data, 'sssss')
                        let { name, value } = data;
                        return name + ' ' + value + '万亿';
                    },
                },
                data: state.chartsData
            }
        ]
    })
})
</script>
    
<style lang="scss" scoped>
.dscreen-chart {
    border: 1px solid red;
}
</style>