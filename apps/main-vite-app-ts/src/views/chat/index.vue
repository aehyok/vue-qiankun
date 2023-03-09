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
      <template v-for="item in contentLength">
        <div
          style="
            width: calc(100% - 20px);
            height: 40px;
            margin: 10px 10px 0 10px;
            display: flex;
            border: 2px solid #4d4d4f;
            border-radius: 6px;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 13px;
            background-color: #24272e;
          "
        >
          <el-icon style="padding-left: 5px"><ChatDotRound /></el-icon>
          <div
            style="
              margin-left: 5px;
              width: 155px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            {{ item }}chatgpt接口学习指南chatgpt接口学习指南
          </div>
          <el-icon style="padding-left: 5px"><Edit /></el-icon>
          <el-icon style="padding-left: 5px"><DeleteFilled /></el-icon>
        </div>
      </template>
    </div>

    <div class="chat-right">
      <div class="right-content">
        <div
          style="
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-right: 10px;
            margin-top: 10px;
          "
        >
          <div style="display: flex; flex-direction: column">
            <div
              style="
                font-size: 12px;
                color: gray;
                display: flex;
                justify-content: flex-end;
                margin-bottom: 3px;
              "
            >
              2023/3/9 11:29:19
            </div>
            <div
              style="
                background-color: #a1dc95;
                border-radius: 8px;
                line-height: 50px;
                padding-left: 10px;
                padding-right: 10px;
              "
            >
              请用go语言写一段hello world入门代码，并解析请用go语言写一段hello world入门代码，并解析
            </div>
          </div>

          <img :src="iconUrl" style="width: 40px; height: 40px; margin-left: 10px" />
        </div>
        <div
          style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 10px;
            color: white;
            margin-top: 20px;
          "
        >
          <img :src="iconUrl" style="width: 40px; height: 40px; margin-right: 10px" />
          <div style="display: flex; flex-direction: column">
            <div
              style="
                font-size: 12px;
                color: gray;
                display: flex;
                justify-content: flex-start;
                margin-bottom: 3px;
              "
            >
              2023/3/9 11:29:19
            </div>
            <div
              style="
                background-color: gray;
                border-radius: 8px;
                line-height: 50px;
                padding-left: 10px;
                padding-right: 10px;
              "
            >
              请用go语言写一段hello world入门代码，并解析请用go语言写一段hello world入门代码，并解析
            </div>
          </div>
        </div>
      </div>
      <div class="foot-content">
        <el-input
          v-model="input"
          :rows="2"
          type="textarea"
          style="height: 60px; padding-right: 10px; margin-top: 10px"
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
const contentLength = ref(10)
const iconUrl = ref('/images/home/icon_avator.png')
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
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
  // border-radius: 20px;
  // border: 1px solid salmon;
}
.foot-content {
  flex: 0 0 80px;
  margin: 0px 40px 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
