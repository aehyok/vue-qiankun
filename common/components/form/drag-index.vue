<template>
  <el-row :gutter="20">
    <draggable
      v-model="columnList"
      @start="dragStart"
      @end="dragEnd"
      item-key="name"
      class="dragClass"
    >
      <template #item="{ element, index }">
        <div
          class="drag-default"
          @click="mouseOverClick(index,$event)"
        >
          <component-view
            :columnSpan="columnSpan"
            :column="element"
            :formData="formData"
            :class="[selectIndex === index ? 'drag-select' : '']"
          >
          </component-view>
          <div
            :class="[selectIndex === index ? 'drag-operation' : 'drag-hidden']"
          >
          <el-button type="primary" size="small" @click="moveComponentClick(0,index,$event)"><i class="el-icon-top" ></i></el-button>
          <el-button type="primary"  size="small" @click="moveComponentClick(1,index,$event)"><i class="el-icon-bottom"></i></el-button>
          <el-button type="primary" size="small" @click="deleteComponentClick(index)"><i class="el-icon-close" ></i></el-button>  
          </div>
        </div>
      </template>
    </draggable>
  </el-row>
</template>
<script setup>
import ComponentView from './column/component-view.vue'
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { useStore } from 'vuex';
const emit = defineEmits(["update:data", "setCurrentColumn"])
const store = useStore()
const props = defineProps({
  columnList: {
    type: Array,
    default: () => [],
  },
  formData: {
    type: Object,
    default: () => { },
  },
  columnSpan: {
    type: Number,
    default: 24,
  },
  componentExampleClick: {
    type: Function,
    default: () => {

    }
  }
})

const drag = ref(false)
const selectIndex = ref(-1)
const dragStart = (event) => {
  console.log(event, 'event')
  drag.value = true
}

const dragEnd = (event) => {
  console.log(event, 'dragEnd')
}

const mouseOverClick = (index,e) => {
  selectIndex.value = index
  let currentSelectComponent = props.columnList[index]
  console.log(currentSelectComponent, 'mouseOverClick',e)
  store.commit('setCurrentComponent', currentSelectComponent)
  emit('setCurrentColumn', currentSelectComponent)
}

const deleteComponentClick = (index) => {
  let array = props.columnList
  array.splice(index,1)
  store.commit('updateComponentList', array)
  emit("update:columnList", array)
}

// 组件的向上和向下移动
const moveComponentClick = (type, index, e) => {
  e.stopPropagation();
  let array = props.columnList
  console.log(type === 0,selectIndex, "selectIndex up ")
  
  if(type === 0) {
    if(selectIndex.value > 0)  {
      array.splice(type ? index : index - 1, 1, ...array.splice(type ? index + 1 : index, 1, array[type ? index : index - 1]))
      emit("update:columnList", array)
      selectIndex.value = selectIndex.value -1 
    } else {
      selectIndex.value = 0
    }
  }

  if(type === 1) {
    if(selectIndex.value < array.length-1) {
      array.splice(type ? index : index - 1, 1, ...array.splice(type ? index + 1 : index, 1, array[type ? index : index - 1]))
      emit("update:columnList", array)
      selectIndex.value = selectIndex.value + 1 
    } else {
      selectIndex.value = array.length -1
    }
    console.log(type,selectIndex, "selectIndex down")
  }
}

</script>
<style lang="scss" scoped>
.dragClass {
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
}

.drag-default {
  width: 100%;
  position: relative;
  display: inline-block;
}

.drag-select {
  border: 1px dashed red;
  cursor: pointer;
}

.drag-operation {
  position: absolute;
  right: 10px;
  bottom: 3px;
  width: 100px;
  display: flex;
  justify-content: flex-end;
}

.drag-hidden {
  display: none;
}
</style>
