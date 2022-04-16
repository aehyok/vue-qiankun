<template>
  <vue3-seamless-scroll :list="list" :class="[classArray[index1]]">
    <div class="item" v-for="(item, index) in list" :key="index">
      <span>{{item.title}}</span>
      <span>{{item.date}}</span>
    </div>
  </vue3-seamless-scroll>

    <div style="width: 100%; height:2px"></div>


  <vue3-seamless-scroll :list="list1" :class="[classArray[index2]]">
    <div class="item" v-for="(item, index) in list1" :key="index">
      <span>{{item.title}}</span>
      <span>{{item.date}}</span>
    </div>
  </vue3-seamless-scroll>
</template>
<script setup>
import { defineComponent, ref } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";


    const classArray = [
        'scroll1',
        'scroll2'
    ]  

    const index1 = 0
    const index2 = 1
    const list = ref([
      {
        title: "Vue3.0 无缝滚动组件展示数据第1条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第2条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第3条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第4条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第5条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第6条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第7条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第8条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第9条",
        date: Date.now(),
      },
    ]);

    const list1 = ref([
      {
        title: "Vue3.0 无缝滚动组件展示数据第1条11",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第2条11",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第3条11",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第4条11",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第5条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第6条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第7条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第8条",
        date: Date.now(),
      },
      {
        title: "Vue3.0 无缝滚动组件展示数据第9条",
        date: Date.now(),
      },
    ]);
</script>

<style>
.scroll1 {
  height: 200px;
  width: 500px;
  margin: 100px auto;
  border: 1px solid red;
  overflow: hidden;
}

.scroll2 {
  height: 160px;
  width: 500px;
  margin: 100px auto;
  border: 1px solid  blue;
  overflow: hidden;
}

.scroll1 .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}

.scroll2 .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}
</style>