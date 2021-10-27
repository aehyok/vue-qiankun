<template>
  <el-row :gutter="20">
    <template v-for="(item, index) in columnList" :key="index + 'formView'">
      <component-view
        :columnSpan="columnSpan"
        :column="item"
        :formData="formData"
        v-if="ifshow(item,formData)"
      />
    </template>
  </el-row>
</template>
<script setup>
import ComponentView from './column/component-view.vue'
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
  }
})

const ifshow = (column,formData) => {
  if(column && column.ifshow) {
    return column.ifshow(formData)
  } else {
    return true
  }
}
</script>
<style scoped></style>
