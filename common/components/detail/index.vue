<template>
  <el-form label-width="100px">
    <template v-for="(column, index) in columns">
      <component
        :is="column.type ? column.type + 'Detail' : 'normalDetail'"
        :column="column"
        :data="infoObj[column.name]"
      />
    </template>
  </el-form>
</template>
<script setup>
import { reactive } from 'vue'
import { convertDate } from '../../../common/utils/date';
console.log('details View')

const infoObj = reactive({
  type: "事件类型",
  address: "事发地址",
  createdByName: "上报人员",
  createdAt: "2021-09-23T17:57:59",
  descript: "测试",
  imageFiles: [
    {
      "id": 2253,
      "originName": "标准图1.jpg",
      "byteSize": "86158",
      "relativePath": "/1/6/169e75990fc3e348b13b7bf2ac778042.jpg",
      "extensionName": ".jpg",
      "fileType": 1,
      "md5": "2ed41cb75b21e9476f4f5f4a8e0e1507",
      "thumbnailId": 0,
      "thumbnailRelativePath": "/1/6/169e75990fc3e348b13b7bf2ac778042.jpg",
      "used": false,
      "isMaterial": false,
      "url": "https://dvs-sit1.sunlight-tech.com/sundfs/1/6/169e75990fc3e348b13b7bf2ac778042.jpg",
      "thumbnailUrl": "https://dvs-sit1.sunlight-tech.com/sundfs/1/6/169e75990fc3e348b13b7bf2ac778042.jpg"
    },
    {
      "id": 2255,
      "originName": "标准图.jpg",
      "byteSize": "36854",
      "relativePath": "/2/b/2b52cf1aab0f99d631ec3d769988f528.jpg",
      "extensionName": ".jpg",
      "fileType": 1,
      "md5": "5e7a86d478bc7a992b5899347e8cc085",
      "thumbnailId": 0,
      "thumbnailRelativePath": "/2/b/2b52cf1aab0f99d631ec3d769988f528.jpg",
      "used": false,
      "isMaterial": false,
      "url": "https://dvs-sit1.sunlight-tech.com/sundfs/2/b/2b52cf1aab0f99d631ec3d769988f528.jpg",
      "thumbnailUrl": "https://dvs-sit1.sunlight-tech.com/sundfs/2/b/2b52cf1aab0f99d631ec3d769988f528.jpg"
    }
  ]
})

const columns = [
  {
    label: "事件类型",
    name: "type",
    dictionary: [],
  },
  {
    label: "事发地址",
    name: "address",
  },
  {
    label: "上报人员",
    name: "createdByName",
  },
  {
    label: "上报日期",
    name: "createdAt",
    type: "date",
  },
  {
    label: "问题描述",
    name: "descript",
  },
  {
    label: "上传照片",
    name: "imageFiles",
    type: "image",
  }
]
</script>