<template>
    <el-dialog
      title="版本信息"
      v-model="visible"
      width="400px"
      :close-on-click-modal=closeOnClickModal
      :append-to-body="true"
      @close="close"
    >
    <div v-for="item in versions" style="display:flex;margin:20px;">
        <div style="width:150px;">{{item.key}}: </div>
        <div style="width:100px;">{{item.value}}</div>
    </div>
      <template #footer>
        <el-button @click="close">返回</el-button>
      </template>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted} from 'vue'
import { getVersion } from '../services'
import  handConfig  from '../../public/config'
import { isObjArr } from '../../../common/utils/utils'
export default defineComponent({
  name: 'Version',
  props: {
    versionDialogVisible: {
      type: Boolean,
      default: false
    },
  },
  emits:["cancel"],
  setup(props, context) {
    const state = reactive({
      visible: props.versionDialogVisible,
      closeOnClickModal: false,
      versions: []
    })

    onMounted(() => {
        getVersionApi()
    })

    const close = () => {
      context.emit('cancel')
    }

    const getVersionApi = () => {
      // getVersion().then((res: any) => {
      //   if(res.code === 200) {
      //       let obj = res.data.dvs20
      //       let array =[]
      //       const childSystemList = handConfig.systemList
      //       Object.keys(obj).forEach((item, index) => {
      //           let key = Object.keys(obj)[index]
      //           let value = isObjArr(obj[key].version)? obj[key].version[0] : obj[key].version
      //           let current =childSystemList.find(item => item.systemId === key)
      //           console.log(value,'value')
      //           if(value) {
      //               array.push({
      //                   key: current.title,
      //                   value: value
      //               })
      //           }
      //       })
      //       state.versions= array
      //   }
      // })
    }
    return {
      ...toRefs(state),
      close,
    }
  },
})
</script>
<style lang="scss" scoped>
.form-row {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.verCodeImg {
  margin-left: 10px;
  display: flex;
  align-items: center;
  .svgbox {
    position: relative;
    top: 6px;
  }
  img {
    height: 100%;
  }
}
</style>