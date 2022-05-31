<template>
  <!-- 输入框 -->
  <el-input :placeholder="column.placeholder" v-model="value" class="input-search"></el-input>
</template>
<script setup>
import { computed } from 'vue'

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

const value = computed({
  get() {
    return props.data
  },
  set(val) {
    emit('update:data', val)
  }
})
</script>
<style lang="scss" scoped>
.input-search {
  width: 220px;
  margin-left: 12px;
}
</style>
