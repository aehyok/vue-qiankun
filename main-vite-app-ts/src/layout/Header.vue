<template>
  <div class="app-header">
    <div class="header-name">
      <span>数字乡村支撑平台</span>
      <div style="margin-left: 90px">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#2bae85"
          text-color="#fff"
          active-text-color="#fff"
          :router="true"
        >
          <el-menu-item v-for="m in permitedRoutes" :index="m.path" :key="m.meta.title">{{
            m.meta.title
          }}</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="user">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="color: #fff">
          <span>admin</span>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">修改密码</el-dropdown-item>
            <el-dropdown-item command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改密码"
      v-model="resetPasswordVisible"
      width="40%"
      :close-on-click-modal="false"
      :append-to-body="true"
      @close="close"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px">
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
            placeholder="密码必须包含字母和数字,长度为8-16"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input
            v-model="form.checkPwd"
            type="password"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submitPassword('ruleForm')">确定修改</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
  import { useRoute } from 'vue-router'

  export default defineComponent({
    setup() {
      const ruleForm = ref(null)

      const checkPsdVal = (rules, value, callback) => {
        const rule = /^(?![^a-zA-Z]+$)(?!\D+$).{8,16}/
        if (!rule.test(value)) {
          callback(new Error('请输入8-16位字母+数字组合新密码'))
        } else {
          callback()
        }
      }
      const state = reactive({
        permitedRoutes: [],
        rules: {},
        form: {
          oldPassword: '',
          newPassword: '',
          checkPwd: ''
        },
        activeIndex: '/form-app',
        resetPasswordVisible: false
      })
      state.permitedRoutes = [
        {
          path: '/form-app',
          name: 'organizationManage',
          meta: {
            title: '组织管理',
            hidden: false,
            permissions: 7
          }
        },
        {
          path: '/table-app',
          name: 'baseManage',
          meta: {
            title: '基础管理',
            hidden: false,
            permissions: 4
          }
        }
      ]
      const checkPassword = (rules, value, callback) => {
        if (value !== state.form.newPassword) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      }
      state.rules = {
        oldPassword: [
          {
            required: true,
            message: '请输入原密码',
            trigger: ['blur']
          }
        ],
        newPassword: [
          {
            required: true,
            message: '请输入新密码',
            trigger: ['blur']
          },
          {
            validator: checkPsdVal,
            trigger: ['blur']
          }
        ],
        checkPwd: [
          {
            required: true,
            message: '请再次输入新密码',
            trigger: ['blur']
          },
          {
            validator: checkPsdVal,
            trigger: ['blur']
          },
          {
            validator: checkPassword,
            trigger: ['blur']
          }
        ]
      }

      const handleSelect = (key, keyPath) => {
        console.log(key, keyPath)
      }
      const goMenu = (routerList) => {
        console.log(routerList)
        // this.$store.commit('permission/setMenusAll')
      }

      // 退出二次确认框
      const checkLoginOut = () => {
        this.$confirm('请问是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            loginOut()
          })
          .catch(() => {
            return false
          })
      }

      const handleCommand = (command) => {
        console.log('a修改密码')
        if (command === 'a') {
          console.log('a修改密码')
          state.resetPasswordVisible = true
        } else {
          checkLoginOut()
        }
      }
      // 退出登录
      const loginOut = async (type) => {
        console.log(type)
        //     // const res = await logout({
        //     //   token: this.user.token,
        //     // })
        // this.$message.success('您已安全退出')
        // this.$store.commit('permission/setMenus', [])
        // localStorage.removeItem('loginInfo')
        // this.$router.push('/login')
      }
      const submitPassword = () => {
        ruleForm.validate(async (valid) => {
          if (valid) {
            const res = {}
            //  await modifyPassword({
            //   newPassword: this.form.newPassword,
            //   oldPassword: this.form.oldPassword,
            // })
            // if (res.code === 200) {
            console.log('修改成功！', res)
            // this.$message.success('修改成功，请重新登录！')
            loginOut('resetPassort')
            // }
          }
        })
      }
      const close = () => {
        state.resetPasswordVisible = false
        // this.$refs.ruleForm.resetFields()
      }
      const activeMenu = computed(() => {
        const route = useRoute()
        return route.matched[0].path
      })
      return {
        ...toRefs(state),
        close,
        submitPassword,
        loginOut,
        checkLoginOut,
        handleCommand,
        goMenu,
        handleSelect,
        checkPassword,
        checkPsdVal,
        activeMenu
      }
    }
  })

  // watch: {
  //   $route: {
  //     handler (to) {
  //       const item = this.permitedRoutes.find(item => {
  //         if (to.matched[0]) {
  //           return to.matched[0].path === item.path
  //         }
  //         return false
  //       })
  //       this.$store.commit('permission/setLeftMenus', item.children)
  //     },
  //     immediate: true
  //   }
  // }
</script>
<style lang="scss" scoped>
  .app-header {
    display: flex;
    justify-content: space-between;
    height: 60px;
    .header-name {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }

    .user {
      display: flex;
      align-items: center;
    }
  }
  .head-menu li {
    display: inline-block;
    margin-left: 20px;
    font-size: 16px;
  }
  :deep(.el-menu.el-menu--horizontal) {
    border-bottom: 0;
  }
  :deep(.el-menu--horizontal > .el-menu-item) {
    height: auto;
    line-height: 30px;
    margin-left: 30px;
  }
</style>
