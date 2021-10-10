<template>
  <el-form-item :label="column.label + '：'">
    <span>{{ data }}</span>
  </el-form-item>
</template>
<script setup>
const props = defineProps({
  column: {
    type: Object,
    default: () => {

    }
  },
  data: {
    type: String,
    default: ""
  }
})

</script>