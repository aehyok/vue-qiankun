<template>
  <el-dialog v-model="showDialog" title="弹窗">
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  }
})
</script>
