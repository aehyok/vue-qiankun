<!--checkbox 多选框-->
<template>
  <el-form-item :label="column.title + '：'" :prop="column.columnName">
    <el-checkbox-group v-model="value">
      <el-checkbox v-for="item in state.list" :label="item.id" :key="item.id">{{
        item.text
      }}</el-checkbox>
    </el-checkbox-group>
  </el-form-item>
</template>
<script setup>
import { computed, reactive, toRefs } from 'vue'
const emit = defineEmits(["update:data"])
const props = defineProps({
  column: {
    type: [Object],
    default: () => { },
  },
  data: {
    type: Array,
    default: () => [],
  },
})

const state = reactive({
  list: []
})
const getList = (type) => {
  // getContentTypeList(type).then( res => {
  //   state.list = res.data
  // })
}
let { dictionary } = props.column
if (typeof dictionary === 'object' && dictionary.constructor === Array) {
  state.list = dictionary
  console.log(state.list, 'dictionary-----checkbox')
} else if (typeof dictionary === 'string') {
  getList(dictionary)
}

const value = computed({
  get: function () {
    return props.data
  },
  set: function (val) {
    emit('update:data', val)
  }
})
</script>
