<template>
  <el-dialog
    title="版本信息"
    v-model="visible"
    width="400px"
    :close-on-click-modal="closeOnClickModal"
    :append-to-body="true"
    @close="close"
  >
    <div v-for="item in versions" style="display: flex; margin: 20px" :key="item.key">
      <div style="width: 150px">{{ item.key }}: </div>
      <div style="width: 100px">{{ item.value }}</div>
    </div>
    <template #footer>
      <el-button @click="close">返回</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, onMounted } from "vue"

  export default defineComponent({
    name: 'Version',
    props: {
      versionDialogVisible: {
        type: Boolean,
        default: false
      }
    },
    emits: ['cancel'],
    setup(props, context) {
      const state = reactive({
        visible: props.versionDialogVisible,
        closeOnClickModal: false,
        versions: []
      })

      onMounted(() => {
        console.log('sssss')
      })

      const close = () => {
        context.emit('cancel')
      }

      return {
        ...toRefs(state),
        close
      }
    }
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