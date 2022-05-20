<template>
  <el-row :gutter="20">
    <template v-for="(item, index) in columnList" :key="index + 'formView'">
      <component-view
        :columnSpan="columnSpan"
        :column="item"
        :formData="formData"
        @click="componentExampleClick"
      />
      <template v-for="child in item.controls">
        <template v-if="formData[item.name] === child.value">
          <template
            v-for="(childColumn, columnIndex) in child.showCondition"
            :key="columnIndex + 'childColumnView'"
          >
            <component-view :columnSpan="columnSpan" :column="childColumn" :formData="formData" />
            <template v-for="son in childColumn.controls">
              <template v-if="formData[childColumn.name] === son.value">
                <template
                  v-for="(sonColumn, sonColumnIndex) in son.showCondition"
                  :key="sonColumnIndex + 'sonColumnView'"
                >
                  <component-view
                    :columnSpan="columnSpan"
                    :column="sonColumn"
                    :formData="formData"
                  />
                </template>
              </template>
            </template>
          </template>
        </template>
      </template>
    </template>
  </el-row>
</template>
<script setup>
// TODO 通过嵌套实现组件联动效果的功能
import ComponentView from './column/component-view.vue'

const props = defineProps({
  columnList: {
    type: Array,
    default: () => []
  },
  formData: {
    type: Object,
    default: () => {}
  },
  columnSpan: {
    type: Number,
    default: 24
  },
  componentExampleClick: {
    type: Function,
    default: () => {}
  }
})
</script>
<style scoped></style>
