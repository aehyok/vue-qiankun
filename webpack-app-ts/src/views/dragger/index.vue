<template>
  <el-row :gutter="20">
    <el-col :span="5">
      <div class="y-component">
        <div style="font-weight: 600; margin: 15px">组件列表</div>
        <el-row>
          <template v-for="(item, index) in componentList">
            <el-col
              :span="12"
              @dragstart="dragStartClick"
              :data-index="index"
              class="item-component"
              draggable="true"
            >
              <i class="el-icon-apple"></i>
              {{ item.title }}
            </el-col>
          </template>
        </el-row>
      </div>
    </el-col>
    <el-col :span="14">
      <div
        style="width:375px ; height: 667px; border: 1px solid blue; position: relative;"
        id="content"
        @dragover="dragOverClick"
        @drop="dropClick"
      >
        <grid-line />
        <template v-for="(item, index) in state.list">
          <vue-drag-resize
            :isActive="true"
            :w="item.width"
            :h="item.height"
            :x="item.x"
            :y="item.y"
            :minh="state.minh"
            :minw="state.minw"
            :index="state.index"
            @resizing="resizeClick($event, index)"
            @dragging="draggleClick($event, index)"
            @clicked="clickClick($event, index)"
          >
            <component :is="item.view" :column="item"  />
          </vue-drag-resize>
        </template>
      </div>
    </el-col>
    <el-col :span="5">
      组件属性配置
      <component :is="configView" :config="currentComponent" />
    </el-col>
  </el-row>
</template>
<script>
import VueDragResize from "vue-drag-resize";
import GridLine from './grid-line.vue'
import DragImage from './list-item/image.vue'
import DragButton from './list-item/button.vue'
import DragDate from './list-item/date.vue'
import DragText from './list-item/text.vue'

import ConfigImage from './config-item/image.vue'
import ConfigButton from './config-item/button.vue'
import ConfigDate from './config-item/date.vue'
import ConfigText from './config-item/text.vue'

import { defineComponent, onMounted, reactive, ref } from "vue";
export default defineComponent({
  components: {
    VueDragResize,
    GridLine,
    DragImage,
    DragButton,
    DragDate,
    DragText,
    ConfigImage,
    ConfigButton,
    ConfigDate,
    ConfigText,
  }
})

</script>
<script setup>
import shortid from 'shortid'
const componentList = ref([])
const configView = ref()
const currentComponent = ref()
componentList.value = componentList.value = [
  {
    id: shortid.generate(),
    type: "image",
    title: "图片",
    default: '图片',
    view: 'DragImage',
    config: 'ConfigImage',
  },
  {
    id: shortid.generate(),
    type: "date",
    title: "日期",
    default: "日期",
    view: 'DragDate',
    config: 'ConfigDate',
  },
  {
    id: shortid.generate(),
    type: "text",
    title: "文本",
    default: "文本",
    view: 'DragText',
    config: 'ConfigText',
  },
  {
    id: shortid.generate(),
    type: "button",
    title: "按钮",
    default: "按钮",
    view: 'DragButton',
    config: 'ConfigButton',
  }
]
// const componentList = [0: "checkboxView",
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
  minh: 1,   // 最小高度
  minw: 1,  // 最小宽度
  index: 1, // 设置默认层级
  list: [
    {
      id: shortid.generate(),
      index: 10000,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      name: "图片",
      view: 'DragImage',
      config: 'ConfigImage',
    },
    {
      id: shortid.generate(),
      index: 100001,
      width: 100,
      height: 100,
      x: 200,
      y: 300,
      name: "日期",
      view: 'DragDate',
      config: 'ConfigDate',
    },
    {
      id: shortid.generate(),
      index: 10002,
      width: 100,
      height: 100,
      x: 200,
      y: 100,
      name: "按钮",
      view: 'DragButton',
      config: 'ConfigButton',
    },
    {
      id: shortid.generate(),
      index: 10003,
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      name: "文字",
      view: 'DragText',
      config: 'ConfigText',
    },
  ]
},
);


onMounted(() => {
  let content = document.getElementById("content")

  content.ondragover = function (e) {
    console.log('dragover')
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }
})

const clickClick = (newRect, index) => {
  console.log('clickClick', newRect, index)
  currentComponent.value = state.list[index]
}


// 组件列表拖拽的事件
const dragStartClick = (e) => {
  console.log(e, 'dragStartClick')
  e.dataTransfer.setData('index', e.target.dataset.index)
}

const dragOverClick = (e) => {
  console.log('dragOverClick')
}


// 调用drop事件需要dropOver的支持
const dropClick = (e) => {
  console.log('drop', e)
  e.preventDefault()
  e.stopPropagation()

  const index = e.dataTransfer.getData('index')
  const componentItem = componentList.value[index]
  console.log(index, componentList.value[index], 'dropClick')
  let item = {
    id: shortid.generate(),
    type: componentItem.type,
    title: componentItem.title,
    width: 100,
    height: 100,
    view: componentItem.view,
    config: componentItem.config,
    x: e.offsetX,
    y: e.offsetY
  }

  state.list.push(item)
}

const resizeClick = (newRect, index) => {

  console.log(newRect, index, 'index-resizeClick')
  // state.list[index].width = newRect.width;
  // state.list[index].height = newRect.height;
  // state.list[index].x = newRect.x;
  // state.list[index].y = newRect.y;
};

const draggleClick = (newRect, index) => {
  if (newRect.top <= 0) {
    console.log('...............................')
    state.list[index].y = 0
  }
  configView.value = state.list[index].config
  console.log(newRect, index, 'index-draggleClick')
}
</script>
<style lang="scss" scoped>
.body {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.left-component {
  min-width: 200px;
  max-width: 300px;
  height: calc(90vh - 60px);
  border-right: 1px solid #eaecef;
  padding: 5px;
}

.item-component {
  border: 1px solid #eaecef;
  padding: 25px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item-component:hover {
  background: #2e73ff;
  color: white;
  cursor: pointer;
}

.component-config-row {
  display: flex;
  padding: 5px;
}

.component-config-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
}

.component-config-y {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 15px;
}
</style>