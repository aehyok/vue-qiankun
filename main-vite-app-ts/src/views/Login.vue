<template>
  <div class="login">
    <info :ruleForm="contextInfo" @on-behavior="onLogin" @refreshVerify="refreshVerify" />
  </div>
</template>

<script lang="ts">
import { reactive, onBeforeMount } from "vue";
import info, { ContextProps } from "../components/info/index.vue";
import { loginList } from '../services/index';
import { useRouter } from "vue-router";
import { storageSession } from "../utils/storage";
import { warnMessage, successMessage } from "../utils/message";

export default {
  name: "login",
  components: {
    info
  },
  setup() {
    const router = useRouter();

    async function test() {
        console.log(1)
        return {
          svg: {}
        }
    }
    async function test1({username: String, password, verify}) {
        console.log(1)
        return {
          code: 0,
          info: '',
          accessToken: ''
        }
    }
    // 刷新验证码
    const refreshGetVerify = async () => {
      let { svg } = await test();
      contextInfo.svg = svg;
    };

    const contextInfo: ContextProps = reactive({
      userName: "",
      passWord: "",
      verify: null,
      svg: null
    });

    const toPage = (info: Object): void => {
      storageSession.setItem("info", info);
      router.push("/");
    };

    // 登录
    const onLogin = async () => {
      let { userName, passWord, verify } = contextInfo;
      let { code, info, accessToken } = await test1({
        username: userName,
        password: passWord,
        verify: verify
      });
      code === 0
        ? successMessage(info) &&
          toPage({
            username: userName,
            accessToken
          })
        : warnMessage(info);
    };

    const refreshVerify = (): void => {
      refreshGetVerify();
    };

    onBeforeMount(() => {
      // refreshGetVerify();
      loginList().then(res => {
        console.log(res, '-loginList-')
      })
    });

    return {
      contextInfo,
      onLogin,
      router,
      toPage,
      refreshVerify
    };
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background: url("../assets/bg.png") no-repeat center;
  background-size: cover;
}
</style>
