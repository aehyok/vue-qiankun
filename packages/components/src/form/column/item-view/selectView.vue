<!--简单文本框-->
<template>
  <el-form-item :label="column.title + '：'" :prop="column.name" :rules="rules">
    <el-select
      v-model="value"
      clearable
      :multiple="column.multiple"
      :placeholder="'请选择' + column.title"
      style="width: 100%"
      @change="changeSelectClick"
      @clear="clearClick"
    >
      <el-option v-for="item in list" :key="item.code" :label="item.name" :value="item.code">
      </el-option>
    </el-select>
  </el-form-item>
</template>
<script setup>
import { computed, ref, watch } from 'vue'
import { useMock } from '../../../../hooks/useMock'
import { getDictionaryList } from '../../../../services/common'
const emit = defineEmits(['update:data'])
const props = defineProps({
  column: {
    type: [Object],
    default: () => {}
  },
  data: {
    type: [Number, String, Array],
    default: undefined
  }
})

const { column } = props
let { dictionary } = props.column

const list = ref([])

// const getList = (code) => {
//   getDictionaryList({
//     code: code
//   }).then(res => {
//     console.log('字典类型数据定义', res)
//     list.value = res.data
//   })
// }

const { getDictionaryListApi } = useMock()

const getList = async (code) => {
  const dataList = await getDictionaryListApi(code)
  list.value = dataList
}

if (typeof dictionary === 'object' && dictionary.constructor === Array) {
  // dictionary = 'type'
  list.value = dictionary
} else if (typeof dictionary === 'string') {
  if (dictionary === '') {
    console.warn('请配置dictionary字典的code编码')
  }

  getList(dictionary)
}
const rules = ref([])
const placeholder = column.placeholder ? column.placeholder : `请输入${column.title}`
rules.value = [
  {
    required: column.required,
    message: placeholder
  }
]

if (column && column.rules) {
  console.log(rules, column.rules, 'column.rules-----------')

  rules.value = [...rules.value, ...column.rules]
}

const value = computed({
  get: function () {
    return props.data
  },
  set: function (val) {
    emit('update:data', val)
  }
})

const changeSelectClick = (item) => {
  if (props.column && props.column.changeFunction) {
    props.column.changeFunction(item)
  }
}

watch(
  () => props.column.dictionary,
  (newValue, oldValue) => {
    if (typeof dictionary === 'object' && dictionary.constructor === Array) {
      list.value = newValue
    }
  },
  {
    immediate: true,
    deep: true
  }
)

const clearClick = () => {
  if (props.column && props.column.changeFunction) {
    props.column.changeFunction(0)
  }
}
</script>
