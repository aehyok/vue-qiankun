<template>
  <el-form-item :label="column.title + '：'" :prop="column.name" :rules="rules">
    <el-cascader
      :options="regionData"
      v-model="selectedOptions"
      @change="handleChange"
      :clearable="true"
      style="width: 100%"
      :placeholder="'请选择省/市/区县'"
    >
    </el-cascader>
  </el-form-item>
</template>

<script setup>
import { watch, ref } from 'vue'
import cityJson from '../resource/china.js'
const emit = defineEmits(['update:data'])
const props = defineProps({
  column: {
    type: [Object],
    default: () => {}
  },
  data: {
    type: Object,
    default: () => {}
  }
})
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
  console.log(rules, column.rules, 'column.rules-----------')

  rules.value = [...rules.value, ...column.rules]
}
// emits: ['dataObj'], // 先申明
// const state = reactive({
//   regionData: [],
//   selectedOptions: [],
// })

const regionData = ref([])

const selectedOptions = ref([])
console.log(cityJson['100000'], 'city-cityJson')

const provinceData = cityJson['100000']
// 省
for (const provinceCode in provinceData) {
  // provinceCode拿到省份编码
  regionData.value.push({
    value: provinceCode,
    label: provinceData[provinceCode]
  })
}
console.log(regionData.value, 'state-regionData')
// 市
for (const provinceObj of regionData.value) {
  const city = []
  for (const cityCode in cityJson[provinceObj.value]) {
    city.push({
      value: cityCode,
      label: cityJson[provinceObj.value][cityCode]
    })
    if (city.length) {
      provinceObj.children = city
    }
  }
  // 区县
  if (provinceObj.children) {
    for (const cityData of provinceObj.children) {
      // cityData拿到每个市
      const district = []
      for (const districtCode in cityJson[cityData.value]) {
        district.push({
          value: districtCode,
          label: cityJson[cityData.value][districtCode]
        })
      }
      if (district.length) {
        cityData.children = district
      }
    }
  }
}

console.log(regionData.value, 'result-result-state-regionData')
// })
watch(
  () => props.data,
  (newVal) => {
    let array = newVal && Object.keys(newVal).length > 3 ? props.data.mapCode.split(',') : []
    selectedOptions.value = array.map(String)
    console.log(props.data, array, 'watch--')
  },
  {
    immediate: true,
    deep: true
  }
)

const handleChange = (val) => {
  const obj = {}
  let pro = {}
  let city = {}
  let district = {}
  if (!val) {
    emit('update:data', { province: '' })
    return false
  }
  val.forEach((item, index) => {
    if (index === 0) {
      pro = regionData.value.find((rItem) => rItem.value === item)
      obj.province = pro.label
    }
    if (index === 1) {
      city = pro.children.find((rItem) => rItem.value === item)
      obj.city = city.label
    }
    if (index === 2) {
      district = city.children.find((rItem) => rItem.value === item)
      obj.district = district.label
    }
  })

  obj.mapCode = val.toString()
  emit('update:data', obj)
}
</script>
<style lang="scss" scoped></style>
