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
// 引入学生课程路由组件
import CourseTask from '@/views/student/courseDetail/courseTask.vue'
import CourseNotice from '@/views/student/courseDetail/courseNotice.vue'
import CourseMessage from '@/views/student/courseDetail/courseMessage.vue'
import CourseIntro from '@/views/student/courseDetail/courseIntro.vue'
// 引入教师路由组件
import TeaHome from '@/views/teacher/teaHome.vue'
import TeaClass from '@/views/teacher/teaClass.vue'
import TeaCourse from '@/views/teacher/teaCourse.vue'
import TeaInfo from '@/views/teacher/teaInfo.vue'

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
    redirect: '/courseDetail/coursetask',
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
  {
    path: '/teahome',
    name: 'TeaHome',
    component: TeaHome,
    children: [
      {
        path: '/',
        redirect: '/teahome/teacourse',
      },
      {
        path: 'teacourse',
        name: 'TeaCourse',
        component: TeaCourse,
      },
      {
        path: 'teaclass',
        name: 'TeaClass',
        component: TeaClass,
      },
      {
        path: 'teainfo',
        name: 'TeaInfo',
        component: TeaInfo,
      },
      {
        path: 'infromClass',
        name: 'TeaInfromClass',
        component: InfromClass,
      },
      {
        path: 'message',
        name: 'TeaMessage',
        component: Message,
      },
      {
        path: 'classroomQuery',
        name: 'TeaClassroomQuery',
        component: ClassroomQuery,
      },
      {
        path: 'teaPhoto',
        name: 'TeaPhoto',
        component: StuPhoto,
      },
      {
        path: 'teaPassword',
        name: 'TeaPassword',
        component: StuPassword,
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
