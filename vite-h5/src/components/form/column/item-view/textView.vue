<!--简单文本框-->
<template>
  <van-field
    v-model="value"
    :label="column.title"
    :rules="[{ required: column.required, message: '请输入' + column.title }]"
    input-align="right"
    error-message-align="right"
    :placeholder="'请输入' + column.title"
  >
    <template #label
      ><span :class="column.required ? 'style-font-color' : 'style-padding-labelleft'">
        {{ column.required ? '*' : '' }}</span
      >{{ column.title }}</template
    >
  </van-field>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Field as VanField } from 'vant';
  import { RuleModel } from '../types/models.d';
  const emit = defineEmits(['update:data']);
  const props = defineProps({
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: String,
      default: '',
    },
  });
  const { column } = props;

  const rules = ref<RuleModel[]>();

  const placeholder = column.placeholder ? column.placeholder : `请输入${column.title}`;
  rules.value = [
    {
      required: column.required,
      message: placeholder,
      trigger: ['blur', 'change'],
    },
  ];

  if (column && column.rules) {
    console.log(rules, column.rules, 'column.rules-----------');

    rules.value = [...rules.value, ...column.rules];
  }

  const value: any = computed({
    get: function () {
      return props.data;
    },
    set: function (val) {
      emit('update:data', val);
    },
  });
</script>
<style lang="scss" scoped>
  .style-padding-labelleft {
    padding-left: 10px;
  }

  .style-font-color {
    color: red;
    padding-right: 5px;
  }

  :deep(.van-cell::after) {
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: var(--van-padding-md);
    bottom: 0;
    left: var(--van-padding-md);
    border-bottom: 1 px solid black;
    transform: scaleY(0.5);
  }
</style>
