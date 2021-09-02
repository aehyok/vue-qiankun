<template>
  <div style="width: 1000px; height: 800px; border: 1px solid blue">
    <VueDragResize
      :isActive="true"
      :w="200"
      :h="200"
      v-on:resizing="resize"
      v-on:dragging="resize"
    >
      <h3>Hello World!</h3>
      <p>{{ top }} х {{ left }}</p>
      <p>{{ width }} х {{ height }}</p>
    </VueDragResize>
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
      left: 0
    });

    const resize = (newRect) => {
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