import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    id: '',
    role: '',
    introduction: '',
    courseInfo: {},
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
    SET_COURSEINFO(state, courseInfo) {
      state.courseInfo = {
        grade: courseInfo.class.substr(0, 2),
        class: courseInfo.class.substr(-2, 1),
        career: courseInfo.class.slice(2, -2),
        name: courseInfo.name,
      }
    },
  },
  actions: {},
  modules: {},
})
