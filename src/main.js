import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 初始化css样式
import cssInit from '@/assets/normalize.css'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入封装好的axios
import request from '@/api/request.js'
// 引入获取cookie的函数
import { getCookie } from '@/utils/cookie.js'
// 引入ajax
// 设置为全局下利用$request就可以调用
Vue.prototype.$request = request

Vue.config.productionTip = false

Vue.use(ElementUI)
// 路由全局守卫，判断是否登录和权限是否足够
router.beforeEach(async (to, from, next) => {
  const token = getCookie('Token')
  // 如果有cookie的话，验证cookie有效性，并获取此用户信息
  const mes = await request.get('/login/getinfo', {})
  if (to.path !== '/login') {
    if (!token) {
      ElementUI.Message.error({
        message: '您未登录，请重新登录',
      })
      next({
        path: '/login',
      })
    } else {
      if (mes.isValid) {
        // 在vuex中存入身份和id
        store.commit('SET_ROLE', mes.info[0].identity)
        store.commit('SET_ID', mes.info[0].ID)
        store.commit('SET_INTRODUCTION', mes.info[0])
        if (to.meta.role === store.state.role) {
          next()
        } else {
          ElementUI.Message.error({
            message: '权限不足，请重新登录',
          })
          next({
            path: '/login',
          })
        }
      } else {
        // token无效时的操作
        ElementUI.Message.error({
          message: '登录失败，请重新登录',
        })
        next({
          path: '/login',
        })
      }
    }
  } else {
    if (mes.isValid) {
      if (mes.info[0].identity === '学生') {
        next('/stuhomepage/studycourse')
      } else if (mes.info[0].identity === '教师') {
        next('/teaHome')
      }
    }
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  cssInit,
  render: (h) => h(App),
}).$mount('#app')
