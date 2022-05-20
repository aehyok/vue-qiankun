<!--日期格式类型-->
<template>
  <el-form-item :label="column.title + '：'" :prop="column.name" :rules="rules">
    <el-date-picker
      style="width: 100%"
      v-model="value"
      type="date"
      placeholder="选择日期"
      format="YYYY-MM-DD"
    >
    </el-date-picker>
  </el-form-item>
</template>
<script setup>
import { computed, reactive } from 'vue'
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
const { column, data } = props
const state = reactive({
  data: data
})
const rules = [
  {
    required: column.required,
    message: `请输入${column.title}`
  }
]
const value = computed({
  get: function () {
    return props.data
  },
  set: function (val) {
    emit('update:data', val)
  }
})
</script>
