
<template>
  {{message}}
</template>
<script lang="ts" setup>
const getData = async() => {
  await sleep(3000)
  return 'hello Message'
}

const sleep = (time: number) => {
  return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve()
      }, time);
  })
}

const message = await getData()


</script>
