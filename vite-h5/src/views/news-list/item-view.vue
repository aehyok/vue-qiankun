<template>
  <div class="main">
    <div
      class="flex"
      v-for="item: NewsModel in dataList"
      :key="item.id"
      @click="goDetails(item.id)"
    >
      <div :class="!item.url ? 'itemCollagen' : 'itemCollagenSeventy'">
        <p>{{ item.messageName }}</p>
        <span
          ><span :class="item.createdByDeptName ? 'createdByDeptName' : ''">{{
            item.createdByDeptName ? item.createdByDeptName : ''
          }}</span
          >{{ item.createdAt }}</span
        >
      </div>
      <div v-if="item.url">
        <img :src="item.url" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
