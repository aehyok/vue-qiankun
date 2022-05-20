<template>
  {{ column.title }}：
  <el-date-picker
    v-model="value"
    type="daterange"
    @change="changeDate"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
  >
    <!-- :default-value="[timeDefault, timeDefault]" -->
  </el-date-picker>
</template>
<script setup>
import { computed } from 'vue'
const emit = defineEmits(['update:data'])
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

const value = computed({
  get: function () {
    return props.data
  },
  set: function (val) {
    emit('update:data', val)
  }
})

const changeDate = () => {}
</script>
