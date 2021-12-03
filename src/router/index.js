import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import StuHomePage from '@/views/student/stuHomePage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/stu-home-page',
    name: 'StuHomePage',
    component: StuHomePage,
  },
]

const router = new VueRouter({
  routes,
})

export default router
