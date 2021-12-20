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
import request from '@/api/service.js'
// 引入过去cookie的函数
import { getCookie } from '@/utils/cookie.js'
// 引入ajax
// 设置为全局下利用$request就可以调用
Vue.prototype.$request = request

Vue.config.productionTip = false

Vue.use(ElementUI)
// 路由全局守卫，判断是否登录和权限是否足够
router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login') {
    const token = getCookie('Token')
    if (!token) {
      ElementUI.Message.error({
        message: '您未登录，请重新登录',
      })
      next({
        path: '/login',
      })
    } else {
      const mes = await request.post('/login/verify', { token: '' + token })
      if (mes.isValid) {
        store.commit('SET_ROLE', mes.identify)
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
