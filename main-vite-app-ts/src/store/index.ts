import { createStore } from 'vuex'

export default createStore({
  state: {
    toDoList: [
      { id: 1, text: '111111111.', done: true },
      { id: 2, text: '222222222.', done: false }
    ],
    count: 0,
  },
  getters: {
    baseInfo: state => {
      return state.toDoList.filter(item => item.done)
    },
    getTodo: (state) => (id: any) => {
      return state.toDoList.find(todo => todo.id === id)
    }
  },
  mutations: {
    increment (state, edge) {
      state.count = state.count + edge
    }
  },
  // actions 类似于 mutation，actions中可以包含异步
  // store.dispatch('increment')
  actions: {
    increment (context) {
      context.commit('increment')
    }
  },
  modules: {

  },
})
