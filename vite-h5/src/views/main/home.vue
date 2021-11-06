<template>
  <div class="home-container">
    <banner></banner>

    <module></module>

    <collection-data></collection-data>

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

    <van-button type="primary" @click="jump">测试跳转</van-button>
    <div :class="classes.homered">Home</div>
    <div :class="$style.hometwo">Home</div>
    <div class="homethree">Home</div>
  </div>
</template>
<script lang="ts" setup>
  import {
    Button as VanButton,
    Form as VanForm,
    Swipe as VanSwipe,
    SwipeItem as VanSwipeItem,
  } from 'vant';
  import { useRouter } from 'vue-router';
  import { onMounted, reactive } from 'vue';
  import banner from '../home/banner.vue';
  import module from '../home/module.vue';
  import collectionData from '../home/collection-data.vue';
  import formView from '../../components/form/index.vue';
  const router = useRouter();
  console.log('test');
  const jump = () => {
    console.log('jump--jump');
    router.push('/test');
  };

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

  const theme = {
    height: '200px',
    border: '1px solid green',
  };

  onMounted(() => {
    console.log('11-22-33');
    console.timeEnd('11');
  });
</script>

<style module="classes">
  .red {
    color: red;
  }
  .homered {
    height: 200px;
    border: 1px solid red;
  }
</style>

<style module>
  .hometwo {
    height: 200px;
    border: 1px solid blue;
  }
</style>
<style lang="scss" scoped>
  .homethree {
    height: v-bind('theme.height');
    border: v-bind('theme.border');
  }

  .home-container {
    background-color: #f5f7fa;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    // padding: 0 4vw;
  }
</style>
