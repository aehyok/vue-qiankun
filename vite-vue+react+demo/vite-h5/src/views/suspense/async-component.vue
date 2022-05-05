
<template>
  <div>
  {{message}}
  <van-button @click="openClick">open dialog</van-button>

  <teleport to="body">
    <van-dialog v-model:show ="show" title="弹窗">
      <div>Modal</div>
    </van-dialog>
  </teleport>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, Teleport } from 'vue';
import { Dialog, Button as VanButton } from 'vant'
const VanDialog = Dialog.Component;
const getData = async() => {
  await sleep(3000)
  message.value = 'hello Message'
  console.log('getData')
  return 'hello Message'
}

const show = ref(false)
onMounted(()=> {
  console.log('asyncComponent onMounted');

})

const openClick = () => {
  console.log('opem');

  show.value = true
}
const sleep = (time: number) => {
  return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve()
      }, time);
  })
}

const message = ref('')

await getData()


</script>
