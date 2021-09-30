<template>
    <!-- 输入框 -->
    <el-input
        :placeholder="item.placeholder"
        v-model="state.keyword"
        class="input-search"
        @keyup.enter="search"
    ></el-input>
</template>