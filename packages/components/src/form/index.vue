<template>
  <el-row :gutter="20">
    <template v-for="(item, index) in columnList" :key="index + 'formView'">
      <component-view
        :columnSpan="columnSpan"
        :column="item"
        :formData="formData"
        v-if="ifshow(item, formData)"
      />
    </template>
  </el-row>
</template>
<script setup>
import ComponentView from './column/component-view.vue'
const props = defineProps({
  columnList: {
    type: Array,
    default: () => []
  },
  formData: {
    type: Object,
    default: () => {}
  },
  columnSpan: {
    type: Number,
    default: 24
  }
})

const ifshow = (column, data) => {
  if (column && column.ifshow) {
    console.log(
      column,
      typeof column.ifshow === 'string',
      data,
      'sssssssssssssssss--------------------------'
    )
    // 通过JSON 定义的函数对象
    if (typeof column.ifshow === 'object') {
      return column.ifshow(data)
    }
    // 通过页面进行配置的字符串函数
    if (typeof column.ifshow === 'string') {
      // 用eval调用没问题
      try {
        console.log('column.ifshow', column.ifshow)
        const expression = `(data) => { return  ${column.ifshow}}`
        console.log('column.expression', expression)
        const evalFunction = eval(expression)
        console.log(evalFunction, 'evalFunction')
        return evalFunction(data)
      } catch (err) {
        console.error(err, 'error')
        return false
      }
    }
  } else {
    return true
  }
}
</script>
<style scoped></style>
