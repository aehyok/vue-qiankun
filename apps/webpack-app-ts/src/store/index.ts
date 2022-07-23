import { createStore } from 'vuex'

// 为 store state 声明类型
export interface State {
  formListItem: any[]
  currentComponent: {
    rules: any[]
  }
}

export default createStore<State>({
  state: {
    // 整个字段配置列表
    formListItem: [],
    //当前选中的组件
    currentComponent: {
      rules: []
    }
  },
  mutations: {
    // 调整组件顺序
    updateComponentList(state, list) {
      state.formListItem = list
    },
    // 拖拽一个组件到右侧
    addComponent(state, component) {
      state.formListItem.push(component)
    },
    // 设置当前选中的组件
    setCurrentComponent(state, component) {
      state.currentComponent = component
    },
    // 给当前组件添加验证规则
    addComponentRule(state, rule) {
      state.currentComponent.rules.push(rule)
    }
  },
  actions: {},
  modules: {}
})
