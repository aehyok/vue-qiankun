<template>
  <el-dialog
    title="找回密码"
    width="40%"
    v-model="visible"
    :close-on-click-modal="closeOnClickModal"
    @close="close"
  >
    <el-form :model="form" :rules="rules" ref="findForm" label-width="100px">
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="form.mobile" type="mobile" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="form.userType" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机验证码" prop="codeVal">
        <el-input placeholder="请输入4位手机验证码" v-model="form.codeVal">
          <template #append>
            <el-button @click.prevent="sendCodeVal" type="primary" v-show="show"
              >获取手机验证码</el-button
            ><span v-show="!show" class="count">{{ count }} s</span></template
          >
        </el-input>
      </el-form-item>
      <el-form-item label="设置新密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submitPassword">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import md5 from 'js-md5'
import { warnMessage, successMessage } from '../../utils/message'
import { changedForMobile, sendMobileValidateCode } from '../../services'

// 手机号码验证
const validateMobile = (rules: any, value: any, callback: any) => {
  if (!value) {
    callback()
  }
  const reg = /^1[3456789]\d{9}$/
  if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}

export default defineComponent({
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel'],
  setup(props, context) {
    const findForm = ref(null)

    const validatePass = (_rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value !== '') {
          findForm.value?.validateField('mobile')
        }
        callback()
      }
    }

    const validateAccount = (_rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }

    const validatorVerCode = (_rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }

    const validatorType = (_rule: any, value: any, callback: any) => {
      if (value === null) {
        callback(new Error('请选择用户类型'))
      } else {
        callback()
      }
    }

    const state = reactive({
      visible: props.dialogVisible,
      options: [
        { label: '村委', value: 2 },
        { label: '政务', value: 3 },
        { label: '企业', value: 4 }
      ],

      rules: {
        userType: [{ validator: validatorType, trigger: ['blur', 'change'] }],
        password: [{ validator: validatePass, trigger: ['blur', 'change'] }],
        mobile: [
          { validator: validateAccount, trigger: ['blur', 'change'] },
          { validator: validateMobile, trigger: ['blur', 'change'] }
        ],
        codeVal: [{ validator: validatorVerCode, trigger: ['blur', 'change'] }]
      },

      show: true,
      closeOnClickModal: false,
      form: {
        mobile: '',
        codeVal: '',
        password: '',
        userType: null
      },
      timer: null,
      count: 0
    })

    const submitPassword = (): void => {
      findForm.value.validate((valid) => {
        if (valid) {
          changedForMobile({
            mobile: state.form.mobile,
            type: state.form.userType,
            codeVal: state.form.codeVal,
            password: md5(state.form.password).toLocaleLowerCase()
          }).then((res: any) => {
            if (res?.code === 200) {
              successMessage('密码修改成功！')
              findForm.value.resetFields()
              context.emit('cancel')
            }
          })
        }
      })
    }

    const close = (): void => {
      context.emit('cancel')
    }

    const sendCodeVal = async () => {
      // changedForMobile
      if (!state.form.mobile) {
        warnMessage('请填入正确的手机号码')
        return false
      }
      if (!state.form.userType) {
        warnMessage('请选择用户类型')
        return false
      }
      const res: any = await sendMobileValidateCode({
        mobile: state.form.mobile,
        type: state.form.userType
      })
      if (res.code === 200) {
        successMessage('短信发送成功！')
        const TIME_COUNT = 60 // 更改倒计时时间
        if (!state.timer) {
          state.count = TIME_COUNT
          state.show = false
          state.timer = setInterval(() => {
            if (state.count > 0 && state.count <= TIME_COUNT) {
              state.count--
            } else {
              state.show = true
              window.clearInterval(state.timer) // 清除定时器
              state.timer = {}
            }
          }, 1000)
        }
        return false
      }
    }
    return {
      ...toRefs(state),
      submitPassword,
      close,
      findForm,
      sendCodeVal
    }
  }
})
</script>
