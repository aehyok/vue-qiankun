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
        <component-view
          @mouseover="mouseOverClick(index)"
          @mouseleave="mouseLeaveClick(index)"
          :class="selectIndex === index ? 'select-class' : ''"
          :columnSpan="columnSpan"
          :column="element"
          :formData="formData"
        />
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
  console.log(index, '1111111111111')
}

const mouseLeaveClick = (index) => {
  selectIndex.value = -1
  console.log(index, '2222222222')
}
</script>
<style lang="scss" scoped>
.dragClass {
  width: 100%;
}
.select-class {
  border: 1px dashed black;
  cursor: pointer;
  position: relative;
}
</style>
