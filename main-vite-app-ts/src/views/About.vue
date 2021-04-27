<template>
  about
</template>
<script>
import { getCurrentInstance} from 'vue';
import {checkPhoneFun } from '../../../common/init.js'
export default {
  setup(props, context) {
    console.log(props)
    const {ctx } = getCurrentInstance();
      ctx.$filters.currencyUSD('sssss')

        let phone = '18620342685'
        let check = checkPhoneFun(phone)
        console.log(check ,'手机号检测');
  },
}
</script>
