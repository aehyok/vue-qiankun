<template>
  <div class="dscreen-chart" id="chart" style="width: 400px; height: 216px"></div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts/core'
import { EChartsType, EChartsOption } from 'echarts/types/dist/shared'
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
  PieChart,
  PieSeriesOption
} from 'echarts/charts'
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ChartOption = echarts.ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
>

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer
])

enum OrientType {
  /**
   * 水平方向
   */
  horizontal = 'horizontal',

  /**
   * 竖直方向
   */
  vertical = 'vertical'
}
const state = reactive({
  chartsData: [
    {
      name: '阿里',
      value: 2.24
    },
    {
      name: '腾讯',
      value: 3.38
    },
    {
      name: '字节',
      value: 1.75
    },
    {
      name: '1阿里',
      value: 2.24
    },
    {
      name: '字节1',
      value: 1.75
    },
    {
      name: '1阿里2',
      value: 2.24
    }
  ]
})

onMounted(() => {
  let dom = document.getElementById('chart')
  let myChart: EChartsType | null = null
  if (dom) {
    myChart = echarts.init(dom)
    let options: EChartsOption = {
      // 每个饼的颜色
      color: ['#FA6400', '#44D7B6', '#0091FF', '#6DD400', '#F7B500'],

      // 整个div的背景颜色
      backgroundColor: '#dee1e6',
      grid: {
        left: '50%'
        // right: "0%",
        // bottom: "0%",
        // top: "12%",
        // containLabel: true,
      },
      tooltip: {
        trigger: 'item',
        // 选中单项时的显示样式
        formatter: `{a} <br/>{b} : {c}万亿 ({d}%)`
      },
      // 分类块列表显示位置
      legend: {
        // 水平和竖直
        orient: OrientType.horizontal,

        type: 'scroll', // 默认值为plain，图例过多时，使用scroll，有分页效果所以直接用scroll
        right: 5,
        textStyle: {
          color: 'black'
        }
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
            color: 'red',
            formatter(data: any) {
              console.log(data, 'sssss')
              let { name, value } = data
              return name + ' ' + value + '万亿'
            }
          },
          data: state.chartsData
        }
      ]
    }
    // 绘制图表
    myChart.setOption(options)
  }
})
</script>

<style lang="scss" scoped>
.dscreen-chart {
  border: 1px solid red;
}
</style>
