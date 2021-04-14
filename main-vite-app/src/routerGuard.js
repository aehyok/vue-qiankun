import router from '@/router'

router.beforeEach((to, from, next) => {
  if (to.name) {
    // 有 name 属性，说明是主应用的路由
    next()
  }
  if (childrenPath.some((item) => to.path.includes(item))) {
    next()
  }
  next({ name: '404' })
})
