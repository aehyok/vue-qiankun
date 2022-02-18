<template>
    <list-view :getListApi="getListApi" v-model:pageModel="pageInfo" v-model:dataList="dataList">
      <item-view :dataList="dataList"></item-view>
    </list-view>
</template>
<script lang="ts" setup>
  import listView from '../../components/list/index.vue';
  import itemView from './item-view.vue';
  import {reactive, ref, watch } from 'vue';
  import type {PageModel } from '../../types/models/index.d';

  const dataList = ref([]);

  const setTotal = 25  // 设置列表总记录数
  const setLimit = 10  // 设置每页的记录总数
  const pageInfo = reactive<PageModel>({
    page: 1,
    limit: setLimit,
    total: 0,
    pages: 0,
  });

let dbList: any= []  // 通过循环向数组插入测试数据
for (let i = 0; i < setTotal; i++) {
    dbList.push({
        id: i + 1,
        messageName: '长图片' + (i + 1),
        createdAt: '2021-07-27 17:06:19',
        createdByDeptName: '百色',
        url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
    })
}

/**
* 模拟通过api获取第几页的数据
* @param {每页多少条记录} limit 
* @param {第几页} page 
*/
const getListApi = async (limit, page) => {
    let start = limit * (page - 1);
    let end = limit * page;
    let tempList = dbList.slice(start, end);
    console.log(pageInfo, tempList, `获取第${page}页数据列表`);
    const result = {
        code: 200,
        message: 'success',
        data: {
            docs: tempList,
            page: page,
            limit: limit,
            total: setTotal,
            pages: Math.ceil(setTotal / setLimit)
        }
    }

    const sleep = (time) => {
        return new Promise(resolve => setTimeout(resolve, time))
    }

    await sleep(3000)
    return new Promise(resolve => resolve(result))
};

watch(() => pageInfo.page, (newValue, oldValue) => {
  console.log('watch111111111111111111111111111', newValue, oldValue)
},{
  immediate: true
})
</script>

