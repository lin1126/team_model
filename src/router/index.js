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
// 引入教师课程路由组件
import TeaCourseDetail from '@/views/teacher/teaCourseDetail/teaCourseDetail.vue'
import TeaCourseInfo from '@/views/teacher/teaCourseDetail/teaCourseInfo.vue'
import TeaCourseMessage from '@/views/teacher/teaCourseDetail/teaCourseMessage.vue'
import TeaCourseNotice from '@/views/teacher/teaCourseDetail/teaCourseNotice.vue'
import TeaCourseTask from '@/views/teacher/teaCourseDetail/teaCourseTask.vue'
import TeaCourseControl from '@/views/teacher/teaCourseDetail/teaCourseControl.vue'
// 引入管理员路由组件
import AdminHome from '@/views/admin/adminHome.vue'
import AdminVideo from '@/views/admin/adminVideo.vue'
import AdminEnvironment from '@/views/admin/adminEnvironment.vue'
import AdminDeviceControl from '@/views/admin/adminDeviceControl.vue'
import AdminHumitureShow from '@/views/admin/adminHumitureShow.vue'
import AdminDeviceShow from '@/views/admin/adminDeviceShow.vue'
import AdminPictureShow from '@/views/admin/adminPictureShow.vue'
import AdminInfo from '@/views/admin/adminInfo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
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
    meta: { role: '学生' },
    children: [
      {
        path: '/',
        redirect: '/stuhomepage/studycourse',
      },
      {
        path: 'studycourse',
        name: 'StudyCourse',
        component: StudyCourse,
        meta: { role: '学生' },
      },
      {
        path: 'endcourse',
        name: 'EndCourse',
        component: EndCourse,
        meta: { role: '学生' },
      },
      {
        path: 'infromClass',
        name: 'InfromClass',
        component: InfromClass,
        meta: { role: '学生' },
      },
      {
        path: 'message',
        name: 'Message',
        component: Message,
        meta: { role: '学生' },
      },
      {
        path: 'classroomQuery',
        name: 'ClassroomQuery',
        component: ClassroomQuery,
        meta: { role: '学生' },
      },
      {
        path: 'stuInfo',
        name: 'StuInfo',
        component: StuInfo,
        meta: { role: '学生' },
      },
      {
        path: 'stuPhoto',
        name: 'StuPhoto',
        component: StuPhoto,
        meta: { role: '学生' },
      },
      {
        path: 'stuPassword',
        name: 'StuPassword',
        component: StuPassword,
        meta: { role: '学生' },
      },
    ],
  },
  {
    path: '/courseDetail',
    name: 'CourseDetail',
    component: CourseDetail,
    redirect: '/courseDetail/courseNotice',
    meta: { role: '学生' },
    children: [
      {
        name: 'coursetask',
        path: 'coursetask',
        component: CourseTask,
        meta: { role: '学生' },
      },
      {
        name: 'courseNotice',
        path: 'courseNotice',
        component: CourseNotice,
        meta: { role: '学生' },
      },
      {
        name: 'courseMessage',
        path: 'courseMessage',
        component: CourseMessage,
        meta: { role: '学生' },
      },
      {
        name: 'courseIntro',
        path: 'courseIntro',
        component: CourseIntro,
        meta: { role: '学生' },
      },
    ],
  },
  {
    path: '/teahome',
    name: 'TeaHome',
    component: TeaHome,
    meta: { role: '教师' },
    children: [
      {
        path: '/',
        redirect: '/teahome/teacourse',
      },
      {
        path: 'teacourse',
        name: 'TeaCourse',
        component: TeaCourse,
        meta: { role: '教师' },
      },
      {
        path: 'teaclass',
        name: 'TeaClass',
        component: TeaClass,
        meta: { role: '教师' },
      },
      {
        path: 'teainfo',
        name: 'TeaInfo',
        component: TeaInfo,
        meta: { role: '教师' },
      },
      {
        path: 'infromClass',
        name: 'TeaInfromClass',
        component: InfromClass,
        meta: { role: '教师' },
      },
      {
        path: 'message',
        name: 'TeaMessage',
        component: Message,
        meta: { role: '教师' },
      },
      {
        path: 'classroomQuery',
        name: 'TeaClassroomQuery',
        component: ClassroomQuery,
        meta: { role: '教师' },
      },
      {
        path: 'teaPhoto',
        name: 'TeaPhoto',
        component: StuPhoto,
        meta: { role: '教师' },
      },
      {
        path: 'teaPassword',
        name: 'TeaPassword',
        component: StuPassword,
        meta: { role: '教师' },
      },
    ],
  },
  {
    path: '/teacourseDetail',
    name: 'teaCourseDetail',
    component: TeaCourseDetail,
    redirect: '/teacourseDetail/teacoursenotice',
    meta: { role: '教师' },
    children: [
      {
        name: 'teacoursetask',
        path: 'teacoursetask',
        component: TeaCourseTask,
        meta: { role: '教师' },
      },
      {
        name: 'teacourseinfo',
        path: 'teacourseinfo',
        component: TeaCourseInfo,
        meta: { role: '教师' },
      },
      {
        name: 'teacoursemessage',
        path: 'teacoursemessage',
        component: TeaCourseMessage,
        meta: { role: '教师' },
      },
      {
        name: 'teacoursenotice',
        path: 'teacoursenotice',
        component: TeaCourseNotice,
        meta: { role: '教师' },
      },
      {
        name: 'teacoursecontrol',
        path: 'teacoursecontrol',
        component: TeaCourseControl,
        meta: { role: '教师' },
      },
    ],
  },
  {
    path: '/adminhome',
    name: 'AdminHome',
    component: AdminHome,
    meta: { role: '管理员' },
    children: [
      {
        name: 'adminvideo',
        path: 'adminvideo',
        component: AdminVideo,
        meta: { role: '管理员' },
      },
      {
        name: 'adminenvironment',
        path: 'adminenvironment',
        component: AdminEnvironment,
        meta: { role: '管理员' },
      },
      {
        name: 'admindevicecontrol',
        path: 'admindevicecontrol',
        component: AdminDeviceControl,
        meta: { role: '管理员' },
      },
      {
        name: 'adminhumitureshow',
        path: 'adminhumitureshow',
        component: AdminHumitureShow,
        meta: { role: '管理员' },
      },
      {
        name: 'admindeviceshow',
        path: 'admindeviceshow',
        component: AdminDeviceShow,
        meta: { role: '管理员' },
      },
      {
        name: 'adminpictureshow',
        path: 'adminpictureshow',
        component: AdminPictureShow,
        meta: { role: '管理员' },
      },
      {
        name: 'admininfo',
        path: 'admininfo',
        component: AdminInfo,
        meta: { role: '管理员' },
      },
      {
        path: 'adminPhoto',
        name: 'adminPhoto',
        component: StuPhoto,
        meta: { role: '管理员' },
      },
      {
        path: 'adminPassword',
        name: 'adminPassword',
        component: StuPassword,
        meta: { role: '管理员' },
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
