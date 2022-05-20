<template>
  <el-form-item :label="column.label + '：'">
    <span>{{ value }}</span>
  </el-form-item>
</template>
<script setup>
import { convertDate } from '../../../utils/date'
console.log('--date')
const props = defineProps({
  column: {
    type: Object,
    default: () => {}
  },
  data: {
    type: String,
    default: ''
  }
})
console.log(props.data, 'date')
const value = convertDate(props.data)
</script>
