export const autoComponentRegister = (app) => {
  const listView = []
  const register = (componentsContext) => {
    console.log(componentsContext, 'componentsContext')
    componentsContext.keys().forEach((filePath) => {
      const fileName = filePath.split('/')[1].split('.')[0]

      const componentConfig = componentsContext(filePath)
      if (/.vue$/.test(filePath)) {
        app.component(fileName, componentConfig.default)
        listView.push(fileName)
      } else {
        app.use(componentConfig)
      }
    })
  }

  // form表单组件
  const formItem = require.context('../components/form/column/item-view', true, /View.vue$/)

  // form表单组合组件
  const formCompose = require.context('../components/form/column/compose-view', true, /View.vue$/)

  // 列表详情组件
  const detail = require.context('../components/detail/column', true, /.vue$/)

  // 列表查询条件组件
  const search = require.context('../components/search/column', true, /.vue$/)

  const view = [formItem, formCompose, detail, search]
  view.forEach((item) => {
    register(item)
  })
  window.componentListView = listView
}
