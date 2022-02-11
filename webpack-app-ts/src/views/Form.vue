<template>
    <el-row :gutter="20">
        <el-col :span="12">
        <el-form
            :model="state.formConfig.formData"
            label-width="120px"
            ref="formDom"
        >
            <FormView
            :columnList="state.formConfig.formListItem"
            :formData="state.formConfig.formData"
            v-model:columnSpan="state.formConfig.cols"
            />
        </el-form>
        </el-col>
        <el-col :span="12">
        <vue-json-editor
            v-model:value="state.formConfig"
            :options="state.options"
            :plus="false"
            height="800px"
            @changeModel="changeModel"
        />
        </el-col>
    </el-row>
    <el-row>
        <el-button
            size="large"
            type="primary"
            style="margin-left: 120px; height: 50px"
            @click="submitForm"
            native-type="submit"
        >
        提交
        </el-button>
    </el-row>
</template>
<script setup>
import { reactive, watch, ref } from "vue";
import FormView from "../../../common/components/form/index.vue";
import VueJsonEditor from '../../../common/components/json/vue-json-editor.vue'
let formDom = ref(null);

const state = reactive({
  options: {
    mode: "code",
    mainMenuBar: false
  },
  show: true,
  formConfig: {
    cols: 24,
    formListItem: [
      {
        name: "name1",
        type: "text",
        title: "栏目标题",
        required: true // 必填
      },
      {
        name: "name",
        type: "text",
        title: "栏目名称"
      },
      {
        name: "total",
        type: "number",
        title: "栏目数量",
        required: true
      },
      {
        name: "count",
        type: "number",
        title: "浏览数量"
      },
      {
        name: "descript",
        type: "textarea",
        title: "备注",
        required: true
      },
      {
        name: "content",
        type: "textarea",
        title: "内容"
      },
      {
        name: "startDate",
        type: "date",
        title: "开始日期",
        required: true
      },
      {
        name: "endDate",
        type: "date",
        title: "结束日期"
      },
      {
        name: "isValid",
        type: "switch",
        title: "是否有效"
      },
      {
        name: "isExpired",
        type: "switch",
        title: "是否过期",
        required: true
      },
      {
        name: "type",
        type: "radio",
        dictionary: [
          { code: 1, name: "横版栏目" },
          { code: 2, name: "竖版栏目" }
        ],
        title: "栏目类型"
      },
      {
        name: "requireType",
        type: "radio",
        dictionary: [
           { code: 1, name: "类型一" },
           { code: 2, name: "类型2二" }
        ],
        title: "图文类型",
        required: true,
        ifshow: (data) => {
            console.log(data, 'ifshow--ifshow')
            return data.type === 1
        },
      },
      {
        name: "range",
        type: "checkbox",
        title: "发布范围",
        dictionary: [
           { code: 1, name: "范围1一" },
           { code: 2, name: "范围2二" }
        ],
        required: true,
        ifshow: (data) => {
            console.log(data, 'ifshow--ifshow')
            return data.requireType === 2
        },
      },
      {
        name: "dateRange",
        type: "daterange",
        title: "日期范围"
      },
      {
        name: "creType",
        type: "select",
        // multiple: true,
        dictionary: [
           { code: 1, name: "身份证" },
           { code: 2, name: "居住证" }
        ],
        title: "证件类型"
      },
      {
        name: "image",
        type: "image",
        title: "头像"
      }
    ],
    formData: {
      name: "主菜单栏目",
      total: null,
      count: null,
      createDate: 1606730360386,
      type: 2,
      requireType: undefined,
      creType: "",
      range: [],
      isExpired: false,
      isValid: true
    }
  }
});
const submitForm = () => {
  console.log(state.formConfig.formData, "formData");
  formDom.value.validate((valid) => {
    if (valid) {
      console.log(valid, "this.valid");
    } else {
      console.log(valid, "验证失败");
    }
    return false;
  });
};

const changeModel = (value) => {
    console.log(value,'changeModel')
    state.formConfig = value
}
watch(state,
    ()=> (newValue, oldValue) => {
    console.log(state.formConfig.formListItem,'ssssssssssssssss')
},{
    immediate: true,
    deep: true
})

</script>
<style scoped></style>
