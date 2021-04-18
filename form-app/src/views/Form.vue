<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form :model="formConfig.formData" label-width="120px" ref="refForm">
          <FormView
            :columnList="formConfig.formListItem"
            :formData="formConfig.formData"
            :columnSpan="formConfig.cols"
          />
        </el-form>
      </el-col>
      <el-col :span="12">
        <v-jsoneditor
          v-model="formConfig"
          :options="options"
          :plus="false"
          height="800px"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-button
        size="large"
        type="primary"
        style="margin-left: 120px;height: 50px;"
        @click="submitForm"
        native-type="submit"
      >
        提交
      </el-button>
    </el-row>
  </div>
</template>
<script>
import FormView from 'aehyok-form'
// import { getContentTypeList } from '@/mock/api'
import VJsoneditor from 'v-jsoneditor'

export default {
  components: {
    FormView,
    VJsoneditor
  },
  created () {
    console.log(this.$router, 'this.$router', 'form-app')
  },
  methods: {
    submitForm () {
      this.$refs.refForm.validate(valid => {
        if (valid) {
          console.log(valid, 'this.valid')
        } else {
          console.log(valid, '验证失败')
        }
        return false
      })
    }
  },
  data () {
    return {
      options: { mode: 'code', mainMenuBar: false },
      formConfig: {
        cols: 24,
        formListItem: [
          {
            name: 'name1',
            type: 'text',
            title: '栏目标题',
            required: true // 必填
          },
          {
            name: 'name',
            type: 'text',
            title: '栏目名称'
          },
          {
            name: 'image11',
            type: 'imageTypeView',
            title: '头像11'
          },
          {
            name: 'total',
            type: 'number',
            title: '栏目数量',
            required: true
          },
          {
            name: 'count',
            type: 'number',
            title: '浏览数量'
          },
          {
            name: 'descript',
            type: 'textarea',
            title: '备注',
            required: true
          },
          {
            name: 'content',
            type: 'textarea',
            title: '内容'
          },
          {
            name: 'startDate',
            type: 'date',
            title: '开始日期',
            required: true
          },
          {
            name: 'endDate',
            type: 'date',
            title: '结束日期'
          },
          {
            name: 'isValid',
            type: 'switch',
            title: '是否有效'
          },
          {
            name: 'isExpired',
            type: 'switch',
            title: '是否过期',
            required: true
          },
          {
            name: 'type',
            type: 'radio',
            title: '栏目类型',
            controls: [
              {
                value: 1,
                showCondition: [
                  {
                    name: 'show',
                    type: 'radio',
                    title: '测试类型',
                    required: true
                  },
                  {
                    name: 'image1',
                    type: 'image',
                    title: '文件'
                  }
                ]
              },
              {
                value: 2,
                showCondition: [
                  {
                    name: 'isValids',
                    type: 'switch',
                    title: '是否有效'
                  }
                ]
              }
            ]
          },
          {
            name: 'requireType',
            type: 'radio',
            title: '图文类型',
            required: true
          },
          {
            name: 'range',
            type: 'checkbox',
            title: '发布范围',
            required: true
          },
          {
            name: 'dateRange',
            type: 'daterange',
            title: '日期范围'
          },
          {
            name: 'creType',
            type: 'select',
            title: '证件类型'
          },
          {
            name: 'image',
            type: 'image',
            title: '头像'
          }
        ],
        formData: {
          name: '主菜单栏目',
          total: null,
          count: null,
          createDate: 1606730360386,
          type: 1,
          requireType: undefined,
          creType: '',
          range: [],
          isExpired: false,
          isValid: true
        }
      }
    }
  }
}
</script>
<style scoped></style>
