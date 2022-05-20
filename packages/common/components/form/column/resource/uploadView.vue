<template>
  <div class="upload">
    <el-upload
      ref="upload"
      class="avatar-uploader"
      :action="upLoadUrl"
      :on-success="handleUploadSuccess"
      :before-upload="beforeAvatarUpload"
      :headers="headers"
      :limit="limit"
      list-type="text"
      :accept="accept"
      :multiple="multiple"
      :show-file-list="false"
      :on-exceed="handleExceed"
      :data="{ isMaterial }"
      name="files"
    >
      <i class="el-icon-plus avatar-uploader-icon" v-if="showBtn"></i>
      <slot v-else></slot>
    </el-upload>
  </div>
</template>

<script>
// import { getSystemParamValue } from '@/services'
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, reactive, computed, watch, toRefs } from 'vue'
export default defineComponent({
  components: {},
  props: {
    showBtn: {
      type: Boolean,
      default: true
    },
    fileType: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 1
    },
    sizeLimit: {
      type: Number,
      default: 5120 // kb
    },
    accept: {
      type: String,
      default: '' // .jpg,.jpeg,.png,.bmp
    },
    isMaterial: {
      type: Boolean,
      default: false
    },
    requiredAudit: {
      type: String,
      default: 'no'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    uploadData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  emits: ['callback'], // 先申明
  setup(props, context) {
    const state = reactive({
      headers: {},
      upLoadUrl: '', // 上传地址
      // sizeLimit: 5120, // 规定上传的大小
      format: [] // 规定格式
    })

    const limitCount = computed(() => {
      return props.limit - props.uploadData.length
    })

    onMounted(() => {
      const user = JSON.parse(localStorage.getItem('token'))
      state.headers = {
        // Authorization: user.authorization,
        // Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiYWRtaW4iLCJ1aWQiOjQsImNyZWF0ZVRpbWUiOjE2MjI2MDkwNzQsImNsaWVudElwIjoiMTI3LjAuMC4xIiwiZXh0ZW5kVG9rZW4iOiIifQ.TWqb8gO9wY2mjh0Wq4FgusCRrxybOnTw1JIQ_-3ed-Y',
      }
      const prefix = process.env.NODE_ENV === 'development' ? '/infra' : ''
      state.upLoadUrl = `${prefix}/api/sunfs/upload?ra=${props.requiredAudit}&r=${Math.random()}`
      // this.getImageSize()
    })

    const handleExceed = (files, fileList) => {
      ElMessage.warning(
        `最多上传 ${props.limit} 个文件，已上传${props.uploadData.length}个文件，还可以上传${limitCount}个文件`
      )
    }
    const handleUploadSuccess = (response, file, fileList) => {
      if (response.code !== 200) {
        ElMessage.error(response.message)
        return
      }
      // console.log(response.data, 'response.data+++++___++++')
      context.emit('callback', response.data)
    }
    const beforeAvatarUpload = (file) => {
      if (props.fileType === 'img') {
        // const isJPG = state.format.includes(file.type)
        const isJPG =
          file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        if (!isJPG) {
          ElMessage.error(`上传图片只能是 jpeg ,png, jpg 格式!`)
          return false
        }
      }
      const oversize = file.size / 1024 / 1024 < props.sizeLimit / 1000
      if (!oversize) {
        ElMessage.error(`上传文件大小不能超过 ${props.sizeLimit}KB`)
      }
      return oversize
    }
    // 调接口规定大小
    // const getImageSize = () =>{
    //   getSystemParamValue({
    //     paramName: 'upload_image_maxsize',
    //   }).then(res => {
    //     // console.log(res)
    //     if (res && res.code === 200) {
    //       props.sizeLimit = res.data
    //     }
    //   })
    // }
    return {
      ...toRefs(state),
      limitCount,
      handleExceed,
      handleUploadSuccess,
      beforeAvatarUpload
      // getImageSize,
    }
  }
})
</script>

<style lang="scss" scoped>
.avatar-uploader {
  :deep(.el-upload:hover) {
    border-color: #409eff;
  }
  :deep(.el-upload) {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
}
</style>
