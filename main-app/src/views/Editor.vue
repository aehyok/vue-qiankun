<template>
  <div>
    <div ref="editor" style="text-align:left">
      <div v-html="propEditorContent"></div>
    </div>
  </div>
</template>
<script>
import E from 'wangeditor'
let editor
export default {
  data () {
    return {
      name: 'hello world',
      propEditorContent: '',
      sizeLimit: 500
    }
  },
  mounted () {
    editor = new E(this.$refs.editor)
    editor.config.uploadImgShowBase64 = false // base 64 存储图片
    editor.config.uploadImgServer = this.upLoadUrl // 配置服务器端地址
    editor.config.withCredentials = true
    editor.config.uploadFileName = 'file' // 后端接受上传文件的参数名
    editor.config.uploadImgMaxSize = this.sizeLimit * 1024 // 将图片大小限制为 2M
    // editor.customConfig.uploadImgMaxLength = 1 // 限制一次最多上传 3 张图片
    // editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
    editor.config.uploadImgHeaders = this.headers // 自定义 header
    editor.config.pasteFilter = true
    editor.config.pasteText = true

    // 配置菜单
    editor.config.menus = [
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
    //   editor.customConfig.menus.push('image')
    // }
    editor.config.showLinkImg = false
    editor.config.fontNames = [
      '宋体',
      '微软雅黑',
      'Arial',
      'Tahoma',
      'Verdana'
    ]
    editor.config.lang = {
      上传图片: `上传图片（不超过${this.sizeLimit}KB）`
    }
    editor.config.uploadImgHooks = {
      before: (xhr, editor, files) => {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传

        if (files.some(e => e.size > this.sizeLimit * 1024)) {
          return {
            prevent: true,
            msg: `图片上传大小不可超过${this.sizeLimit * 1024}KB`
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
      customInsert: (insertImg, result, editor) => {
        // 图片上传成功，插入图片的回调
        console.log(result, '----result----')
        if (result.code === -1) {
          this.$message.error(result.message)
          return false
        }
        const { url } = result.data
        insertImg(url)
      }
    }
    editor.config.customAlert = info => {
      // info 是需要提示的内容
      this.$message.error(info)
    }
    editor.config.onchange = html => {
      this.editorContent = html
    }
    editor.create()
    // editor.txt.html(this.editorContent)
    // // editor.txt.clear()
    // this.$nextTick(() => {
    //   // const ul = document.getElementsByClassName('.w-e-panel-tab-title')
    // })
  }
}
</script>
