<!--简单文本框-->
<template>
  <el-form-item :label="column.title" :prop="column.name" :rules="rules">
    <el-input v-model="value" :name="column.name"> </el-input>
  </el-form-item>
</template>
<script>
export default {
  props: {
    column: {
      type: [Object],
      default: () => {}
    },
    data: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      columnName: '',
      rules: [
        {
          required: this.column.required,
          message: '请输入' + this.column.title,
          trigger: ['blur', 'change']
        }
      ]
    }
  },
  computed: {
    value: {
      get: function () {
        return this.data
      },
      set: function (val) {
        this.$emit('update:data', val)
      }
    }
  }
}
</script>
