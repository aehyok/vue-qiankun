<template>
  <el-button
    :style="{
      // border: '0px',
      width: column.width + 'px',
      height: column.height + 'px'
    }"
    >按钮</el-button
  >
</template>
<script lang="ts" setup>
// eslint-disable-next-line no-undef
const props = defineProps({
  column: {
    type: [Object],
    default: () => {}
  }
})
console.log(props.column, 'column-props--reactive')
</script>
<style lang="scss" scoped></style>
