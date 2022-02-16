# vant3 vue3 移动端H5下拉刷新，上拉加载组件的封装

｜ 在日常的移动端开发中，经常会遇到列表的展示，以及数据量变多的情况下还会有上拉和下拉的操作。进入新公司后发现移动端好多列表，但是在看代码的时候发现，每个列表都是单独的代码，没有任何的封装，都是通过vant组件，里面充满了过多的重复代码，于是花了一点时间，将其进行封装，发现还是节省了很多的时间

## 直接通过vant 实现的一个列表
  先说一下实现的功能
  - 1、模拟了一个api请求，用于请求接口数据的，并将请求设置为5秒后数据请求成功（效果明显一点）
  - 2、定义请求接口的页码相关参数，以及控制逻辑
  - 3、下拉刷新第一页数据，并且在刷新过程中，不能再进行下拉刷新
  - 4、上拉加载下一页数据，并且在加载过程中，不能再进行上拉加载
  - 5、加载到最后一页，则最末端会显示【数据已加载完毕】
  - 6、如果请求api一开始就没有数据，则显示成一个默认图片（代表没有加载到数据）
  ```javascipt
    <template>
      <van-pull-refresh
        v-model="isRefresh"
        @refresh="refreshClick"
        loading-text="正在请求数据"
        success-text="数据刷新成功"
      >
        <van-list
          v-model:loading="isListLoading"
          :finished="isFinished"
          :offset="state.offset"
          finished-text="数据已加载完毕"
          :immediate-check="false"
          @load="onLoad"
        >
        <div class="main">
          <div class="flex" v-for="item in dataList" :key="item.id">
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
        </van-list>
      </van-pull-refresh>
      <div v-if="state.nodata===true"><van-empty description="没有数据"  /></div>
      
    </template>
    <script setup>
      import { PullRefresh as VanPullRefresh, List as VanList, Empty as VanEmpty } from 'vant';
      import { onBeforeMount, ref, reactive, watch } from 'vue';
      
      const setTotal = 51  // 设置列表总记录数
      let dbList = []  // 通过循环向数组插入测试数据
      for(let i= 0; i< setTotal; i++) {
          dbList.push({
            id: i + 1,
            messageName: '长图片'+(i+1),
            createdAt: '2021-07-27 17:06:19',
            createdByDeptName: '百色',
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          })
      } 
      const successText = ref('正在请求数据')
      const dataList = ref([]);
      const pageModel = reactive({
        page: 1,
        limit: 15,
        total: 0,
        pages: 0,
      });

      const sleep = (time) => {
        return new Promise(resolve => setTimeout(resolve, time))
      }
        /**
        * 模拟通过api获取第几页的数据
        * @param {每页多少条记录} limit 
        * @param {第几页} page 
        */
      const getListApi = async(limit, page) => {
        let start = limit * (page - 1);
        let end = limit * page;
        let tempList = dbList.slice(start, end);
        console.log(pageModel,tempList, `获取第${page}页数据列表`);
        const result = {
            code: 200,
            message: 'success',
            data: {
                docs: tempList,
                page: page,
                limit: limit,
                total: setTotal,
                pages: Math.ceil(setTotal / 15)
            }
        }
        await sleep(5000)
        return new Promise(resolve => resolve(result))
      };

      const state = {
        offset: 6, // 滚动条与底部距离小于 offset 时触发load事件
        nodata: false,
      };

      // 控制下拉刷新的状态，如果为true则会显示，则为一直处于加载中，到请求接口成功手动设置false,则代表刷新成功
      const isRefresh = ref(false);

      // 可以判断如果是上拉加载的最后一页的时候，加载成功设置为true,再上拉则不会进行加载了
      const isFinished = ref(false);

    // 是否在加载过程中，如果是true则不会继续出发onload事件
      const isListLoading = ref(false);  

      onBeforeMount(() => {
        getList()
      });

      // 下拉刷新列表
      const refreshClick = () => {
        isRefresh.value = true;
        isFinished.value = false;
        isListLoading.value = true;
        // 通过接口调用数据
        console.log('调用接口成功,并重置页码为1');
        successText.value="正在加载数据"
        pageModel.page = 1;
        getList()
      };

        //上拉加载下一页
      const onLoad = () => {
        // 判断当前页码+1 是否大于总页数
        // 大于总页数，结束加载，反之继续请求
        isListLoading.value = true
        if (pageModel.page + 1 > pageModel.pages) {
          isFinished.value = true
          isListLoading.value = false
          console.warn('数据页面已超出最大页，不能再进行请求了')
          return;
        } else {
          pageModel.page = pageModel.page + 1;
          getList()
        }
      };


      const getList = () => {
        getListApi(pageModel.limit,pageModel.page).then(result => {
            console.log(result, 'ssssssssssssss')
            successText.value="1111111111"
            let tempList = result.data.docs
            pageModel.pages = result.data.pages
            pageModel.total = result.data.total
            isListLoading.value = false
            isRefresh.value = false
            if (pageModel.page === 1) {
                dataList.value = tempList
            } else {
                dataList.value=[...dataList.value, ...tempList]
            }
        })
      };

      watch(()=> pageModel.total, (newValue, oldValue) => {
            console.log('watch', newValue> 0, oldValue)
            state.nodata = !(newValue > 0)
      })
    </script>
  ```

