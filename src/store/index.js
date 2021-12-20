import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: '',
    role: '',
    introduction: '',
  },
  mutations: {
    SET_ROLE(state, role) {
      state.role = role
    },
  },
  actions: {},
  modules: {},
})
