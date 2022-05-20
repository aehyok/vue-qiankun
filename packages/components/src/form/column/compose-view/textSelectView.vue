<!--简单文本框-->
<template>
  <el-form-item
    :label="column.title + '：'"
    :prop="column.text.name"
    :rules="rules"
    style="display: flex; flex-direction: row"
  >
    <el-input v-model="leftValue" :name="column.text.name" style="width: 70%"></el-input>
    <el-select v-model="rightValue" placeholder="请选择" style="width: 30%">
      <el-option
        v-for="item in column.select.dictionary"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
<script setup>
import { computed, ref } from 'vue'
const emit = defineEmits(['update:leftValue', 'update:rightValue'])
const props = defineProps({
  column: {
    type: [Object],
    default: () => {}
  },
  leftValue: {
    type: String,
    default: ''
  },
  rightValue: {
    type: String,
    default: ''
  }
})

console.log('text-select')
const { column } = props
const rules = ref([])
rules.value = [
  {
    required: column.required,
    message: `请输入${column.title}`,
    trigger: ['blur', 'change']
  }
]

if (column && column.rules) {
  rules.value = [...rules.value, ...column.rules]
}

console.log(rules, '------rules------')

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
