<!--日期格式类型-->
<template>
  <van-cell :title="column.title" :value="value" @click="show = true" />
  <van-calendar v-model:show="show" @confirm="onConfirm" />
</template>
<script setup>
  import { computed, reactive, ref } from 'vue';
  import { Calendar as VanCalendar, Cell as VanCell } from 'vant';
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
    formData: {
      type: [Object],
      default: () => {},
    },
  });
  const show = ref(false);
  const { column, data } = props;
  const state = reactive({
    data: data,
  });
  const rules = [
    {
      required: column.required,
      message: `请输入${column.title}`,
    },
  ];

  const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;

  const onConfirm = (val) => {
    console.log('date');
    show.value = false;
    emit('update:data', val);
  };
  const value = computed({
    get: function () {
      return props.data;
    },
    set: function (val) {
      emit('update:data', val);
    },
  });
</script>
