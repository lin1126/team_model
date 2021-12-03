import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 初始化css样式
import cssInit from '@/assets/normalize.css'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  cssInit,
  render: (h) => h(App),
}).$mount('#app')
