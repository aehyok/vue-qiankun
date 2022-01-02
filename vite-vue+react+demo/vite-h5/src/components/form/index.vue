<template>
  <template v-for="(item: any, index: number) in columnList">
    <component-view
      :column="item"
      :formData="formData"
      :key="index"
      v-if="ifshow(item, formData)"
    />
  </template>
</template>
<script lang="ts" setup>
  import ComponentView from './column/component-view.vue';
  defineProps({
    columnList: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => {},
    },
  });

  const ifshow = (column: any, formData: any) => {
    if (column && column.ifshow) {
      return column.ifshow(formData);
    } else {
      return true;
    }
  };
</script>
<style scoped></style>
