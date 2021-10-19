import { createStore } from 'vuex'
import home from './home'
import login from './login'

const store = createStore({
  modules: {
    home,
    login
  }
})

export default store
