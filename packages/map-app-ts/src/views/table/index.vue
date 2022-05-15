<template>
  <el-table :data="tableData" style="width: 100%" border :span-method="arraySpanMethod">
    <el-table-column prop="dx" label="大项" width="180" />
    <el-table-column prop="zx" label="子项" width="180" />
    <el-table-column prop="fx" label="分项" width="180" />
    <el-table-column prop="count" label="汇总数据（万元）" width="180" />
    <el-table-column prop="s" label="审核"  align="center">
      <template #default="scope">
        <div style="display: flex; align-items: center">
    <el-radio  label="1" size="small"> 通过</el-radio>
    <el-radio  label="2" size="small">不通过</el-radio>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="c" label="操作" align="center">
            <template #default="scope">
        <div style="display: flex; align-items: center">
         <el-button text>详情</el-button>
         <el-button text>编辑</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const tree = [
  {
    key: '1',
    value : '公共基础设施建设',
    rowSpan: 9,
    colSpan: 1,
    isValue : 0
  }
]

const tableData = [
  {
    "id": 1,
    "dx": '公共基础设施建设',
    "zx": '水电路气网及排水',
    "fx": '管道铺设',
    "count": 101,
  },
  {
    "id": 2,
    "dx": '公共基础设施建设',
    "zx": '水电路气网及排水',
    "fx": '供电建设',
    "count": 102,
  },
  {
    "id": 3,
    "dx": '公共基础设施建设',
    "zx": '水电路气网及排水',
    "fx": '道路硬化',
    "count": 103,
  },
  {
    "id": 4,
    "dx": '公共基础设施建设',
    "zx": '水电路气网及排水',
    "fx": '清洁能源',
    "count": 104,
  },
  {
    "id": 5,
    "dx": '公共基础设施建设',
    "zx": '水电路气网及排水',
    "fx": '信息基础建设',
    "count": 105,
  },
  {
    "id": 6,
    "dx": '公共基础设施建设',
    "zx": '水电路气网及排水',
    "fx": '边沟建设',
    "count": 106,
  },
    {
    "id": 7,
    "dx": '公共基础设施建设',
    "zx": '文化娱乐设施',
    "fx": '文化活动广场',
    "count": 107,
  },
  {
    "id": 8,
    "dx": '公共基础设施建设',
    "zx": '文化娱乐设施',
    "fx": '信息基础建设',
    "count": 108,
  },
  {
    "id": 9,
    "dx": '公共基础设施建设',
    "zx": '文化娱乐设施',
    "fx": '文化广场景观',
    "count": 109,
  },
]

const arraySpanMethod = ({
  row,
  column,
  rowIndex,
  columnIndex,
}: any) => {
  // console.log( column, 'row-column-rowIndex-columnIndex')
  
  console.log(row[column.property], 'ßdddddd')
  let obj = tree.find(item => item.value === row[column.property])
  if(obj && obj.value) {
    console.log(row[column.property], rowIndex, columnIndex, ';;;;;;')
    if(obj.isValue === 0) {
      obj.isValue = 1
      console.log(tree, 'tree--tree')
      return [
        obj.rowSpan, obj.colSpan
      ]
    } else {
      console.log(row[column.property], rowIndex, columnIndex,'tree--xiamian')
      if(rowIndex === 0 && columnIndex === 0) {
      return [
        obj.rowSpan, obj.colSpan
      ]
      } else {
        return [0 ,0]
      }
    }
  } 
  // if(rowIndex >= 0 && rowIndex <= 5 && columnIndex === 1) {
  //     console.log(rowIndex, columnIndex , 'rowIndex-columnIndex')
  //   return [6,1]
  // } else {
  //   if(columnIndex === 1) {
  //     return [0, 0]
  //   }
  // }

  // if(rowIndex >= 7 && columnIndex === 1) {
  //   return [3, 1]
  // } else {
  //   if(columnIndex === 1) {
  //     return [0, 0]
  //   }
  // }
}
</script>
