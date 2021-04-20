import { createStore } from 'vuex'

export default createStore({
  state: {
    test: ''
  },
  mutations: {
    setTest(state,data){
      state.test = data
      console.log(state.test, 'stateTest')
    }
  },
  actions: {
  },
  modules: {
  }
})
