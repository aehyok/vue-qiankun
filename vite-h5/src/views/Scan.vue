<template>
  <div class="scan">
    <div class="nav">
      <a class="close" @click="() => $router.go(-1)"></a>
      <p class="title">Scan QRcode</p>
    </div>
    <div class="scroll-container">
      <Scaner
        v-on:code-scanned="codeScanned"
        v-on:error-captured="errorCaptured"
        :stop-on-scanned="true"
        :draw-on-found="true"
        :responsive="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import Scaner from '../components/Scaner.vue';

  export default {
    name: 'Scan',
    components: {
      Scaner,
    },
    data() {
      return {
        errorMessage: '',
        scanned: '',
      };
    },
    methods: {
      codeScanned(code) {
        this.scanned = code;
        setTimeout(() => {
          alert(`扫码解析成功: ${code}`);
        }, 200);
      },
      errorCaptured(error) {
        switch (error.name) {
          case 'NotAllowedError':
            this.errorMessage = 'Camera permission denied.';
            break;
          case 'NotFoundError':
            this.errorMessage = 'There is no connected camera.';
            break;
          case 'NotSupportedError':
            this.errorMessage = 'Seems like this page is served in non-secure context.';
            break;
          case 'NotReadableError':
            this.errorMessage = "Couldn't access your camera. Is it already in use?";
            break;
          case 'OverconstrainedError':
            this.errorMessage = "Constraints don't match any installed camera.";
            break;
          default:
            this.errorMessage = 'UNKNOWN ERROR: ' + error.message;
        }
        console.error(this.errorMessage);
        alert('相机调用失败');
      },
    },
    mounted() {
      var str = navigator.userAgent.toLowerCase();
      var ver = str.match(/cpu iphone os (.*?) like mac os/);
      if (ver && ver[1].replace(/_/g, '.') < '10.3.3') {
        alert('相机调用失败');
      }
    },
  };
</script>

<style lang="css" scoped>
  .scan {
    height: 100%;
    width: 100%;
  }
  .scan .nav {
    width: 100%;
    height: 48px;
    line-height: 48px;
    position: fixed;
    top: 0;
    left: 0;
  }
  .scan .nav .title {
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: #ffffff;
  }
  .scan .nav .close {
    display: inline-block;
    height: 22px;
    width: 22px;
    background: url('../assets/back.png') no-repeat center;
    background-size: auto 100%;
    position: absolute;
    left: 16px;
    top: 14px;
  }
</style>
