<template>
  <div style="position: relative; margin-bottom: 42px">
    <template v-for="item: any in columnList" :key="index + 'formView'">
      <component-view
        :columnSpan="columnSpan"
        :column="item"
        :formData="formData"
        v-if="ifshow(item, formData)"
      />
    </template>
  </div>
</template>
<script lang="ts" setup>
  import ComponentView from './column/component-view.vue';
  const props = defineProps({
    columnList: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => {},
    },
    columnSpan: {
      type: Number,
      default: 24,
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
