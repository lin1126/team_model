import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    id: '',
    role: '',
    introduction: '',
  },
  mutations: {
    SET_ROLE(state, role) {
      state.role = role
    },
    SET_ID(state, id) {
      state.id = id
    },
    SET_INTRODUCTION(state, introduction) {
      state.introduction = introduction
    },
  },
  actions: {},
  modules: {},
})
