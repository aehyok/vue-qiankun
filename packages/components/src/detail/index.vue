<template>
  <el-form label-width="100px">
    <template v-for="(column, index) in columnList" :key="index">
      <component
        :is="column.type ? column.type + 'Detail' : 'normalDetail'"
        :column="column"
        :data="columnData[column.name]"
      />
    </template>
  </el-form>
</template>
<script>
import { defineComponent } from 'vue'
import dateDetail from './column/dateDetail'
import dateTimeDetail from './column/dateTimeDetail'
import imageDetail from './column/imageDetail'
import normalDetail from './column/normalDetail'
import textAreaDetail from './column/textAreaDetail'

export default defineComponent({
  name: 'SlDetail',
  components: { dateDetail, dateTimeDetail, imageDetail, normalDetail, textAreaDetail }
})
</script>
<script setup>
const props = defineProps({
  columnList: {
    type: [Array],
    default: () => []
  },
  columnData: {
    type: Object,
    default: () => {}
  }
})
console.log('details View', props)
</script>
