<template>
        <el-row>
            <el-col :span="12" style="background: #d3dce6;border: 1px solid red; height: 50px;">
                <div @dragover="dragOverClick" @drop="dropClick" style="z-index: 10;width: 100%;">
                <drag-view
                    v-model:columnList="column.formListItem"
                    :formData="formData"
                    @setCurrentColumn="setCurrentColumn"
                />
                </div>
            </el-col>
            <el-col :span="12" style="background: #d3dce6;border: 1px solid red;">111111111111</el-col>
        </el-row>
</template>
    
<script setup lang='ts'>
import { computed, reactive, ref } from 'vue'
import DragView from "../../../form/drag-index.vue";
const emit = defineEmits(["update:data"])
const props = defineProps({
  column: {
    type: [Object],
    default: () => {},
  },
  data: {
    type: String,
    default: '',
  },
   formData: {
    type: Object,
    default: () => { },
  },
})
const { column, data } = props
const currentColumn = ref({})
const setCurrentColumn = (column) => {
  currentColumn.value = column
  console.log(column, 'setCurrentColumn')
}

const dragOverClick = (e) => {
  console.log('dragOverClick-grid')
}

const dropClick = (e) => {
  console.log('drop-grid')
  e.preventDefault()
  e.stopPropagation()
}
</script>
    
<style>
    
</style>