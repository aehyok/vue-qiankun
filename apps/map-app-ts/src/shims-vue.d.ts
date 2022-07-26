/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  __POWERED_BY_QIANKUN__: any
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: any

}
