import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登录部分路由组件
import Login from '@/views/login.vue'
// 引入学生部分路由组件
import StuHomePage from '@/views/student/stuHomePage.vue'
import StudyCourse from '@/views/student/studyCourse.vue'
import EndCourse from '@/views/student/endCourse.vue'
import InfromClass from '@/views/student/informClass.vue'
import Message from '@/views/student/message.vue'
import ClassroomQuery from '@/views/student/classroomQuery.vue'
import StuInfo from '@/views/student/stuInfo.vue'
import StuPhoto from '@/views/student/stuPhoto.vue'
import StuPassword from '@/views/student/stuPassword.vue'
import Demo from '@/views/demo.vue'
import CourseDetail from '@/views/student/courseDetail/courseDetail.vue'
// 引入课程路由组件
import CourseTask from '@/views/student/courseDetail/courseTask.vue'
import CourseNotice from '@/views/student/courseDetail/courseNotice.vue'
import CourseMessage from '@/views/student/courseDetail/courseMessage.vue'
import CourseIntro from '@/views/student/courseDetail/courseIntro.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/demo',
    component: Demo,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/stuhomepage',
    name: 'StuHomePage',
    component: StuHomePage,
    children: [
      {
        path: '/',
        redirect: '/stuhomepage/studycourse',
      },
      {
        path: 'studycourse',
        name: 'StudyCourse',
        component: StudyCourse,
      },
      {
        path: 'endcourse',
        name: 'EndCourse',
        component: EndCourse,
      },
      {
        path: 'infromClass',
        name: 'InfromClass',
        component: InfromClass,
      },
      {
        path: 'message',
        name: 'Message',
        component: Message,
      },
      {
        path: 'classroomQuery',
        name: 'ClassroomQuery',
        component: ClassroomQuery,
      },
      {
        path: 'stuInfo',
        name: 'StuInfo',
        component: StuInfo,
      },
      {
        path: 'stuPhoto',
        name: 'StuPhoto',
        component: StuPhoto,
      },
      {
        path: 'stuPassword',
        name: 'StuPassword',
        component: StuPassword,
      },
    ],
  },
  {
    path: '/courseDetail',
    name: 'CourseDetail',
    component: CourseDetail,
    children: [
      {
        name: 'coursetask',
        path: 'coursetask',
        component: CourseTask,
      },
      {
        name: 'courseNotice',
        path: 'courseNotice',
        component: CourseNotice,
      },
      {
        name: 'courseMessage',
        path: 'courseMessage',
        component: CourseMessage,
      },
      {
        name: 'courseIntro',
        path: 'courseIntro',
        component: CourseIntro,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
