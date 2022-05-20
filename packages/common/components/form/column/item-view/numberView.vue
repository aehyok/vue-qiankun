<!--number数值类型-->
<template>
  <el-form-item :label="column.title + '：'" :prop="column.name" :rules="rules">
    <el-input type="number" v-model="value"></el-input>
  </el-form-item>
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
    type: Number,
    default: undefined
  }
})

const { column } = props
const rules = [
  {
    required: !!column.required,
    message: `请输入${column.title}`
  }
]
const value = computed({
  get: function () {
    return props.data
  },
  set: function (val) {
    console.log(typeof val, val, '---------------number')
    if (val) {
      emit('update:data', Number(val))
    } else {
      emit('update:data', undefined)
    }
  }
})
</script>
