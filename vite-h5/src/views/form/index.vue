<template>
  <div style="position: relative; margin-bottom: 42px">
    <van-form ref="form" :model="state.formConfig.formData">
      <van-cell-group title="基础信息">
        <formView
          :columnList="state.formConfig.formListItem"
          :formData="state.formConfig.formData"
        />
        <div style="margin: 16px">
          <van-button round block type="primary" native-type="submit"> 提交 </van-button>
        </div>
      </van-cell-group>
    </van-form>
  </div>
</template>
<script lang="ts" setup>
  import { Button as VanButton, Form as VanForm, CellGroup as VanCellGroup } from 'vant';
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
          name: 'name21',
          type: 'text',
          title: '栏目类型',
          required: false, // 必填
        },
        {
          name: 'type',
          type: 'select',
          title: '类型',
          required: false, // 必填
          dictionary: [
            { code: 1, text: '杭州' },
            { code: 2, text: '宁波' },
            { code: 3, text: '温州' },
            { code: 4, text: '嘉兴' },
            { code: 5, text: '湖州' },
          ],
        },
        {
          name: 'type1',
          type: 'select',
          title: '级别',
          required: true, // 必填
          dictionary: [
            { code: 1, text: '杭1州' },
            { code: 2, text: '宁2波' },
            { code: 3, text: '温3州' },
            { code: 4, text: '嘉4兴' },
            { code: 5, text: '湖5州' },
          ],
        },
      ],
      formData: {
        name: '',
        name1: '',
        count: null,
        createDate: 1606730360386,
        type: 2,
        type1: 2,
        requireType: undefined,
        creType: '',
        range: [],
        isExpired: false,
        isValid: true,
      },
    },
  });
</script>
