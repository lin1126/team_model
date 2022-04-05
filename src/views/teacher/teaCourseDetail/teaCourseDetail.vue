<template>
  <div>
    <el-header>
      <Header></Header>
    </el-header>
    <!-- 课程详细部分头部  -->
    <div class="Detail-top">
      <h1 class="course-title">{{ couseTable.name }}</h1>
      <h2 class="course-class">{{ couseTable.class }}</h2>
      <p class="course-number">已有48人加入本课程</p>
      <div class="course-pic">
        <el-image style="width: 240px; height: 180px" :src="couseTable.Photo" :fit="fill"></el-image>
        <p class="course-evaluate"><a :href="'/#/teacourseDetail/teacoursemessage?courseId=' + this.courseID">课程留言</a></p>
      </div>
    </div>
    <!-- 右边考勤入口 -->
    <div class="quick-entry-layou">
      <ul>
        <li>
          <el-button @click="drawer = true" type="primary" icon="el-icon-s-claim" circle></el-button><span>考勤</span>
        </li>
        <li>
          <el-button type="primary" icon="el-icon-data-board" circle @click="goNotice()"></el-button><span>公告</span>
        </li>
        <li>
          <el-button type="primary" icon="el-icon-chat-dot-round" circle @click="goMessage()"></el-button><span>留言</span>
        </li>
        <li>
          <el-button type="primary" icon="el-icon-setting" circle @click="goSet()"></el-button><span>设置</span>
        </li>
      </ul>
    </div>
    <!-- 考勤模块 -->
    <div class="course-checking-in">
      <el-drawer title="考勤" :visible.sync="drawer" direction="ltr" :before-close="handleClose" size="95%" :modal="false">
        <div class="course-check-contain">
          <!-- 考勤模块头部 -->
          <div class="course-check-header">
            <p>计算机组成原理<span>---18物联网工程2班</span></p>
            <div class="course-check-header-btn">
              <el-button type="primary" icon="el-icon-circle-plus-outline" round>新建考勤</el-button>
              <span>班级人数 0 人</span>
            </div>
          </div>
          <!-- 历史考勤模块部分 -->
          <div class="course-check-table">
            <div class="course-check-table-header">
              <span>考勤历史(5)次 </span>
              <el-link icon="el-icon-download" :underline="false">下载数据</el-link>
            </div>
            <!-- 各条考勤记录部分 -->
            <div class="course-check-table-items">
              <div class="course-check-table-body">
                <div class="table-body-left">
                  <h4>默认考勤</h4>
                  <span>2021-12-18 22:04</span>
                </div>
                <div class="table-body-right">
                  <div class="table-body-progress">
                    <el-progress type="dashboard" :percentage="percentage" :color="colors"></el-progress>
                  </div>
                  <span><i class="el-icon-more-outline"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
    <!-- 课程详细部分主体 -->
    <div class="Detail-content">
      <div class="Detail-content-menu">
        <el-menu class="el-menu-course" :default-active="activeIndex" mode="horizontal" @select="handleSelect" router>
          <!-- <el-menu-item :index="'/teacourseDetail/teacoursetask?courseId=' + this.courseID">任务</el-menu-item> -->
          <el-menu-item :index="'/teacourseDetail/teacoursenotice?courseId=' + this.courseID">公告</el-menu-item>
          <el-menu-item :index="'/teacourseDetail/teacoursemessage?courseId=' + this.courseID">留言</el-menu-item>
          <el-menu-item :index="'/teacourseDetail/teacourseinfo?courseId=' + this.courseID">课程介绍</el-menu-item>
          <el-menu-item :index="'/teacourseDetail/teacoursecontrol?courseId=' + this.courseID">课程管理</el-menu-item>
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
import { getCourseDetail } from '@/api/student/courseDetail/courseIntro.js'
import Header from '@/components/Header.vue'
export default {
  name: 'teaCourseDetail',
  components: {
    Header
  },
  data() {
    return {
      url: require('@/assets/images/detailTop.jpg'),
      activeIndex: '/courseDetail/courseTask',
      courseID: '',
      couseTable: {},
      // 考勤的侧边栏打开变量
      drawer: false,
      percentage: 100,
      colors: [
        { color: '#f1401c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#7cf30e', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#00ff00', percentage: 100 }
      ]
    }
  },
  created() {
    this.getURl()
  },
  mounted() {
    this.getCourse()
  },
  methods: {
    // 获取网址栏上的课程号
    getURl() {
      const url = this.$route.query
      this.courseID = url.courseId
    },

    // 获取课程详细信息
    async getCourse() {
      const data = {
        _courseID: this.courseID
      }
      const msg = await getCourseDetail(data)
      this.couseTable = msg[0]
      this.$store.commit('SET_COURSEINFO', msg[0])
    },

    // 跳转路由至公告界面
    goNotice() {
      this.$router.push('/teacourseDetail/teacoursenotice?courseId=' + this.courseID)
    },
    // 跳转路由至留言界面
    goMessage() {
      this.$router.push('/teacourseDetail/teacoursemessage?courseId=' + this.courseID)
    },
    // 跳转至设置界面
    goSet() {
      this.$router.push('/teacourseDetail/teacoursecontrol?courseId=' + this.courseID)
    }
  }
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
// 右边考勤部分
.quick-entry-layou {
  position: fixed;
  top: 228px;
  right: 0;
  height: 380px;
  width: 60px;
  background-color: #fff;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

  ul {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-content: center;
    padding: 0;
    margin: 0;
  }
  ul li {
    display: flex;
    flex: 1;
    flex-direction: column;
    list-style: none;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #79bbff;
    .el-button {
      width: 40px;
      height: 40px;
      padding: 0;
      /deep/ i {
        font-size: 24px;
      }
    }
  }
  ul li > span {
    padding-top: 10px;
  }
}

// 考勤模块
.course-checking-in {
  overflow: hidden;
  /deep/ .el-drawer {
    background-color: #2e3133;
  }

  /deep/ .el-drawer__header {
    font-size: 24px;
    color: #fff;
    .el-drawer__close-btn {
      font-size: 24px !important;
    }
  }

  /deep/ .el-drawer__body {
    padding: 0 58px;
  }

  // 考勤模块
  .course-check-contain {
    overflow-x: hidden;
    overflow-y: hidden;
    color: #fff;
    // 考勤模块头部
    .course-check-header {
      font-size: 32px;

      p {
        margin: 0;
        height: 40px;
        line-height: 40px;

        span {
          float: right;
          padding-right: 48px;
          font-size: 20px;
          line-height: 50px;
        }
      }

      .course-check-header-btn {
        padding: 28px 0;
        height: 52px;
        line-height: 52px;
        .el-button {
          width: 158px;
          height: 48px;
          border-radius: 24px;

          /deep/ i,
          /deep/ span {
            font-size: 22px;
          }
        }
        span {
          float: right;
          line-height: 50px;
          padding-right: 88px;
          font-size: 20px;
        }
      }
    }

    // 历史考勤模块部分
    .course-check-table {
      border: 1px solid #3c4043;
      padding-bottom: 68px;
      .course-check-table-header {
        height: 68px;
        line-height: 68px;
        border-bottom: 1px solid #3c4043;
        span {
          padding-left: 48px;
          font-size: 24px;
        }
        .el-link {
          float: right;
          padding-right: 108px;
          font-size: 20px;
          color: #fff;
        }
      }

      .course-check-table-items {
        .course-check-table-body {
          display: flex;
          margin: 24px 48px 0 48px;
          height: 128px;
          background-color: #3c4043;
          border-radius: 14px;

          .table-body-left {
            flex: 1;
            padding: 24px;

            h4 {
              font-size: 32px;
              margin: 0;
              margin-bottom: 24px;
              font-weight: 400;
            }

            span {
              font-size: 20px;
            }
          }

          .table-body-right {
            position: relative;
            flex: 1;
            text-align: right;

            .table-body-progress {
              padding: 8px 32px 0 0;
            }

            span {
              position: absolute;
              top: 6px;
              right: 16px;

              i {
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
  ::-webkit-scrollbar {
    width: 10px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    border-radius: 4px;
    background: #e1e1e1;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 6px #9e9e9e;
    background-color: #9e9e9e;
  }
}
</style>
