<template>
  <el-col :span="columnSpan" style="width:100%;">
    <!--不包含View则是npm组件库中的-->
    <component
      v-if="
        column && column.type &&
        !column.type.includes('View') && 
        !column.type.includes('textSelect')
      "
      :is="column.type + 'View'"
      :column="column"
      :formData="formData"
      v-model:data="formData[column.name]"
      :columnSpan="columnSpan"
    />

    <component
      v-if="column.type.includes('textSelect')"
      :is="column.type + 'View'"
      :column="column"
      :formData="formData"
      v-model:leftValue="formData[column.text.name]"
      v-model:rightValue="formData[column.select.name]"
      :columnSpan="columnSpan"
    />

    <!--可单独自定义录入组件-->
    <component
      v-if="column.type.includes('View')"
      :is="column.type || registerComponent"
      :column="column"
      :formData="formData"
      v-model:data="formData[column.name]"
      :columnSpan="columnSpan"
    />
  </el-col>
</template>
<script >
import { createApp, defineComponent } from 'vue'
// import textView from './item-view/textView.vue'
// import textareaView from './item-view/textareaView.vue'
// import numberView from './item-view/numberView.vue'
// import dateView from './item-view/dateView.vue'
// import radioView from './item-view/radioView.vue'
// import checkboxView from './item-view/checkboxView.vue'
// import daterangeView from './item-view/daterangeView.vue'
// import selectView from './item-view/selectView.vue'
// import imageView from './item-view/imageView.vue'
// import videoView from './item-view/videoView.vue'
// import staticView from './item-view/staticView.vue'
// import switchView from './item-view/switchView.vue'
// import citySelectView from './item-view/citySelectView.vue'
// import editorView from './item-view/editorView.vue'

// // 组合式录入控件
// import textSelectView from './compose-view/textSelectView.vue'
// import numberSelectView from './compose-view/numberSelectView.vue'
export default defineComponent({
  name: 'formView',
  components: {
    // textView,
    // textareaView,
    // numberView,
    // dateView,
    // daterangeView,
    // switchView,
    // radioView,
    // checkboxView,
    // selectView,
    // imageView,
    // videoView,
    // staticView,
    // editorView,
    // textSelectView,
    // numberSelectView,
    // citySelectView
  },
  props: {
    column: {
      type: Object,
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
  },
  setup(props, context) {
    // const $context = require.context("./item-view", true, /.vue$/)
    // console.log($context, '$context--------------')

    console.log(props.column, 'setup.componentView')
    if (props.column.type === 'TextSelect') {
      console.log('text-----------------select')
      console.log(props.formData, props.column)
    }

    const registerComponent = (componentName) => {
      console.log(componentName, 'this.componentName')
      return createApp(componentName.default)
    }

    const isIncludes = () => {
      console.log(["textSelect", "numberSelect"].includes(column.type), 'text-number----select')
      return ["textSelect", "numberSelect"].includes(column.type)
    }
    // const compose = computed({
    //   get: function() {
    //     let array = []
    //     console.log(props, 'compose')
    //     array.push({"text":props.formData[column.text.name]})
    //     array.push({"select": props.formData[column.text.select]})
    //     return array
    //   }
    // })

    return {
      isIncludes
    }
  },
})
</script>
<style scoped></style>
