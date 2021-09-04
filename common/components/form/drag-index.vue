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
          @mouseover="mouseOverClick(index)"
          @mouseout="mouseLeaveClick(index)"
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
            <i class="el-icon-close" @click="deleteComponentClick(index)"></i>
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
  right: 0px;
  width: 100%;
  bottom: 3px;
  width: 100px;
}
.drag-hidden {
  display: none;
}
</style>
