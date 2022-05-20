<!--简单文本框-->
<template>
  <el-form-item :label="column.title + '：'" :prop="column.name">
    <span>{{ value }}</span>
  </el-form-item>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  column: {
    type: [Object],
    default: () => {}
  },
  data: {
    type: String,
    default: ''
  }
})
const { column } = props

const value = computed({
  get: function () {
    return props.data
  }
})
</script>
