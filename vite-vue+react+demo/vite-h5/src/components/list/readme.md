# vant3 vue3 移动端H5下拉刷新，上拉加载组件的封装

｜ 在日常的移动端开发中，经常会遇到列表的展示，以及数据量变多的情况下还会有上拉和下拉的操作。进入新公司后发现移动端好多列表，但是在看代码的时候发现，每个列表都是单独的代码，没有任何的封装，都是通过vant组件，里面充满了过多的重复代码，于是花了一点时间，将其进行封装，发现还是节省了很多的时间

## 直接通过vant 实现的一个列表
  使用过vant 组件的应该都很清楚的PullRefresh组件和List列表组件。通过这两个组件就可以比较方便的实现开篇讲解的需求。
  

## 调用封装后实现的一个列表
  先直接看代码
  ```js
      
        <list-view @getList="getList" v-model:pageModel="pageModel">
          <item-view :dataList="dataList"></item-view>
        </list-view>
```

    解析以上代码：

    1、view视图部分代码其中list-view便是我们封装的组件
    2、而item- view则是我们列表中每一项的UI视图布局和样式，相当于抽离出来了。

再来看第二段代码
```js
      <script setup>
      import listView from '../../components/list/index.vue'; 

        const dataList= ref([])

        const pageModel = reactive<PageModel>({
          page: 1,
          limit: 15,
          total: list.length,
          pages: Math.round(list.length / 15),
        });

        // 这里模拟的便是调用接口数据
        const getListApi = () => {
          let start = pageModel.limit * (pageModel.page - 1);
          let end = pageModel.limit * pageModel.page;
          let tempList = list.slice(start, end);
          console.log(pageModel, '获取数据列表');
          return tempList;
        };

        const getList = () => {
          if (pageModel.page === 1) {
            dataList.value = getListApi();
          } else {
            let tempList = getListApi();
            tempList.forEach((item) => {
              dataList.value?.push(item);
            });
          }
        };


      </script>
```    
    再来解析以上代码：
    
    3、需要通过import进行导入,script 标签上加上setup 可以省略掉
      components:{
        listView
      }
    4、准备调用的接口请求，以及返回数据和分页参数
     getListApi这里模拟的请求接口方法，这里实际上就是接口请求
     pageModel 就是设置分页的参数
     dataList 就是通过接口返回的数据列表
     getList处理逻辑简单判断页码对请求的数据进行叠加
      
    


  ```
