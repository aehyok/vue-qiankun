<template>
  <el-form-item :label="column.label + '：'">
    <span>{{ value }}</span>
  </el-form-item>
</template>
<script setup>
import { useDate } from '@aehyok/utils'

const useUtilsDate = useDate()
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
const value = useUtilsDate.convertDate(props.data)
</script>
