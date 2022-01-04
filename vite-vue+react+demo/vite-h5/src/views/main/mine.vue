<template>mine</template>
<script lang="ts" setup>
  const load = () => {
    console.log('load call');
  };

  const obj = {
    load: load,
  };

  if ('load' in obj) {
    console.log('in');
  } else {
    console.log('not in');
  }
</script>
