<template>
    <el-button :style="{
        // border: '0px',
        width: column.width + 'px',
        height: column.height + 'px'
    }">按钮</el-button>
</template>
<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    const props = defineProps({
        column: {
            type: [Object],
            default: {}
        }
    })
    console.log(props.column, 'column-props--reactive')
</script>
<style lang="scss" scoped>
</style>