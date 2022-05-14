<!--简单文本框-->
<template>
  <el-form-item
    :label="column.title + '：'"
    :prop="column.name"
    :rules="rules"
    style="display: flex; flex-direction: row"
  >
    <el-input
      type="number"
      v-model="leftValue"
      :name="column.text.name"
      style="width: 70%"
    ></el-input>
    <el-select v-model="rightValue" placeholder="请选择" style="width: 30%">
      <el-option
        v-for="item in column.select.dictionary"
        :key="item.id"
        :label="item.text"
        :value="item.id"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
<script setup>
import { computed, toRefs, reactive } from 'vue'
const emit = defineEmits(["update:leftValue", "update:rightValue"])
const props = defineProps({
  column: {
    type: [Object],
    default: () => { },
  },
  leftValue: {
    type: String,
    default: '',
  },
  rightValue: {
    type: String,
    default: '',
  },
})

console.log('text-select')
const { column } = props

const rules = [
  {
    required: column.required,
    message: `请输入${column.title}`,
    trigger: ['blur', 'change'],
  }]

const leftValue = computed({
  get: function () {
    return props.leftValue
  },
  set: function (val) {
    emit('update:leftValue', val)
  }
})

const rightValue = computed({
  get: function () {
    return props.rightValue
  },
  set: function (val) {
    emit('update:rightValue', val)
  }
})
</script>
  