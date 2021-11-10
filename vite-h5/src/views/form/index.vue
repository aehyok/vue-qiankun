<template>
  <van-form ref="form" :model="state.formConfig.formData">
    <formView
      :columnList="state.formConfig.formListItem"
      :formData="state.formConfig.formData"
      v-model:columnSpan="state.formConfig.cols"
    />
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit"> 提交 </van-button>
    </div>
  </van-form>
</template>
<script lang="ts" setup>
  import { Button as VanButton, Form as VanForm } from 'vant';
  import { reactive } from 'vue';
  import formView from '/@/components/form/index.vue';

  const state = reactive({
    formConfig: {
      cols: 24,
      formListItem: [
        {
          name: 'name1',
          type: 'text',
          title: '栏目标题',
          required: true, // 必填
        },
        {
          name: 'name',
          type: 'text',
          title: '栏1目标题',
          required: true, // 必填
        },
      ],
      formData: {
        name: '主菜单栏目',
        name1: '222222',
        count: null,
        createDate: 1606730360386,
        type: 2,
        requireType: undefined,
        creType: '',
        range: [],
        isExpired: false,
        isValid: true,
      },
    },
  });
</script>
