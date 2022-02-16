<template>
  <div>我的账单</div>
</template>
<script setup>
// 代码延时
const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

async function sleepAsync() {
  console.log('1')
  await sleep(10000)
  console.log('2')
  // return res
}

sleepAsync()
</script>