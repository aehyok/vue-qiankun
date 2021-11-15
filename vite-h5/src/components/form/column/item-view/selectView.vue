<!--简单文本框-->
<template>
  <van-field
    readonly
    clickable
    v-model="text"
    :required="column.required"
    :label="column.title"
    :placeholder="'请选择' + column.title"
    :rules="rules"
    @click="popClick"
    right-icon="arrow"
  />
  <van-popup v-model:show="showPicker" position="bottom">
    <van-picker show-toolbar :columns="list" @confirm="onConfirm" @cancel="onCancel" />
  </van-popup>
</template>
<script setup>
  import { Field as VanField, Popup as VanPopup, Picker as VanPicker } from 'vant';
  import { computed, ref, watch } from 'vue';
  const emit = defineEmits(['update:data']);
  console.log('select-view');
  const props = defineProps({
    column: {
      type: [Object],
      default: () => {},
    },
    data: {
      type: [Number, String, Array],
      default: undefined,
    },
    formData: {
      type: [Object],
      default: () => {},
    },
  });

  const { column } = props;
  let { dictionary } = props.column;

  const list = ref([]);
  const text = ref('');
  const showPicker = ref(false);

  const getList = async (code) => {
    const dataList = []; //await getDictionaryListApi(code);
    list.value = dataList;
  };

  if (typeof dictionary === 'object' && dictionary.constructor === Array) {
    list.value = dictionary;
  } else if (typeof dictionary === 'string') {
    if (dictionary === '') {
      console.warn('请配置dictionary字典的code编码');
    }

    getList(dictionary);
  }
  const rules = ref([]);
  const placeholder = column.placeholder ? column.placeholder : `请输入${column.title}`;
  rules.value = [
    {
      required: column.required,
      message: placeholder,
    },
  ];

  if (column && column.rules) {
    console.log(rules, column.rules, 'column.rules-----------');

    rules.value = [...rules.value, ...column.rules];
  }

  const value = computed({
    get: function () {
      return props.data;
    },
    set: function (val) {
      emit('update:data', val);
    },
  });

  const onConfirm = (item, index) => {
    emit('update:data', item.code);
    text.value = item.text;
    if (props.column && props.column.changeFunction) {
      props.column.changeFunction(item);
    }
    showPicker.value = false;
  };

  const onCancel = () => {
    showPicker.value = false;
  };
  const popClick = () => {
    showPicker.value = true;
    console.log(showPicker);
  };

  watch(
    () => props.column.dictionary,
    (newValue, oldValue) => {
      if (typeof dictionary === 'object' && dictionary.constructor === Array) {
        list.value = newValue;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );

  const clearClick = () => {
    if (props.column && props.column.changeFunction) {
      props.column.changeFunction(0);
    }
  };
</script>
<style lang="scss" scoped></style>
