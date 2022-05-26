import NProgress from '../utils/progress'

// TODO 此处无法通过引用 import { useStore } from 'vuex'
import { useSystemMenu } from '@/store/index'

export const useRoute = (router: any) => {
  const store = useSystemMenu()
// const childrenPath = ['webpack-app', 'map-app', 'form-app', 'table-app']
// 获取子模块路由前缀 判断是否为子路由
const childrenPath = store.systemList.map((item: any) => {
  return item.systemId
})
console.log(childrenPath, 'childrenPath')

router.beforeEach((to: any, _from: any, next: any) => {
  NProgress.start()

  console.log(store.systemList, '----useStore----')
  if (to.path === '/login' || to.path === '/init-password') {
    next()
    return false
  }
  if (!localStorage.getItem('token')) {
    next('/login')
    return false
  }
  if (to.name) {
    next()
    return false
  }
  if (childrenPath.some((item) => to.path.includes(item))) {
    next()
    console.log('child')

    return false
  }
  // 如果找不到路由跳转到404
  next('/404')
  return false
})

// 页面进入之后
router.afterEach(() => {
  NProgress.done()
})
}
