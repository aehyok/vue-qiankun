<!--number数值类型-->
<template>
  <el-form-item :label="column.title+'：'" :prop="column.name" :rules="rules">
    <el-input type="number" v-model="value"></el-input>
  </el-form-item>
</template>
<script setup>
import {computed } from 'vue'
  const emit = defineEmits(["update:data"])
  const props = defineProps({
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: Number,
      default: undefined,
    }
  })

  console.log('ddds',  "--------------")

  const { column } = props
  const rules = [
    {
      required: !!column.required,
      message: `请输入${column.title}`,
    },
  ]
  const value =computed ({
    get: function() {
      return props.data
    },
    set: function(val) {
      emit('update:data', val)
    },
  })
</script>
