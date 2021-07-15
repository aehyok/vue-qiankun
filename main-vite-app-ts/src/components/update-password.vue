<template>
  <el-dialog
    title="修改密码"
    v-model="visible"
    width="40%"
    :close-on-click-modal="closeOnClickModal"
    :append-to-body="true"
    @close="close"
  >
    <el-form :model="form" :rules="rules" ref="updateForm" label-width="100px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          v-model="form.oldPassword"
          type="password"
          show-password
          placeholder="请输入原密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          type="password"
          placeholder="输入密码6位以上"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input v-model="form.checkPwd" type="password" placeholder="再次输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submitPassword">确定修改</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue"
import { changedSelf, logout } from "../services"
import { successMessage } from "../utils/message"
import { useRouter } from "vue-router"
import md5 from "js-md5"
export default defineComponent({
  name: "UpdatePassword",
  props: {
    updateDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  emits: ["cancel"],
  setup(props, context) {
    const router = useRouter()
    const updateForm = ref(null)
    const state = reactive({
      visible: props.updateDialogVisible,
      closeOnClickModal: false,
      loading: false,
      form: {
        oldPassword: "",
        newPassword: "",
        checkPwd: ""
      },
      rules: []
    })

    // const checkPsdVal = (_rules, value, callback) => {
    //   const rule = /^(?![^a-zA-Z]+$)(?!\D+$).{8,16}/
    //   if (!rule.test(value)) {
    //     callback(new Error('请输入8-16位字母+数字组合新密码'))
    //   } else {
    //     callback()
    //   }
    // }
    const checkPsdVal = (_rules, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不够，请重新输入"))
      } else {
        callback()
      }
    }

    const checkPassword = (_rules, value, callback) => {
      if (value !== state.form.newPassword) {
        callback(new Error("两次密码输入不一致"))
      } else {
        callback()
      }
    }
    const rules: any = {
      oldPassword: [
        {
          required: true,
          message: "请输入原密码",
          trigger: ["blur"]
        }
      ],
      newPassword: [
        {
          required: true,
          message: "请输入新密码",
          trigger: ["blur"]
        },
        {
          validator: checkPsdVal,
          trigger: ["blur"]
        }
      ],
      checkPwd: [
        {
          required: true,
          message: "请再次输入新密码",
          trigger: ["blur"]
        },
        {
          validator: checkPsdVal,
          trigger: ["blur"]
        },
        {
          validator: checkPassword,
          trigger: ["blur"]
        }
      ]
    }

    const close = () => {
      context.emit("cancel")
      // updateForm.value.reset
    }
    const changedSelfApi = () => {
      changedSelf({
        password: md5(state.form.newPassword)
      }).then((res: any) => {
        if (res.code === 200) {
          successMessage("修改成功,请重新登录")
          close()
          loginOutApi()
        }
      })
    }
    const loginOutApi = () => {
      logout().then((res: any) => {
        console.log("登出成功", res)
        localStorage.clear()
        router.push("/login")
      })
    }
    const submitPassword = () => {
      updateForm.value.validate(async (valid) => {
        if (valid) {
          changedSelfApi()
        }
      })
    }

    return {
      ...toRefs(state),
      close,
      submitPassword,
      rules,
      updateForm
    }
  }
})
</script>
<style lang="scss" scoped>
.form-row {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}

.verCodeImg {
  margin-left: 10px;
  display: flex;
  align-items: center;
  .svgbox {
    position: relative;
    top: 6px;
  }
  img {
    height: 100%;
  }
}
</style>