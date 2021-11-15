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
    showPicker: false,
    // columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
    columns: [
      { code: 1, text: '杭州' },
      { code: 2, text: '宁波' },
      { code: 3, text: '温州' },
      { code: 4, text: '嘉兴' },
      { code: 5, text: '湖州' },
    ],
    value: '',
    valueCode: '',
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
          name: 'type',
          type: 'select',
          title: '类型',
          required: true, // 必填
          dictionary: [
            { code: 1, text: '杭州' },
            { code: 2, text: '宁波' },
            { code: 3, text: '温州' },
            { code: 4, text: '嘉兴' },
            { code: 5, text: '湖州' },
          ],
        },
      ],
      formData: {
        name: '',
        name1: '',
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
