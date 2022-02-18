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
                        <span>
                            <span :class="item.createdByDeptName ? 'createdByDeptName' : ''">
                                {{
                                    item.createdByDeptName ? item.createdByDeptName : ''
                                }}
                            </span>
                            {{ item.createdAt }}
                        </span>
                    </div>
                    <div v-if="item.url">
                        <img :src="item.url" alt />
                    </div>
                </div>
            </div>
        </van-list>
    </van-pull-refresh>
    <div v-if="state.nodata === true">
        <van-empty description="没有数据" />
    </div>
</template>
<script setup>
import { PullRefresh as VanPullRefresh, List as VanList, Empty as VanEmpty } from 'vant';
import { onBeforeMount, ref, reactive, watch } from 'vue';

const setTotal = 25  // 设置列表总记录数
const setLimit = 10  // 设置每页记录数
let dbList = []  // 通过循环向数组插入测试数据
for (let i = 0; i < setTotal; i++) {
    dbList.push({
        id: i + 1,
        messageName: '长图片' + (i + 1),
        createdAt: '2021-07-27 17:06:19',
        createdByDeptName: '百色',
        url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
    })
}
const dataList = ref([]);
const pageModel = reactive({
    page: 1,
    limit: setLimit,
    total: 0,
    pages: 0,
});

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
            pages: Math.ceil(setTotal / setLimit)
        }
    }

    const sleep = (time) => {
        return new Promise(resolve => setTimeout(resolve, time))
    }

    await sleep(1000)
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
    getListApi(pageModel.limit, pageModel.page).then(result => {
        console.log(result, 'ssssssssssssss')
        let tempList = result.data.docs
        pageModel.pages = result.data.pages
        pageModel.total = result.data.total
        isListLoading.value = false
        isRefresh.value = false
        if (pageModel.page === 1) {
            dataList.value = tempList
        } else {
            dataList.value = [...dataList.value, ...tempList]
        }
    })
};

// 判断有无数据，进行加载无数据默认图片
watch(() => pageModel.total, (newValue, oldValue) => {
    console.log('watch', newValue > 0, oldValue)
    state.nodata = !(newValue > 0)
})
</script>
<style lang="scss" scoped>
.main {
    padding: 0 15px;
    .flex {
        display: flex;
        background: #fff;
        padding: 5px 12px;
        margin: 10px 0;
        border-radius: 3px;
        .itemCollagen {
            width: 100%;
        }
        .itemCollagenSeventy {
            width: 80%;
        }
        .itemCollagen,
        .itemCollagenSeventy {
            p {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                color: #333;
                font-weight: bold;
                font-size: 16px;
                margin: 15px 0;
            }
            span {
                font-weight: 400;
                display: inline-block;
                margin-bottom: 5px;
                color: #909399;
                font-size: 12px;
            }
        }
        div:nth-child(2) {
            width: 20%;
            margin-top: 10px;
            text-align: right;
            img {
                width: 60px;
                height: 60px;
            }
        }
    }
}
</style>