<template>
  <el-row :gutter="20">
    <draggable  v-model="columnList"   @start="drag=true" 
  @end="drag=false"  item-key="name" class="dragClass">
      <template #item="{ element }">
        <component-view
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
</script>
<style lang="scss" scoped>
.dragClass{
  width: 100%;
}
</style>
