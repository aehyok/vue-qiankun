<template>
  <el-row :gutter="20">
    <el-col :span="6">
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
    <el-col :span="8">
      <div
        :style="{
          width: '375px',
          height: `${state.listViewConfig.height}px`,
          border: '1px solid blue',
          position: 'relative'
        }"
        id="content"
        @dragover="dragOverClick"
        @drop="dropClick"
      >
        <grid-line />
        <template v-for="(item, index) in state.list">
          <vue-drag-resize
            :isActive="item.isActive"
            :w="item.width"
            :h="item.height"
            :x="item.x"
            :y="item.y"
            :minh="state.minh"
            :minw="state.minw"
            :index="state.index"
            @resizing="resizeClick($event, index)"
            @dragging="draggleClick($event, index)"
            @clicked.stop="clickClick($event, index)"
          >
            <component :is="item.view" :column="item" />
          </vue-drag-resize>
        </template>
      </div>
    </el-col>
    <el-col :span="10">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件配置" name="first">
          <component :is="configView" :config="currentComponent" />
        </el-tab-pane>
        <el-tab-pane label="组件样式" name="second">组件样式</el-tab-pane>
        <el-tab-pane label="列表项配置" name="third">
          <el-row class="component-config-row">
            <el-col :span="8" class="component-config-right">height:</el-col>
            <el-col :span="16" class="component-config-left"> 
              <el-input-number v-model="state.listViewConfig.height" :controls="state.controls" placeholder="请输入高度" /> 
             </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<script>
import VueDragResize from "vue-drag-resize";
import GridLine from "./components/grid-line.vue";
// import MarkLine from './components/mark-line.vue'
import DragImage from "./list-item/image.vue";
import DragButton from "./list-item/button.vue";
import DragDate from "./list-item/date.vue";
import DragText from "./list-item/text.vue";

import ConfigImage from "./config-item/image.vue";
import ConfigButton from "./config-item/button.vue";
import ConfigDate from "./config-item/date.vue";
import ConfigText from "./config-item/text.vue";

import { defineComponent, onMounted, reactive, ref } from "vue";
export default defineComponent({
  components: {
    VueDragResize,
    GridLine,
    // MarkLine,
    DragImage,
    DragButton,
    DragDate,
    DragText,
    ConfigImage,
    ConfigButton,
    ConfigDate,
    ConfigText,
  },
});
</script>
<script setup>
import shortid from "shortid";
const componentList = ref([]);
const configView = ref();
const currentComponent = ref();
const activeName = ref("first");
const handleClick = (tab, event) => {
  console.log(tab, event);
};
componentList.value = componentList.value = [
  {
    id: shortid.generate(),
    type: "image",
    title: "图片",
    default: "图片",
    view: "DragImage",
    config: "ConfigImage",
    minh: 9,
    minw: 55,
  },
  {
    id: shortid.generate(),
    type: "date",
    title: "日期",
    default: new Date(),
    view: "DragDate",
    config: "ConfigDate",
    minh: 9,
    minw: 55,
  },
  {
    id: shortid.generate(),
    type: "text",
    title: "文本",
    default: "文本",
    view: "DragText",
    config: "ConfigText",
    minh: 1,
    minw: 1,
  },
  {
    id: shortid.generate(),
    type: "button",
    title: "按钮",
    default: "按钮",
    view: "DragButton",
    config: "ConfigButton",
    minh: 9,
    minw: 55,
  },
];

console.log(window.componentListView, "window.view");
const state = reactive({
  minh: 1, // 最小高度
  minw: 1, // 最小宽度
  index: 1, // 设置默认层级
  controls: false,
  listViewConfig: {
    height: 50
  },
  list: [
      {
        id: 'JniON6qs92',
        index: 10000,
        width: 65,
        height: 53,
        isActive: false,
        x: 7,
        y: 8,
        name: 'url',
        title: '图片',
        view: 'DragImage',
        config: 'ConfigImage',
      },
      {
        id: 'FOEZHi01H-',
        index: 100001,
        width: 183,
        height: 23,
        isActive: false,
        x: 81,
        y: 42,
        title: '日期',
        name: 'createdAt',
        view: 'DragDate',
        config: 'ConfigDate',
      },
      {
        id: '6Jp5lDYfIM',
        index: 10002,
        width: 89,
        height: 25,
        isActive: true,
        x: 328,
        y: 42,
        name: 'createdByDeptName',
        title: '按钮',
        view: 'DragButton',
        config: 'ConfigButton',
      },
      {
        id: 'gWzhVigTOI',
        index: 10003,
        width: 82,
        height: 23,
        isActive: false,
        x: 86,
        y: 11,
        name: 'messageName',
        title: '标题',
        view: 'DragText',
        config: 'ConfigText',
      },
    ],
});

onMounted(() => {
  let content = document.getElementById("content");

  content.ondragover = function (e) {
    console.log("dragover");
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };
});

const clickClick = (newRect, index) => {
  console.log("clickClick", newRect, index);
  currentComponent.value = state.list[index];
  configView.value = state.list[index].config;
  state.list.forEach((item) => {
    item.isActive = false;
  });
  currentComponent.value.isActive = true;
};

// 组件列表拖拽的事件
const dragStartClick = (e) => {
  console.log(e, "dragStartClick");
  e.dataTransfer.setData("index", e.target.dataset.index);
};

const dragOverClick = (e) => {
  console.log("dragOverClick");
};

// 调用drop事件需要dropOver的支持
const dropClick = (e) => {
  console.log("drop", e);
  e.preventDefault();
  e.stopPropagation();

  const index = e.dataTransfer.getData("index");
  const componentItem = componentList.value[index];
  console.log(index, componentList.value[index], "dropClick");
  let item = {
    id: shortid.generate(),
    type: componentItem.type,
    title: componentItem.title,
    width: 100,
    height: 100,
    view: componentItem.view,
    config: componentItem.config,
    x: e.offsetX,
    y: e.offsetY,
  };
  state.list.push(item);
};

const resizeClick = (newRect, index) => {
  let item = state.list[index];
  console.log(newRect, index, "index-resizeClick");
  item.width = newRect.width;
  item.height = newRect.height;
  item.x = newRect.left;
  item.y = newRect.top;
};

const draggleClick = (newRect, index) => {
  if (newRect.top <= 0) {
    console.log("...............................");
    state.list[index].y = 0;
  }
  state.list.forEach((item) => {
    item.isActive = false;
  });
  currentComponent.value.isActive = true;
  console.log(state.list, "sssssssssssssssss");
  configView.value = state.list[index].config;
  let item = state.list[index];
  console.log(newRect, index, "index-draggleClick");
  item.width = newRect.width;
  item.height = newRect.height;
  item.x = newRect.left;
  item.y = newRect.top;
};
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
