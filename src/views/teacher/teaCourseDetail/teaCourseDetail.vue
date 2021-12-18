<template>
  <div>
    <el-header><Header></Header></el-header>
    <!-- 课程详细部分头部  -->
    <div class="Detail-top">
      <h1 class="course-title">物联网控制技术与应用</h1>
      <h2 class="course-class">18物联网工程1、2班</h2>
      <p class="course-number">已有48人加入本课程</p>
      <div class="course-pic">
        <el-image style="width: 240px; height: 180px" :src="url" :fit="fill"></el-image>
        <p class="course-evaluate">课程评价</p>
      </div>
    </div>
    <!-- 课程详细部分主体 -->
    <div class="Detail-content">
      <div class="Detail-content-menu">
        <el-menu class="el-menu-course" :default-active="activeIndex" mode="horizontal" @select="handleSelect" router>
          <el-menu-item index="/teacourseDetail/teacoursetask">任务</el-menu-item>
          <el-menu-item index="/teacourseDetail/teacoursenotice">公告</el-menu-item>
          <el-menu-item index="/teacourseDetail/teacoursemessage">留言</el-menu-item>
          <el-menu-item index="/teacourseDetail/teacourseinfo">课程介绍</el-menu-item>
          <el-menu-item index="/teacourseDetail/teacoursecontrol">课程管理</el-menu-item>
        </el-menu>
      </div>
      <div class="Detail-contain">
        <!-- 路由模块 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'teaCourseDetail',
  components: {
    Header,
  },
  data() {
    return {
      url: require('@/assets/images/detailTop.jpg'),
      activeIndex: '/courseDetail/courseTask',
    }
  },
  mounted() {
    this.getURl()
  },
  methods: {
    getURl() {
      const url = this.$route.query
      console.log(url.courseId)
    },
  },
}
</script>

<style lang="less" scoped>
.el-header {
  z-index: 999;
  background-color: #79bbff;
  color: #333;
  padding: 0;
  box-shadow: 0 3px 3px #dcdfe6;
}

.Detail-top {
  position: relative;
  height: 220px;
  background-color: pink;
  margin: 20px 98px;
  background: #79bbff;
  border-radius: 14px;

  .course-title {
    margin: 0;
    padding: 20px 32px 0 32px;
    color: #fff;
    font-size: 42px;
    font-weight: 400;
    text-align: right;
  }

  .course-class {
    margin: 0;
    padding: 20px 32px;
    color: #fff;
    font-size: 24px;
    font-weight: 400;
    text-align: right;
  }

  .course-number {
    margin: 0;
    padding: 48px 32px 20px 32px;
    text-align: right;
    color: #fff;
  }

  .course-pic {
    position: absolute;
    top: 50%;
    left: 32px;
    transform: translateY(-50%);
    height: 180px;
    width: 240px;
    background-color: pink;
    border-radius: 14px;
    cursor: pointer;

    .course-evaluate {
      z-index: 999;
      position: absolute;
      bottom: 0;
      width: 240px;
      height: 32px;
      line-height: 32px;
      margin: 0;
      color: #79bbff;
      text-align: center;
      border-bottom-right-radius: 14px;
      border-bottom-left-radius: 14px;
      background: rgba(84, 79, 79, 0.7);
    }
  }

  .course-pic > .el-image {
    border-radius: 14px;
  }
}

.Detail-content {
  min-height: 480px;
  margin: 20px 98px;
  background-color: #fff;

  .el-menu-item {
    font-size: 18px;
    padding: 0 40px;
  }

  .Detail-contain {
    padding: 14px 32px;
  }
}
</style>
