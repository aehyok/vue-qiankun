<template>
  <div class="container">
    <div class="header">
      <div>Dynamic Form Design</div>
      <div>
        <!-- <el-button type="primary" size="small">PC</el-button>
        <el-button type="primary" size="small">H5</el-button>-->
      </div>
      <div>
        <el-button type="primary" size="small">预览</el-button>
        <el-button type="primary" size="small">导入JSON</el-button>
        <el-button type="primary" size="small" @click="createJsonClick">生成json</el-button>
        <el-button type="primary" size="small" @click="createVueClick">生成vue代码</el-button>
        <el-button type="primary" size="small" @click="customerClick">自定义组件代码</el-button>
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
      <div class="center" id="content" @dragover="dragOverClick" @drop="dropClick">
        <el-form :model="state.formConfig.formData" label-width="120px">
          <sl-drag
            v-model:columnList="state.formConfig.formListItem"
            :formData="state.formConfig.formData"
            @setCurrentColumn="setCurrentColumn"
          />
        </el-form>
      </div>
      <div class="right-component">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="组件配置" name="first">
            <sl-config v-model:column="currentColumn"></sl-config>
          </el-tab-pane>
          <el-tab-pane label="组件样式" name="second">组件样式</el-tab-pane>
          <el-tab-pane label="表单配置" name="third">表单配置</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="JSON预览" width="80%" :before-close="handleClose">
    <code-editor :mode="'json'" :readonly="true" v-model="json"></code-editor>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="copyJsonFileClick">复制JSON</el-button>
        <el-button type="primary" @click="saveJsonFileClick">保存JSON文件</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="vueDialogVisible" title="vue文件预览" width="80%" :before-close="handleClose">
    <code-editor :mode="'html'" :readonly="false" v-model="vueString"></code-editor>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="vueDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="copyVueFileClick">复制vue代码</el-button>
        <el-button type="primary" @click="saveVueFileClick">保存VUE文件</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="customerVisible"
    title="自定义组件代码"
    width="80%"
    :before-close="handleClose"
  >
    <code-editor :mode="'javascript'" :readonly="false" v-model="customerCode"></code-editor>

    <template #footer>
      <span class="dialog-footer">
        <div v-if="isError" style="color: red; font-size: 12px; margin-top: 5px">
          请检查语法错误：{{ error }}
        </div>
        <el-button @click="customerVisible = false">关闭</el-button>
        <el-button type="primary" @click="checkCodeClick">校验代码</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import CodeEditor from '@/components/code-editor/index'
import { useStore } from 'vuex'
import Clipboard from 'clipboard'
import { ElMessage, ElMessageBox } from 'element-plus'
import { SlDrag, SlConfig } from '@app/components'
import { generateCode } from '@/utils/code-generator.js'
import shortid from 'shortid'
import { copyToClipboard } from '@/utils/utils'
import { computed } from 'vue'
import { saveAs } from 'file-saver'
const store = useStore()
const componentList = ref([])
const activeName = ref('first')
const currentColumn = ref({})
const handleClick = (tab, event) => {
  console.log(tab, event)
}
const state = reactive({
  options: {
    mode: 'code',
    mainMenuBar: false
  },
  show: true,
  formConfig: {
    formListItem: [],
    formData: {}
  },
  jsonCode: '',
  vueCode: ''
})

const dialogVisible = ref(false)
const vueDialogVisible = ref(false)
const customerVisible = ref(false)
const handleClose = (done) => {
  done()
}

const json = computed(() => {
  // generateCode vue3 template setup style初始化模板
  // let temp = JSON.stringify(state.formConfig, null, '  ')
  // console.log(state.formConfig, 'form-json')
  // return generateCode(state.formConfig)
  return JSON.stringify(state.formConfig, null, '  ')
})

const vueString = computed(() => {
  let temp = JSON.stringify(state.formConfig, null, '  ')
  console.log(state.formConfig, 'form-json')
  return generateCode(state.formConfig)
  return JSON.stringify(state.formConfig, null, '  ')
})
const createJsonClick = () => {
  // window.onerror (// 监听js错误)
  state.jsonCode = JSON.stringify(state.formConfig, null, '  ')
  // addEventListener('error', {
  //   //资源加载
  // })
  dialogVisible.value = true
}

const error = ref('')
const isError = ref(false)
const checkCodeClick = () => {
  const code = customerCode.value
  // 去掉注释
  const temp = code.replace(/.+\*\/\s*/gs, '').replace(/\s+/g, '')
  try {
    // 转换为对象
    const jsCodeInfo = eval(`(function(){return ${temp}})()`)
    console.log(jsCodeInfo, 'jsCodeInfo')
    isError.value = false
  } catch (error) {
    console.warn(error)
    console.log(error, 'error')
    isError.value = true
    error.value = error
  }
}

const customerCode = ref('')
const customerClick = () => {
  customerVisible.value = true
}
const createVueClick = () => {
  state.vueCode = generateCode(state.formConfig)
  vueDialogVisible.value = true
}

