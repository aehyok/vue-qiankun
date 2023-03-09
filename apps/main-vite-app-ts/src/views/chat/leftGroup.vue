<template>
  <template v-for="item in contentLength">
    <div :class="item === selected ? 'select-group ' : 'group-list'" @click="selectedClick(item)">
      <el-icon style="padding-left: 5px"><ChatDotRound /></el-icon>
      <div :class="item === selected ? 'select-group-title' : 'group-title'">
        {{ item }}chatgpt接口学习指南chatgpt接口学习指南
      </div>
      <div style="position: absolute; right: 5px; top: 10px" v-if="item === selected">
        <el-icon style="width: 20px; height: 20px" @click="editClick"><Edit /></el-icon>
        <el-icon style="width: 20px; height: 20px" @click="deleteClick"><DeleteFilled /></el-icon>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref(-1)
const editClick = () => {
  console.log('edit')
}

const deleteClick = () => {}

// 选中
const selectedClick = (item: any) => {
  selected.value = item
}
const contentLength = ref(10)
</script>
<style type="text/css" scoped>
.group-list {
  width: calc(100% - 20px);
  height: 40px;
  margin: 10px 10px 0 10px;
  display: flex;
  border-radius: 6px;
  justify-content: flex-start;
  align-items: center;
  color: white;
  font-size: 13px;
  position: relative;
}
.select-group {
  width: calc(100% - 20px);
  height: 40px;
  margin: 10px 10px 0 10px;
  display: flex;
  border-radius: 6px;
  border: 1px solid #24272e;
  justify-content: flex-start;
  align-items: center;
  color: white;
  font-size: 13px;
  position: relative;
  background-color: #24272e;
}

.group-title {
  margin-left: 5px;
  width: 195px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select-group-title {
  margin-left: 5px;
  width: 155px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
