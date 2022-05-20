<!--简单文本框-->
<template>
  <el-form-item :label="column.title + '：'" :prop="column.name" :rules="rules">
    <wangeditor v-model:data="data" @dochange="editorChange" :canAssignHtml="canAssignHtml" />
    <span style="color: #ccc">&nbsp;&nbsp;{{ currentTextLength }}/{{ maxLength }}个字</span>
  </el-form-item>
</template>
<script setup>
import { computed, ref } from 'vue'
import wangeditor from './wangeditor'
const emit = defineEmits(['update:data'])
const props = defineProps({
  column: {
    type: [Object],
    default: () => {}
  },
  data: {
    type: String,
    default: ''
  }
})
const { column } = props
const canAssignHtml = false
const rules = ref([])
const currentTextLength = ref(Number)
const maxLength = ref(Number)
maxLength.value = column.maxLength ? column.maxLength : 5000
currentTextLength.value = 0
const placeholder = column.placeholder ? column.placeholder : `请输入${column.title}`
rules.value = [
  {
    required: column.required,
    message: placeholder,
    trigger: ['onblur', 'onfocus']
  }
]

if (column && column.rules) {
  console.log(rules, column.rules, 'column.rules-----------')

  rules.value = [...rules.value, ...column.rules]
}

// 富文本有改变的时候
const editorChange = (val, textVal) => {
  //   form.messageText = val
  emit('update:data', val)
  currentTextLength.value = textVal.replace(/&nbsp;/gi, '').length
  if (currentTextLength > maxLength) {
    ElMessage.warning(`文本框字数${maxLength}字以内`)
  }
}
</script>
