import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件
import Login from '@/views/login.vue'
import StuHomePage from '@/views/student/stuHomePage.vue'
import StudyCourse from '@/views/student/studyCourse.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/stu-home-page',
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
    children: [
      {
        path: '/',
        redirect: '/stu-home-page/study-course',
      },
      {
        path: 'study-course',
        name: 'StudyCourse',
        component: StudyCourse,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
