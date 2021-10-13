<template>
  <div style="width:90vw ; height: 100vh; border: 1px solid blue">
      <template v-for="(item,index) in list">
    <VueDragResize
      :isActive="true"
      :w="item.width"
      :h="item.height"
      :t="item.top"
      :l="item.left"
      :index="index"
      v-on:resizing="resize"
      v-on:dragging="resize"
    >
      <h3>{{item.name}}</h3>
      <p>{{ item.top }} х {{ item.left }}</p>
      <p>{{ item.width }} х {{ item.height }}</p>
    </VueDragResize>
    </template>
  </div>
</template>
<script>
import VueDragResize from "vue-drag-resize";

import { reactive, toRefs } from "vue";
export default {
  components: {
    VueDragResize
  },
  setup() {
//     const componentList = [0: "checkboxView",
// 1: "citySelectView"
// 2: "dateView"
// 3: "daterangeView"
// 4: "editorView"
// 5: "imageView"
// 6: "numberView"
// 7: "radioView"
// 8: "selectView"
// 9: "staticView"
// 10: "switchView"
// 11: "textView"
// 12: "textareaView"
// 13: "videoView"
// 14: "numberSelectView"
// 15: "textSelectView"]

    console.log(window.componentListView, 'window.view')
    const state = reactive({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      list: [
        {
          width: 200,
          height:200,
          top:0,
          left: 0,
          name: "柱状图"
        },
        {
          width: 300,
          height:300,
          top:0,
          left: 0,
          name: "折线图"
        },
        {
          width: 300,
          height:300,
          top:0,
          left: 0,
          name: "饼图"
        },
        {
          width: 300,
          height:300,
          top:0,
          left: 0,
          name: "柱状和折线"
        },
      ]
    },
    );

    const resize = (newRect) => {
      console.log(newRect, 'index-newRect')
      state.width = newRect.width;
      state.height = newRect.height;
      state.top = newRect.top;
      state.left = newRect.left;
    };
    return {
      ...toRefs(state),
      resize
    };
  }
};
</script>