const copyJsonFileClick = (e) => {
  copyToClipboard(state.jsonCode, e, ElMessage, 'copy成功', 'copy失败')
  // dialogVisible.value = false
  // console.log(state.jsonCode, 'vue文件要保存勒哟')
  // saveAsFile(state.jsonCode, `${shortid.generate()}.json`)
}

const saveJsonFileClick = (e) => {
  dialogVisible.value = false
  console.log(state.jsonCode, 'vue文件要保存勒哟')
  saveAsFile(state.jsonCode, `${shortid.generate()}.json`)
}

const saveVueFileClick = () => {
  vueDialogVisible.value = false
  console.log(state.vueCode, 'vue文件要保存勒哟')
  saveAsFile(state.vueCode, `${shortid.generate()}.vue`)
}

//拷贝vue文件代码
const copyVueFileClick = () => {
  copyToClipboard(state.vueCode, e, ElMessage, 'copy成功', 'copy失败')
  // dialogVisible.value = false
  // console.log(state.vueCode, 'vue文件要保存勒哟')
  // saveAsFile(state.vueCode, `${shortid.generate()}.vue`)
}

componentList.value = [
  {
    id: 0,
    type: 'static',
    title: '静态文本',
    default: '静态文本'
  },
  {
    id: 1,
    type: 'text',
    title: '文本框',
    default: '文本框'
  },
  {
    id: 2,
    type: 'textarea',
    title: '多行文本',
    default: '多行文本'
  },
  {
    id: 3,
    type: 'number',
    title: '数字框',
    default: 0
  },
  {
    id: 4,
    type: 'select',
    title: '下拉框',
    dictionary: []
  },
  {
    id: 5,
    type: 'radio',
    title: '单选框',
    dictionary: []
  },
  {
    id: 6,
    type: 'checkbox',
    title: '多选框',
    dictionary: []
  },
  {
    id: 7,
    type: 'date',
    title: '日期选择'
  },
  {
    id: 8,
    type: 'daterange',
    title: '日期范围'
  },
  {
    id: 9,
    type: 'switch',
    title: '开关'
  },
  {
    id: 10,
    type: 'editor',
    title: '富文本'
  },
  {
    id: 11,
    type: 'image',
    title: '图片'
  },
  {
    id: 12,
    type: 'video',
    title: '视频'
  },
  {
    id: 13,
    type: 'grid',
    title: '栅格'
  }
]

onMounted(() => {
  let content = document.getElementById('content')

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
  console.log(index, componentList.value[index], 'dropClick')
  let item = componentList.value[index]
  console.log('当前组件为: ', item)
  let column = {
    id: shortid.generate(),
    name: shortid.generate(),
    type: item.type,
    title: item.title,
    rules: []
  }
  if (['select', 'radio', 'checkbox'].includes(item.type)) {
    column.dictionary = [
      {
        code: 1,
        name: '图片'
      },
      {
        code: 2,
        name: '视频'
      }
    ]
  }
  console.log(column, '--column--')
  state.formConfig.formListItem.push(column)
  store.commit('addComponent', column)
}

const dragEndClick = (item) => {
  console.log(item, 'end')
}

const dragClick = (item) => {
  console.log(item, 'drag')
}

const saveAsFile = (fileContent, defaultFileName) => {
  // this.$prompt(this.i18nt('designer.hint.fileNameForSave'), this.i18nt('designer.hint.saveFileTitle'), {
  //   inputValue: defaultFileName,
  //   closeOnClickModal: false,
  //   inputPlaceholder: this.i18nt('designer.hint.fileNameInputPlaceholder')
  // }).then(({ value }) => {
  //   if (!value) {
  //     value = defaultFileName
  //   }

  //   if (getQueryParam('vscode') == 1) {
  //     this.vsSaveFile(value, fileContent)
  //     return
  //   }

  //   const fileBlob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' })
  //   saveAs(fileBlob ,value)
  // }).catch(() => {
  //   //
  // })

  try {
    const fileBlob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' })
    saveAs(fileBlob, defaultFileName)
  } catch {}
}

watch(
  () => currentColumn.value,
  (newVal, oldVal) => {
    if (newVal) {
      console.log(newVal, '修改后的字段项目配置')
      state.formConfig.formListItem.forEach((item) => {
        if (item.id === newVal.id) {
          return {
            ...newVal
          }
        }
      })

      console.log(state.formConfig.formListItem, '修改后的字段项目配置')
    }
  },
  {
    // immediate: true,
    deep: true
  }
)

const componentClick = (item) => {
  console.log('当前组件为: ', item)
  let column = {
    name: shortid.generate(),
    type: item.name,
    title: item.title,
    required: true
  }

  if (['select', 'radio', 'checkbox'].includes(item.type)) {
    column.dictionary = [
      {
        code: 1,
        name: '图片'
      },
      {
        code: 2,
        name: '视频'
      }
    ]
  }
  state.formConfig.formListItem.push(column)
  state.formConfig.formData = {
    ...state.formConfig.formData,
    [column.name]: '默认值'
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
.component-config-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
}

.component-config-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 15px;
}
</style>
