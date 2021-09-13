<template>
  <el-row :gutter="20">
    <draggable
      v-model="columnList"
      @start="dragStart"
      @end="dragEnd"
      item-key="name"
      class="dragClass"
    >
      <template #item="{ element, index }">
        <div
          class="drag-default"
          @click="mouseOverClick(index)"
          @mouseup="mouseEnterClick(element)"
        >
          <component-view
            :columnSpan="columnSpan"
            :column="element"
            :formData="formData"
            :class="[selectIndex === index ? 'drag-select' : '']"
          >
          </component-view>
          <div
            :class="[selectIndex === index ? 'drag-operation' : 'drag-hidden']"
          >
          <el-button type="primary"><i class="el-icon-top" @click="TopComponentClick(true,index)"></i></el-button>
          <el-button type="primary"><i class="el-icon-bottom" @click="TopComponentClick(false,index)"></i></el-button>
          <el-button type="primary"><i class="el-icon-close" @click="deleteComponentClick(index)"></i></el-button>  
          </div>
        </div>
      </template>
    </draggable>
  </el-row>
</template>
<script setup>
import ComponentView from './input/component-view.vue'
import { ref } from 'vue'
import draggable from 'vuedraggable'
const emit = defineEmits(["update:data"])
const props = defineProps({
  columnList: {
    type: Array,
    default: () => [],
  },
  formData: {
    type: Object,
    default: () => { },
  },
  columnSpan: {
    type: Number,
    default: 24,
  },
  componentExampleClick: {
    type: Function,
    default: () => {

    }
  }
})

const drag = ref(false)
const selectIndex = ref(-1)
const dragStart = (event) => {
  console.log(event, 'event')
  drag.value = true
}

const dragEnd = (event) => {
  console.log(event, 'dragEnd')
}
const mouseOverClick = (index) => {
  selectIndex.value = index
  let currentSelectColumn = props.columnList[index]
  console.log(currentSelectColumn, '1111111111111')
}

const mouseLeaveClick = (index) => {
  selectIndex.value = -1
  console.log(index, '2222222222')
}

const deleteComponentClick = (index) => {
  console.log('deleteComponentClick', index)
}

const deleteComponentButtonClick = (index) => {
  console.log("deleteComponentButtonClick", index)
}

const swapItems = function(arr, index1, index2){
　　arr[index1] = arr.splice(index2,1,arr[index1])[0]
　　return arr
}

const upData = (arr, index) => {
　　if (arr.length > 1 && index !== 0) {
　　　　newArr = swapItems(arr, index, index - 1)
　　}
}

const TopComponentClick = (type, index) => {
  let array = props.columnList
  // let type = 1 
  array.splice(type ? index : index - 1, 1, ...array.splice(type ? index + 1 : index, 1, array[type ? index : index - 1]))
  console.log(array,'11111111111111111111111111')
  emit("update:columnList", array)
  
}

const handleDrop = () => {
  console.log('handleDrop')
}

const handleMouseDown = () => {
  console.log('handleMouseDown')
}

const deselectCurComponent = () => {
  console.log('deselectCurComponent')
}
const handleDragOver = () => {
  console.log('handleDragOver')
}

const mouseEnterClick = (element) => {
  console.log('mouseUpClick', element)
}
</script>
<style lang="scss" scoped>
.dragClass {
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
}

.drag-default {
  position: relative;
  width: 100%;
  height: 65px;
}
.drag-select {
  position: absolute;
  border: 1px dashed red;
  left: 0px;
  top: 0px;
  cursor: pointer;
}

.drag-component {
  position: absolute;
  right: 15px;
  top: 15px;
}

.drag-operation {
  position: absolute;
  right: 10px;
  bottom: 3px;
  width: 100px;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
}
.drag-hidden {
  display: none;
}
</style>
