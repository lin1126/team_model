import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/stuhomepage',
    name: 'StuHomePage',
    component: () => import('@/views/student/stuHomePage.vue'),
    meta: { role: '学生' },
    children: [
      {
        path: '/',
        redirect: '/stuhomepage/studycourse',
      },
      {
        path: 'studycourse',
        name: 'StudyCourse',
        component: () => import('@/views/student/studyCourse.vue'),
        meta: { role: '学生' },
      },
      {
        path: 'endcourse',
        name: 'EndCourse',
        component: () => import('@/views/student/endCourse.vue'),
        meta: { role: '学生' },
      },
      {
        path: 'infromClass',
        name: 'InfromClass',
        component: () => import('@/views/student/informClass.vue'),
        meta: { role: '学生' },
      },
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/student/message.vue'),
        meta: { role: '学生' },
      },
      {
        path: 'classroomQuery',
        name: 'ClassroomQuery',
        component: () => import('@/views/student/classroomQuery.vue'),
        meta: { role: '学生' },
      },
      {
        path: 'stuInfo',
        name: 'StuInfo',
        component: () => import('@/views/student/stuInfo.vue'),
        meta: { role: '学生' },
      },
      {
        path: 'stuPhoto',
        name: 'StuPhoto',
        component: () => import('@/views/student/stuPhoto.vue'),
        meta: { role: '学生' },
      },
      {
        path: 'stuPassword',
        name: 'StuPassword',
        component: () => import('@/views/student/stuPassword.vue'),
        meta: { role: '学生' },
      },
    ],
  },
  {
    path: '/courseDetail',
    name: 'CourseDetail',
    component: () => import('@/views/student/courseDetail/courseDetail.vue'),
    redirect: '/courseDetail/courseNotice',
    meta: { role: '学生' },
    children: [
      {
        name: 'coursetask',
        path: 'coursetask',
        component: () => import('@/views/student/courseDetail/courseTask.vue'),
        meta: { role: '学生' },
      },
      {
        name: 'courseNotice',
        path: 'courseNotice',
        component: () => import('@/views/student/courseDetail/courseNotice.vue'),
        meta: { role: '学生' },
      },
      {
        name: 'courseMessage',
        path: 'courseMessage',
        component: () => import('@/views/student/courseDetail/courseMessage.vue'),
        meta: { role: '学生' },
      },
      {
        name: 'courseIntro',
        path: 'courseIntro',
        component: () => import('@/views/student/courseDetail/courseIntro.vue'),
        meta: { role: '学生' },
      },
    ],
  },
  {
    path: '/teahome',
    name: 'TeaHome',
    component: () => import('@/views/teacher/teaHome.vue'),
    meta: { role: '教师' },
    children: [
      {
        path: '/',
        redirect: '/teahome/teacourse',
      },
      {
        path: 'teacourse',
        name: 'TeaCourse',
        component: () => import('@/views/teacher/teaCourse.vue'),
        meta: { role: '教师' },
      },
      {
        path: 'teaclass',
        name: 'TeaClass',
        component: () => import('@/views/teacher/teaClass.vue'),
        meta: { role: '教师' },
      },
      {
        path: 'teainfo',
        name: 'TeaInfo',
        component: () => import('@/views/teacher/teaInfo.vue'),
        meta: { role: '教师' },
      },
      {
        path: 'infromClass',
        name: 'TeaInfromClass',
        component: () => import('@/views/student/informClass.vue'),
        meta: { role: '教师' },
      },
      {
        path: 'message',
        name: 'TeaMessage',
        component: () => import('@/views/student/message.vue'),
        meta: { role: '教师' },
      },
      {
        path: 'classroomQuery',
        name: 'TeaClassroomQuery',
        component: () => import('@/views/student/classroomQuery.vue'),
        meta: { role: '教师' },
      },
      {
        path: 'teaPhoto',
        name: 'TeaPhoto',
        component: () => import('@/views/student/stuPhoto.vue'),
        meta: { role: '教师' },
      },
      {
        path: 'teaPassword',
        name: 'TeaPassword',
        component: () => import('@/views/student/stuPassword.vue'),
        meta: { role: '教师' },
      },
    ],
  },
  {
    path: '/teacourseDetail',
    name: 'teaCourseDetail',
    component: () => import('@/views/teacher/teaCourseDetail/teaCourseDetail.vue'),
    redirect: '/teacourseDetail/teacoursenotice',
    meta: { role: '教师' },
    children: [
      {
        name: 'teacoursetask',
        path: 'teacoursetask',
        component: () => import('@/views/teacher/teaCourseDetail/teaCourseTask.vue'),
        meta: { role: '教师' },
      },
      {
        name: 'teacourseinfo',
        path: 'teacourseinfo',
        component: () => import('@/views/teacher/teaCourseDetail/teaCourseInfo.vue'),
        meta: { role: '教师' },
      },
      {
        name: 'teacoursemessage',
        path: 'teacoursemessage',
        component: () => import('@/views/teacher/teaCourseDetail/teaCourseMessage.vue'),
        meta: { role: '教师' },
      },
      {
        name: 'teacoursenotice',
        path: 'teacoursenotice',
        component: () => import('@/views/teacher/teaCourseDetail/teaCourseNotice.vue'),
        meta: { role: '教师' },
      },
      {
        name: 'teacoursecontrol',
        path: 'teacoursecontrol',
        component: () => import('@/views/teacher/teaCourseDetail/teaCourseControl.vue'),
        meta: { role: '教师' },
      },
    ],
  },
  {
    path: '/adminhome',
    name: 'AdminHome',
    component: () => import('@/views/admin/adminHome.vue'),
    meta: { role: '管理员' },
    children: [
      {
        name: 'adminvideo',
        path: 'adminvideo',
        component: () => import('@/views/admin/adminVideo.vue'),
        meta: { role: '管理员' },
      },
      {
        name: 'adminenvironment',
        path: 'adminenvironment',
        component: () => import('@/views/admin/adminEnvironment.vue'),
        meta: { role: '管理员' },
      },
      {
        name: 'admindevicecontrol',
        path: 'admindevicecontrol',
        component: () => import('@/views/admin/adminDeviceControl.vue'),
        meta: { role: '管理员' },
      },
      {
        name: 'adminhumitureshow',
        path: 'adminhumitureshow',
        component: () => import('@/views/admin/adminHumitureShow.vue'),
        meta: { role: '管理员' },
      },
      {
        name: 'admindeviceshow',
        path: 'admindeviceshow',
        component: () => import('@/views/admin/adminDeviceShow.vue'),
        meta: { role: '管理员' },
      },
      {
        name: 'adminpictureshow',
        path: 'adminpictureshow',
        component: () => import('@/views/admin/adminPictureShow.vue'),
        meta: { role: '管理员' },
      },
      {
        name: 'admininfo',
        path: 'admininfo',
        component: () => import('@/views/admin/adminInfo.vue'),
        meta: { role: '管理员' },
      },
      {
        path: 'adminPhoto',
        name: 'adminPhoto',
        component: () => import('@/views/student/stuPhoto.vue'),
        meta: { role: '管理员' },
      },
      {
        path: 'adminPassword',
        name: 'adminPassword',
        component: () => import('@/views/student/stuPassword.vue'),
        meta: { role: '管理员' },
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
