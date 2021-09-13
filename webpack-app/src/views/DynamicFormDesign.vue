<template>
  <div class="container">
    <div class="header">
      <div>Dynamic Form Design</div>
      <div>
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
          />
        </el-form>
      </div>
      <div class="right-component">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="组件配置" name="first">
              <el-row class="component-config-row">
                <el-col :span="8" class="component-config-right">
                  组件id:
                </el-col>
                <el-col :span="16" class="component-config-left">
                  <el-input placeholder="请输入内容"></el-input>
                </el-col>
              </el-row>
              <el-row class="component-config-row">
                <el-col :span="8" class="component-config-right">
                  组件name:
                </el-col>
                <el-col :span="16" class="component-config-left">
                  <el-input placeholder="请输入内容"></el-input>
                </el-col>
              </el-row>
              <el-row class="component-config-row">
                <el-col :span="8" class="component-config-right">
                  组件label:
                </el-col>
                <el-col :span="16" class="component-config-left">
                  <el-input placeholder="请输入内容"></el-input>
                </el-col>
              </el-row>   
              <el-row class="component-config-row">
                <el-col :span="8" class="component-config-right">
                  是否必填:
                </el-col>
                <el-col :span="16" class="component-config-left">
                  <el-switch></el-switch>
                </el-col>
              </el-row>
                <el-row class="component-config-row">
                <el-col :span="8" class="component-config-right">
                  maxlength:
                </el-col>
                <el-col :span="16" class="component-config-left">
                  <el-input placeholder="请输入内容"></el-input>
                </el-col>
              </el-row>     
          </el-tab-pane>
          <el-tab-pane label="组件样式" name="second">组件样式</el-tab-pane>
          <el-tab-pane label="表单配置" name="third">表单配置</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import DragView from "../../../common/components/form/drag-index.vue";
import shortid from 'shortid';
const componentList = ref([])
const activeName = ref('first')
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
      staticData: '测试数据组合',
      name: "主菜单栏目",
      total: null,
      count: null,
      createDate: 1606730360386,
      type: 1,
      requireType: undefined,
      creType: undefined,
      range: [],
      isExpired: false,
      isValid: true,
      type11: 1,
      area: "2",
      unit: "1",
      requireType: 1,
    }
  }
});

componentList.value = [
  {
    id: 0,
    name: "static",
    title: "静态文本",
  },
  {
    id: 1,
    name: "text",
    title: "文本框"
  },
  {
    id: 2,
    name: "textarea",
    title: "多行文本"
  },
  {
    id: 3,
    name: "number",
    title: "数字框"
  },
  {
    id: 4,
    name: "select",
    title: "下拉框",
    dictionary: true
  },
  {
    id: 5,
    name: "radio",
    title: "单选框",
    dictionary: true
  },
  {
    id: 6,
    name: "checkbox",
    title: "多选框",
    dictionary: true
  },
  {
    id: 7,
    name: "date",
    title: "日期选择"
  },
  {
    id: 8,
    name: "daterange",
    title: "日期范围"
  },
  {
    id: 9,
    name: "switch",
    title: "开关"
  },
  {
    id: 10,
    name: "editor",
    title: "富文本"
  },
  {
    id: 11,
    name: "image",
    title: "图片"
  },
  {
    id: 12,
    name: "video",
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
    name: shortid.generate(),
    type: item.name,
    title: item.title
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


  // const rectInfo = this.editor.getBoundingClientRect()
  // if (index) {
  //     const component = deepCopy(componentList[index])
  //     component.style.top = e.clientY - rectInfo.y
  //     component.style.left = e.clientX - rectInfo.x
  //     component.id = generateID()
  //     this.$store.commit('addComponent', { component })
  //     this.$store.commit('recordSnapshot')
  // }
}

const dragEndClick = (item) => {
  console.log(item,'end')
}

const dragClick = (item) => {
  console.log(item, 'drag')
}

const componentClick = (item) => {
  console.log("当前组件为: ", item);
  let column = {
    name: shortid.generate(),
    type: item.name,
    title: item.title
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