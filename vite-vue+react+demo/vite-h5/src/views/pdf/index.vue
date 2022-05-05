<template>
11111
</template>
<script lang="ts" setup>
    // let obj = {}
    
    // console.log(proxy, 'proxy')
    // console.log(obj, 'obj')

    // proxy.a = 10

    // console.log(obj)
    // console.log(proxy, 'proxy')

    // let handle = {
    //     get(tt: any, key: string, receiver: any) {
    //         console.log('get', key)
    //         if(key in tt) {
    //             return Reflect.get(tt, key, receiver)
    //         } else {
    //             return null
    //         }
            
    //     },
    //     set(tt: any, key: string, value: any, receiver: any) {
    //         console.log('set', key, value)
    //         return Reflect.set(tt, key, value, receiver)
    //     }
    // }

    // let proxy = new Proxy(obj, handle)
    // proxy.a = 10
    // proxy.a ++
    // console.log(proxy.a, 'obj.a')


        let obj={a:1}
    let proxy=new Proxy(obj,{
        get(target,proxy){
            return 34;
        }
    });
    proxy.b=50;
    proxy.c=60;
    obj.d=70;
    console.log(obj);
    console.log(proxy);
    console.log(proxy.d);
    console.log(obj.d);

</script>