## 调用封装后实现的一个列表
  可以发现如果每个列表都去做上述主要的五件事情，就会有很多重复的代码，
  先来看一下直接封装后写一个列表有多少代码
  ```js
      <template>
          <list-view :getListApi="getListApi" v-model:pageModel="pageModel" v-model:dataList="dataList">
            <item-view :dataList="dataList"></item-view>
          </list-view>
      </template>
      <script lang="ts" setup>
        import listView from '../../components/list/index.vue';
        import itemView from './item-view.vue';
        import {reactive, ref } from 'vue';
        import type {PageModel } from '../../types/models/index.d';

        const dataList = ref([]);

        const pageModel = reactive<PageModel>({
          page: 1,
          limit: 15,
          total: 0,
          pages: 0,
        });


      const setTotal = 51  // 设置列表总记录数
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
          console.log(pageModel, tempList, `获取第${page}页数据列表`);
          const result = {
              code: 200,
              message: 'success',
              data: {
                  docs: tempList,
                  page: page,
                  limit: limit,
                  total: setTotal,
                  pages: Math.ceil(setTotal / 15)
              }
          }

          const sleep = (time) => {
              return new Promise(resolve => setTimeout(resolve, time))
          }

          await sleep(1000)
          return new Promise(resolve => resolve(result))
      };
      </script>
  ```
    - 解析以上代码：
    1、最重要便是list-view是我们封装的组件，只需要引用即可
    2、而item-view则是我们列表中每一项的UI视图布局和样式，相当于抽离出来了。跟原来一模一样
    3、主要是准备模拟api请求多了不少代码
    4、声明变量和一些定义
    - 封装的理念
    将尽可能通用的代码，抽离出来，不用再进行复制粘贴的操作

  ```

## 接下来我们来看一下封装中的代码
```js
  <template>
    <van-pull-refresh
      v-model="isRefresh"
      @refresh="refreshClick"
      :loading-text="'正在请求数据'"
      success-text="数据刷新成功"
    >
      <van-list
        v-model:loading="isListLoading"
        :finished="isFinished"
        :offset="state.offset"
        finished-text="数据已加载完毕"
        :immediate-check="false"
        @load="onLoad"
      >
        <slot></slot>
      </van-list>
    </van-pull-refresh>
    <div v-if="state.nodata === true">
      <van-empty description="没有数据" />
    </div>
  </template>
  <script lang="ts" setup>
  import { PullRefresh as VanPullRefresh, List as VanList, Empty as VanEmpty } from 'vant';
  import { onBeforeMount, ref, PropType, watch } from 'vue';
  import { PageModel } from '/@/types/models';
  const emits = defineEmits(['getList', 'update:pageModel', 'update:dataList']);
  const props = defineProps({
    pageModel: {
      type: Object as PropType<PageModel>,
      default: () => { },
    },
    dataList: {
      type: [Array],
      default: () => []
    },
    getListApi: {
      type: Function,
      default: () => { }
    }
  });

  const state = {
    offset: 6, // 滚动条与底部距离小于 offset 时触发load事件
    nodata: false,
  };

  // 控制下拉刷新的状态，如果为true则会显示，则为一直处于加载中，到请求接口成功手动设置false,则代表刷新成功
  const isRefresh = ref(false);

  // 可以判断如果是上拉加载的最后一页的时候，加载成功设置为true,再上拉则不会进行加载了
  const isFinished = ref(false);

  // 是否在加载过程中，如果是true则不会继续出发onload事件
  const isListLoading = ref(false);

  onBeforeMount(() => {
    // emits('getList');
    console.log('getList')
    getList()
  });

  const refreshClick = () => {
    isRefresh.value = false;
    isFinished.value = false;
    isListLoading.value = true;
    // 通过接口调用数据
    console.log('调用接口成功');
    props.pageModel.page = 1;
    emits('update:pageModel', props.pageModel)
    // emits('getList');
    getList()
  };

  const onLoad = () => {
    isListLoading.value = true
    if (props.pageModel.page + 1 > props.pageModel.pages) {
      isFinished.value = true
      isListLoading.value = false
      console.warn('数据页面已超出最大页，不能再进行请求了')
      return;
    } else {
      props.pageModel.page = props.pageModel.page + 1;
    }
    emits('update:pageModel', props.pageModel)
    // emits('getList');
    getList()
  };
  const dataList: any = ref([]);
  const getList = () => {
    props.getListApi(props.pageModel.limit, props.pageModel.page).then((result: any) => {
      console.log(result, 'ssssssssssssss')
      let tempList: [] = result.data.docs
      props.pageModel.limit = result.data.limit
      props.pageModel.page = result.data.page
      props.pageModel.pages = result.data.pages
      props.pageModel.total = result.data.total
      isListLoading.value = false
      isRefresh.value = false
      if (props.pageModel.page === 1) {
        dataList.value = tempList
      } else {
        dataList.value = [...props.dataList, ...tempList]
      }
      emits('update:dataList', dataList.value)
      emits('update:pageModel', props.pageModel)
    })
  };

  // 判断是否有数据
  watch(() => props.pageModel.total, (newValue, oldValue) => {
    console.log('watch', newValue > 0, oldValue)
    state.nodata = !(newValue > 0)
  })
  </script>
```

  解析封装的代码
  1、通过watch 监测tatal,判断是否有数据，来确定是否要显示没有数据时的默认图片
  2、将请求通过props进行传递，在封装的组件中进行统一处理，当然这里就要要求使用组件的接口要统一参数
  3、请求数据后要将数据列表和分页数据通过emits进行回传父组件，用于显示列表数据
  4、下拉刷新判断仍然存在统一封装
  5、上拉加载列表数据判断仍热存在统一封装
  6、最后一次加载数据进行判断处理
  7、TypeScript用的还不够熟练，数据列表这一块的封装还不到位，争取有时间再进行深入一下。
  
  --、再加上效果图，或者GIF，以及小视频进行展示效果