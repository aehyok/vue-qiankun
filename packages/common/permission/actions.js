export const actionMap = {
  add: 1,
  delete: 2,
  update: 4,
  detail: 8,
  import: 16,
  export: 32,
  reset: 64
}

export const actionDisplay = {
  1: '新增', // 新增（标记、标绘、发布）
  2: '删除',
  4: '修改', // 修改（编辑、禁用、启用、设为户主，移除、办理）
  8: '查看',
  16: '导入',
  32: '导出',
  64: '重置密码'
}

export function userPermission(app) {
  app.directive('permission', {
    mounted(el, binding) {
      let local = JSON.parse(localStorage.getItem('vuex') || '{}')
      console.log(local.currentMenu, 'local.currentMenu')
      // 获取当前菜单的permission
      let permission = 49
      let hasPermission = permission & actionMap[binding.value]
      if (hasPermission === 0) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
