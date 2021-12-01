<template>
    <nut-navbar v-if="isNavBarShow()"
    @on-click-title="titleClick"
    @on-click-right="rightClick"
    @on-click-back="backEvent"
    :left-show="isLeft"
    :desc="desc"
    :title="title"
    :tit-icon="titIcon"
    :icon="icon"></nut-navbar>

    <div :class="isNavBarShow()?styles.content: styles.c_height_other">
      <slot/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { navigateBack } from '@tarojs/taro';
import compatible from '../compatible';
import styles from './index.module.scss';

export default defineComponent({
  name: 'NavBar',
  emits: ['titleClick', 'rightClick', 'backEvent'],
  props: {
    title: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      default: '',
    },
    isLeft: {
      type: Boolean,
      default: true,
    },
    titIcon: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  setup(props: any, { emit }) {
    function rightClick() {
      emit('rightClick');
    }

    function titleClick() {
      emit('titleClick');
    }

    function backEvent() {
      navigateBack();
      emit('backEvent');
    }

    function isNavBarShow() {
      return compatible.isCustomHeader;
    }

    return {
      titleClick,
      rightClick,
      backEvent,

      isNavBarShow,

      styles,
    };
  },
});
</script>
