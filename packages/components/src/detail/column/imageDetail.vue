<template>
  <el-form-item :label="column.label + '：'">
    <template v-for="(item, index) in data" :key="index">
      <el-image
        :src="item.url"
        class="img-class"
        @click="preview(item.url)"
      ></el-image>
    </template>
  </el-form-item>
</template>
<script setup>
const props = defineProps({
  column: {
    type: Object,
    default: () => {

    }
  },
  data: {
    type: [Array],
    default: () => []
  }
})

console.log(props.data, '--image--')
</script>
<style lang="scss" scoped>
.img-class {
  width: 150px;
  height: 150px;
  margin: 0 10px 10px 0;
  cursor: pointer;
  border-radius: 3px;
}
</style>