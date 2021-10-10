<!--switch切换本身就有值，可以考虑不进行判断必填项-->
<template>
  <el-form-item :label="column.title + '：'" :prop="column.name" >
    <el-switch v-model="value"></el-switch>
  </el-form-item>
</template>
<script setup>
import { computed } from 'vue'
  const emits = defineEmits(["update:data"])
  const props = defineProps({
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: Boolean,
      default: undefined, // 只有true和false两个值
    },
  })

  const { column }  = props
  const rules = [
    {
      required: column.required,
      message: `请输入${column.title}`,
    },
  ]
  const value =computed ({
    get: function() {
      return props.data
    },
    set: function(val) {
      emits('update:data', val)
    },
  })
</script>
