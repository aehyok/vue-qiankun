import type { DefineComponent from 'vue';
<template>
  <div class="chat-content">
    <div class="chat-left">
      <div
        style="
          width: calc(100% - 20px);
          height: 40px;
          margin: 10px 10px 0 10px;
          display: flex;
          border: 2px solid #4d4d4f;
          border-radius: 6px;
          align-items: center;
          color: white;
        "
      >
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
          style="margin-left: 5px"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <div style="margin-left: 5px">New chat</div>
      </div>
    </div>
    <div class="chat-right">
      <div class="right-content">chat content</div>
      <div class="foot-content">
        <el-input
          v-model="input"
          :rows="2"
          type="textarea"
          style="height: 60px; padding-right: 10px"
          placeholder="Please input"
        />
        <el-button type="success" :icon="Promotion">发送</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Promotion } from '@element-plus/icons-vue'

const input = ref('')
</script>
<style lang="scss" scoped>
.chat-content {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
}

.chat-left {
  width: 245px;
  background-color: #202123;
  display: flex;
  justify-content: center;
}

.chat-right {
  flex: 1;
  background-color: #343541;
  display: flex;
  flex-direction: column;
}
.right-content {
  flex: auto;
  position: relative;
  border: 1px solid salmon;
}
.foot-content {
  flex: 0 0 80px;
  margin: 20px 40px 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
