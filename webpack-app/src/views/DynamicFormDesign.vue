<template>
  <div class="container">
    <div class="header">
      <div>Dynamic Form Design</div>
      <div>
        <!-- <el-button type="primary" size="mini">PC</el-button>
        <el-button type="primary" size="mini">H5</el-button> -->
      </div>
      <div>
        <el-button type="primary" size="mini">预览</el-button>
        <el-button type="primary" size="mini">导入JSON</el-button>
        <el-button type="primary" size="mini">生成JSON</el-button>
      </div>
    </div>
    <div class="body">
      <div class="left-component">
        <div style="font-weight: 600; margin: 15px">表单组件</div>
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
      <div class="center"     
          id="content"
          @dragover="dragOverClick"
          @drop="dropClick"
            >
        <el-form :model="state.formConfig.formData" label-width="120px">
          <drag-view
            v-model:columnList="state.formConfig.formListItem"
            :formData="state.formConfig.formData"
            @setCurrentColumn="setCurrentColumn"
          />
        </el-form>
      </div>
      <div class="right-component">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="组件配置" name="first">
            <config-view v-model:column="currentColumn" ></config-view>
          </el-tab-pane>
          <el-tab-pane label="组件样式" name="second">组件样式</el-tab-pane>
          <el-tab-pane label="表单配置" name="third">表单配置</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import DragView from "../../../common/components/form/drag-index.vue";
import ConfigView from "../../../common/components/form/config-index.vue";
import shortid from 'shortid';
const componentList = ref([])
const activeName = ref('first')
const currentColumn = ref({})
const handleClick = (tab, event) => {
  console.log(tab, event);
}
const state = reactive({
  options: {
    mode: "code",
    mainMenuBar: false
  },
  show: true,
  formConfig: {
    formListItem: [

    ],
    formData: {

    }
  }
});

componentList.value = [
  {
    id: 0,
    type: "static",
    title: "静态文本",
    default: '静态文本'
  },
  {
    id: 1,
    type: "text",
    title: "文本框",
    default: "文本框",
  },
  {
    id: 2,
    type: "textarea",
    title: "多行文本",
    default: "多行文本"
  },
  {
    id: 3,
    type: "number",
    title: "数字框",
    default : 0
  },
  {
    id: 4,
    type: "select",
    title: "下拉框",
    dictionary: []
  },
  {
    id: 5,
    type: "radio",
    title: "单选框",
    dictionary: []
  },
  {
    id: 6,
    type: "checkbox",
    title: "多选框",
    dictionary: []
  },
  {
    id: 7,
    type: "date",
    title: "日期选择"
  },
  {
    id: 8,
    type: "daterange",
    title: "日期范围"
  },
  {
    id: 9,
    type: "switch",
    title: "开关"
  },
  {
    id: 10,
    type: "editor",
    title: "富文本"
  },
  {
    id: 11,
    type: "image",
    title: "图片"
  },
  {
    id: 12,
    type: "video",
    title: "视频"
  },
]

onMounted(() => {
  let content = document.getElementById("content")
  
  content.ondragover = function (e) {
    console.log('dragover')
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }
})

// 组件列表拖拽的事件
const dragStartClick = (e) => {
  console.log(e, 'dragStartClick')
  e.dataTransfer.setData('index', e.target.dataset.index)
}

const dragOverClick = (e) => {
  console.log('dragOverClick')
}

const setCurrentColumn = (column) => {
  currentColumn.value = column
  console.log(column, 'setCurrentColumn')
}
// 调用drop事件需要dropOver的支持
const dropClick = (e) => {
  console.log('drop')
  e.preventDefault()
  e.stopPropagation()

  const index = e.dataTransfer.getData('index')
  console.log(index,componentList.value[index],'dropClick')
  let item = componentList.value[index]
  console.log("当前组件为: ", item);
  let column = {
    id: shortid.generate(),
    name: shortid.generate(),
    type: item.type,
    title: item.title,
    rules: []
  }
  if (["select", "radio", "checkbox"].includes(item.type)) {
    column.dictionary = [
      {
        code: 1,
        name: "图片"
      },
      {
        code: 2,
        name: "视频"
      }
    ]
  }
  console.log(column, '--column--')
  state.formConfig.formListItem.push(column)
}

const dragEndClick = (item) => {
  console.log(item,'end')
}

const dragClick = (item) => {
  console.log(item, 'drag')
}

watch(
  () => currentColumn.value,
  (newVal, oldVal) => {
    if (newVal) {
      console.log(newVal, '修改后的字段项目配置')
      state.formConfig.formListItem.forEach(item => {
        if(item.id === newVal.id) {
          return {
            ...newVal
          }
        }
      })

      console.log(state.formConfig.formListItem,'修改后的字段项目配置')
    }
  }, {
    // immediate: true,
    deep: true,
  }
);

const componentClick = (item) => {
  console.log("当前组件为: ", item);
  let column = {
    name: shortid.generate(),
    type: item.name,
    title: item.title,
    required: true,
  }
  
  if (["select", "radio", "checkbox"].includes(item.type)) {
    column.dictionary = [
      {
        code: 1,
        name: "图片"
      },
      {
        code: 2,
        name: "视频"
      }
    ]
  }
  state.formConfig.formListItem.push(column)
  state.formConfig.formData = {
    ...state.formConfig.formData,
    [column.name]: "默认值"
  }
}
</script>
<style scoped="scss">
.container {
  border: 1px solid #eaecef;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eaecef;
  display: flex;
  align-items: center;
  font-weight: 600;
  justify-content: space-between;
}
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
.right-component {
  min-width: 360px;
  height: calc(90vh- 60px);
  border-left: 1px solid #eaecef;
}
.center {
  width: 100%;
  height: calc(90vh- 60px);
  padding: 10px;
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
.component-config-right{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
}

.component-config-left{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 15px;
}
</style> 