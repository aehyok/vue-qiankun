<!--简单文本框-->
<template>
  <van-field
    v-model="value"
    :required="column.required"
    :label="column.title"
    :rules="[{ required: true, message: '请填写用户名' }]"
    :placeholder="'请输入' + column.title"
  />
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
