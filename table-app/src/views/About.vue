<template>
  <div class="about">
    <h1>This is a form app about page</h1>
    <button @click="test">清除token</button>
    <button @click="getToken">token</button>
  </div>
</template>
<script>
// import actions from '../Actions'
import GoDB from 'godb'
export default {
  data () {
    return {

    }
  },
  created () {
    console.log('aehyok')
    const db = new GoDB('aehyok')
    const table = db.table('131000-1')
    table.get({ id: 1 })
    // const data = {
    //   name: 'lqm',
    //   age: 32,
    //   gender: 'man'
    // };
    for (let i = 1; i < 131000; i++) {
      // table.add({
      //   id: i,
      //   name: 'lqm',
      //   age: 32 + i,
      //   gender: 'man',
      //   ceL: `与之相随，小程序的开发生态也在蓬勃发展，从最初的微信原生开发，到wepy、mpvue、taro、uni-app等框架依次出现，从刀耕火种演进为现代化开发，生态越来越丰富。
      //       选择多了，问题也就来了，开发小程序，该用原生还是选择三方框架？
      //       首先，微信原生开发的槽点大多集中如下：
      //       原生开发对Node、预编译器、webpack支持不好，影响开发效率和工程构建流程
      //       微信定义了一个不伦不类的语法，不如正经学vue、react，学会了全端通用，而不是只为小程序。小程序的setData和类似template模式像是React和Vue的混合体，却丢了React的灵活和Vue的响应式。
      //       你要有长期跟踪和更新报告的能力，避免半年后沦为过期信息
      //       换言之：评测要想真，功夫得做深！
      //       uni-app团队花费2个周时间完成本报告，并坚持每个季度更新一次本评测报告。目前更新时间为2019年5月。
      //       本文从面向用户、面向开发者两大维度七大细项，对微信原生及主流的wepy、mpvue、taro、uni-app开发框架进行横向对比，希望给开发者在小程序框架选型时提供一种参考思路。本文基于各框架官网可采集到的公开数据及真实测试数据，希望客观公正地评价各个框架的现状和优劣。但宥于利益相关，本文的观点很可能是带有偏向性的，大家可以带着批判的眼光来看待，如发现本文中有任何评测失真，欢迎在这里报 issuse。
      //       面向用户、面向开发者维度，具体包括：
      //       用户：提供完整的业务实现，并保证高性能体验
      //       开发者：平缓的学习曲线、现代开发体验（工程化）、高效的社区支持、活跃的开发迭代、多端复用
      //       软件开发，首要目标是向用户提供完整、闭环的业务功能。
      //       在web开发中，如果vue、react等框架的使用，造成开发者无法操作浏览器提供的所有api，那这样的框架肯定是不成熟的。小程序开发也一样，任何开发框架，都不能限制底层的api调用。`
      // })
      // console.log(table.get({ id: i }), i)
    }

    // table.add(data) // 增
    //   .then(luke => user.get(luke.id)) // 查，等价于 user.get({ id: luke.id })
    //   .then(luke => user.put({ ...luke, age: 23 })) // 改
    //   .then(luke => user.delete(luke.id)); // 删
    console.log('created')
    // actions.onGlobalStateChange(state => {
    //   const { token } = state
    //   // 未登录 - 返回主页
    //   if (!token) {
    //     console.log('未检测到登录信息！')
    //     // this.$message.error('未检测到登录信息！')
    //     // return this.$router.push('/')
    //   }
    //   this.getUserInfo(token)
    // }, true)
  },
  methods: {
    getUserInfo (token) {
      console.log('根据token获取到了用户信息', token)
    },
    getToken () {
      // actions.setGlobalState({
      //   token: '12345678910-table'
      // })
    },
    test () {
      // actions.setGlobalState({
      //   token: ''
      // })
    }
  }

}
</script>
