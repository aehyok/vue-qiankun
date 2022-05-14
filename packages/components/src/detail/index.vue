<template>
  <el-form label-width="100px">
    <template v-for="(column, index) in columnList">
      <component
        :is="column.type ? column.type + 'Detail' : 'normalDetail'"
        :column="column"
        :data="columnData[column.name]"
      />
    </template>
  </el-form>
</template>
<script setup>
const props = defineProps({
  columnList: {
    type: [Array],
    default: () =>[]
  },
  columnData: {
    type: Object,
    default: () => {}
  }
})
console.log('details View', props)
</script>