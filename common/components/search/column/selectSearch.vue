<template>
 {{ column.title }}：
    <el-select
          v-model="column.defaultSelected"
          :clearable="column.showClear ? true : false"
          class="select-search"
          :placeholder="'请选择' + column.placeholder"
          @change="changeSelectClick"
          @clear="clearClick"
        >
          <el-option
            v-for="item in column.dictionary"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          >
          </el-option>
    </el-select>
</template>
<script setup>
import { computed } from 'vue'
const emit = defineEmits(["update:data"])
const props = defineProps({
  column: {
    type: [Object],
    default: () => {}
  },
  data: {
    type: String,
    default: ""
  }
})

const value = computed({
  get: function () {
    return props.data
  },
  set: function (val) {
    emit('update:data', val)
  }
})


const changeSelectClick = (item) => {
    console.log('item--item', item)
};

const clearClick = () => {};
</script>
<style lang="scss" scoped>
.select-search {
  width: 220px;
  margin-right: 12px;
}
</style>