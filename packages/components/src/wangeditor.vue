<template>
  <div>
    <div ref="editorRef" style="text-align: left"></div>
    <!-- <div v-html="propEditorContent"></div> -->
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, computed, unref, watch, toRefs, ref } from 'vue'
// import { getSystemParamValue } from '@/services'
import { ElMessage } from 'element-plus'
import E from 'wangeditor'
export default defineComponent({
  props: {
    propEditorContent: {
      type: String,
      default: ''
    },
    canAssignHtml: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  emits: ['dochange'], // 先申明
  setup(props, context) {
    const editorRef = ref(null)
    const state = reactive({
      upLoadUrl: '',
      headers: {},
      sizeLimit: 10 * 1024,
      editor: null,
      substance: null
    })
    const updateval = (val) => {
      if (val === '<p><br></p>') {
        val = ''
      }
    }

    const editorContent = computed({
      get() {
        return props.propEditorContent
      },
      set(value) {
        updateval(value)
        context.emit('dochange', value, state.editor.txt.text())
      }
    })

    onMounted(() => {
      const prefix = process.env.NODE_ENV === 'development' ? '/infra/api' : '/api'
      state.upLoadUrl = `${prefix}/sunfs/upload?ra=no&r=${Math.random()}`
      const token = JSON.parse(localStorage.getItem('token') ?? {})
      state.headers = {
        Authorization: token?.authorization
      }
      state.editor = new E(editorRef.value)
      let editorConfig = state.editor.config
      editorConfig.uploadImgShowBase64 = false // base 64 存储图片
      editorConfig.uploadImgServer = state.upLoadUrl // 配置服务器端地址
      editorConfig.withCredentials = true
      editorConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
      editorConfig.uploadImgMaxSize = state.sizeLimit * 1024 // 将图片大小限制为 2M
      editorConfig.uploadImgMaxLength = 1 // 限制一次最多上传 3 张图片
      editorConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
      editorConfig.uploadImgHeaders = state.headers // 自定义 header
      editorConfig.pasteFilter = true
      editorConfig.pasteText = true

      // 配置菜单
      // 默认情况下，显示所有菜单
      editorConfig.menus = [
        'bold', // 粗体
        'italic', // 斜体
        'underline', // 下划线
        // 'head', // 标题
        'fontName', // 字体
        'fontSize', // 字号
        'foreColor', // 文字颜色
        // 'strikeThrough', // 删除线
        // 'backColor', // 背景颜色
        'list', // 列表
        'justify', // 对齐方式
        // 'link', // 插入链接
        // 'quote', // 引用
        'emoticon', // 表情
        'image' // 插入图片
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        // 'undo', // 撤销
        // 'redo' // 重复
      ]
      // let login = JSON.parse(localStorage.getItem('jurisdiction'))
      // if (!login.isAuditImage) {
      //   editor.config.menus.push('image')
      // }
      editorConfig.showLinkImg = false
      editorConfig.fontNames = ['宋体', '微软雅黑', 'Arial', 'Tahoma', 'Verdana']
      editorConfig.lang = {
        上传图片: `上传图片（不超过${state.sizeLimit * 1024}KB）`
      }
      editorConfig.height = 600
      editorConfig.zIndex = 2
      editorConfig.uploadFileName = 'files'
      editorConfig.uploadImgParams = {
        isMaterial: false
      }
      editorConfig.uploadImgHooks = {
        before: (xhr, editor, files) => {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传

          if (files.some((e) => e.size > state.sizeLimit * 1024)) {
            return {
              prevent: true,
              msg: `图片上传大小不可超过${state.sizeLimit * 1024}KB`
            }
          }
        },
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
          console.log('fail', result)
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
          // const { url } = result.data
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result) => {
          // 图片上传成功，插入图片的回调
          if (result.code === -1) {
            ElMessage.error(result.message)
            return false
          }
          const { url } = result.data[0]
          insertImg(url)
        }
      }
      editorConfig.customAlert = (info) => {
        // info 是需要提示的内容
        ElMessage.error(info)
      }
      editorConfig.onchange = (html) => {
        // editorContent = html
        context.emit('dochange', html, state.editor.txt.text())
      }
      state.editor.create()
      state.editor.txt.html(props.propEditorContent)
    })
    watch(props.propEditorContent, (newV, oldVal) => {
      if (newV !== state.editor.txt.html()) {
        if (props.canAssignHtml) {
          state.editor.txt.html(newV)
        }
        updateval(newV)
        context.emit('dochange', newV, state.editor.txt.text())
      }
    })
    return {
      ...toRefs(state),
      updateval,
      editorRef,
      editorContent
    }
  }
})
</script>

<style lang="scss" scoped></style>
