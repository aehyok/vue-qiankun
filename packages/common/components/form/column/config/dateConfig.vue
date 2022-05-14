<template>
    <h1>date日期选择</h1>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            组件类型:
        </el-col>
        <el-col :span="16" class="component-config-left">
            {{column.type}}
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            组件id:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入内容" v-model="column.id"></el-input>
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            组件name:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入内容" v-model="column.name"></el-input>
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            组件label:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入内容" v-model="column.label"></el-input>
        </el-col>
    </el-row>
</template>
<script setup>
    const props = defineProps({
        column: {
            type: Object,
            default: () => { },
        }
    })
    console.log(props.column, 'text-props-column')
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