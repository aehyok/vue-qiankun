<template>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            组件1id:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入内容"></el-input>
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            组件name:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入内容"></el-input>
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            组件label:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入内容"></el-input>
        </el-col>
    </el-row>   
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            是否必填:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-switch></el-switch>
        </el-col>
    </el-row>
    <el-row class="component-config-row">
        <el-col :span="8" class="component-config-right">
            maxlength:
        </el-col>
        <el-col :span="16" class="component-config-left">
            <el-input placeholder="请输入内容"></el-input>
        </el-col>
    </el-row>
</template>
<script setup>
    console.log('textarea')
</script>