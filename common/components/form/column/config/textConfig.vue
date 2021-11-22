<template>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            组件id:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入内容" v-model="componentValue.id"></el-input>
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            组件name:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入内容" v-model="componentValue.name"></el-input>
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            组件title:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入组件名称" v-model="componentValue.title"></el-input>
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            是否必填:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-switch v-model="componentValue.required"></el-switch>
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            占位文本:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入占位文本" v-model="componentValue.placeholder"></el-input>
        </el-col>
    </el-row>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
    column: {
        type: Object,
        default: () => { },
    }
})

const componentValue = computed({
  get: function () {
    return props.column
  },
  set: function (val) {
    console.log(val, 'text-config-computed')
    emit('update:column', val)
  }
})

console.log(props.column, '文本框的text-props-column')
</script>
<style lang="scss" scoped>

.component-config-row {
  display: flex;
  padding: 5px;
}

.component-config-right{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
}

.component-config-left{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-right: 15px;
}
</style>