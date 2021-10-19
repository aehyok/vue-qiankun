import { Module } from 'vuex'
import { SET_USER } from './actionType'

export type IUser = Record<'name' | 'password', string>

export interface ILoginState {
  user: IUser
}

const LoginStore: Module<ILoginState, Record<string, unknown>> = {
  namespaced: true,
  state: {
    user: {
      name: '',
      password: ''
    }
  },
  mutations: {
    [SET_USER](state, payload: IUser) {
      state.user = payload
    }
  },
  actions: {
    [SET_USER]({ commit }, payload: IUser) {
      commit(SET_USER, payload)
    }
  }
}

export default LoginStore
