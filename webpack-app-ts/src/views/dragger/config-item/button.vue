<template>
    <h1>button日期选择</h1>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">left:</el-col>
        <el-col :span="16" class="component-config-left">
            <el-input-number v-model="config.x" :controls="controls" placeholder="请输入数值" />
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">top:</el-col>
        <el-col :span="16" class="component-config-left">
            <el-input-number v-model="config.y" :controls="controls" placeholder="请输入数值" />
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">width:</el-col>
        <el-col :span="16" class="component-config-left">
            <el-input-number v-model="config.width" :controls="controls" placeholder="请输入数值" />
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">height:</el-col>
         <el-col :span="16" class="component-config-left">
            <el-input-number v-model="config.height" :controls="controls" placeholder="请输入数值" />
        </el-col>
    </el-row>
</template>
<script setup lang="ts">

import { watch } from 'vue';

const props = defineProps({
    config: {
        type: Object,
        default: () => { },
    }
})

watch(()=> props.config,(newValue, oldValue)=> {
    console.log(newValue, '新的属性值')
}, {
    deep: true,
    immediate: true,
})
console.log(props.config, 'text-props-column')
const controls = false

</script>
<style lang="scss" scoped>
.component-config-row {
    display: flex;
    padding: 5px;
}

.component-config-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
}

.component-config-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 15px;
}
</style>