<!--radio 单选框-->
<template>
  <el-form-item :label="column.title + '：'" :prop="column.name" :rules="rules">
    <el-radio-group v-model="value" @change="radioChange">
      <el-radio v-for="item in state.list" :label="item.id" :key="item.id">
        {{ item.text }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>
<script setup>
import { computed, reactive } from 'vue'
const emit = defineEmits(["update:data"])
const props = defineProps({
  column: {
    type: [Object],
    default: () => { },
  },
  formData: {
    type: [Object],
    default: () => { },
  },
  data: {
    type: Number,
    default: undefined,
  },
})
const { column } = props
let { dictionary } = props.column
const state = reactive({
  list: []
})

const getList = (type) => {
  // getContentTypeList(type).then(res => {
  //   state.list = res.data
  // })
}

if (typeof dictionary === 'object' && dictionary.constructor === Array) {
  state.list = dictionary
} else if (typeof dictionary === 'string') {
  getList(dictionary)
}

const rules = [
  {
    // 加上双？？，防止出现选中后提示请选择"this.column.title"
    required: column.required ?? false,
    message: `请选择${column.title}`,
    trigger: 'change',
  },
]

const value = computed({
  get: function () {
    return props.data
  },
  set: function (val) {
    emit('update:data', val)
  },
})

// radio change事件去切换控制其他组件，或者其他几个组件（先考虑控制一个）
// 要通过一个字段控制，如果是这个字段，则可以进行控制切换状态
const radioChange = (e) => {
  console.log(e, column, 'this.radioChange')
  // emit('update:data', val)
}
</script>
