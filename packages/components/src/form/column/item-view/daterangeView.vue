<!--日期范围-->
<template>
  <el-form-item :label="column.title+'：'" :prop="column.name">
    <el-date-picker
    style="width:100%"
      v-model="value"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
</template>
<script setup>
import { computed }  from 'vue'
const emit = defineEmits(["update:data"])

  const props = defineProps({
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: Array,
      default: () => {},
    },
  })
  const value =computed ({
    get: function() {
      return props.data
    },
    set: function(val) {
      emit('update:data', val)
    }
  })
</script>
