<template>
  <div>
    <el-header>
      <Header></Header>
    </el-header>
    <!-- 课程详细部分头部  -->
    <el-collapse-transition>
      <div class="Detail-top transition-box"
           v-if="isVisible">
        <h1 class="course-title">{{ couseTable.name }}</h1>
        <h2 class="course-class">{{ couseTable.class }}</h2>
        <p class="course-number">已有48人加入本课程</p>
        <div class="course-pic">
          <el-image style="width: 240px; height: 180px"
                    :src="couseTable.Photo"
                    :fit="fill"></el-image>
          <p class="course-evaluate"><a :href="'/#/courseDetail/courseMessage?courseId=' + this.courseID">课程留言</a></p>
        </div>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div class="Detail-top-simple transition-box"
           v-if="!isVisible">
        <h1 class="course-title">{{ couseTable.name }}</h1>
      </div>
    </el-collapse-transition>

    <!-- 课程详细部分主体 -->
    <div class="Detail-content">
      <div class="Detail-content-menu">
        <el-menu class="el-menu-course"
                 :default-active="activeIndex"
                 mode="horizontal"
                 @select="handleSelect"
                 router>
          <!-- <el-menu-item :index="'/courseDetail/courseTask?courseId=' + this.courseID">任务</el-menu-item> -->
          <el-menu-item :index="'/courseDetail/courseNotice?courseId=' + this.courseID">公告</el-menu-item>
          <el-menu-item :index="'/courseDetail/courseMessage?courseId=' + this.courseID">留言</el-menu-item>
          <el-menu-item :index="'/courseDetail/courseIntro?courseId=' + this.courseID">课程介绍</el-menu-item>
          <!-- 收起课程视图 -->
          <el-button type="info"
                     :icon="isVisible?'el-icon-arrow-up':'el-icon-arrow-down'
"
                     circle
                     class="pack-up"
                     @click="packUpHead()"></el-button>
        </el-menu>
      </div>
      <div :class="{'Detail-contain': isVisible,'Detail-contain-1': !isVisible}">
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
  name: 'courseDetail',
  components: {
    Header
  },
  data () {
    return {
      activeIndex: '',
      courseID: '',
      couseTable: {},
      isVisible: true,
    }
  },
  created () {
    this.getURl()
  },
  mounted () {
    this.getCourse()
  },
  methods: {
    // 获取网址栏上的课程号
    getURl () {
      const url = this.$route.query
      this.courseID = url.courseId
      this.activeIndex = '/courseDetail/courseNotice?courseId=' + this.courseID
    },
    // 获取课程详细信息
    async getCourse () {
      const data = {
        _courseID: this.courseID
      }
      const msg = await getCourseDetail(data)
      this.couseTable = msg[0]
      console.log(msg)
    },
    // 收起课程展示
    packUpHead () {
      this.isVisible = !this.isVisible
    }
  }
}
</script>

<style lang="less" scoped>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c8;
}
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
      text-align: center;
      border-bottom-right-radius: 14px;
      border-bottom-left-radius: 14px;
      background: rgba(84, 79, 79, 0.7);
    }
    .course-evaluate > a {
      color: #79bbff;
    }
  }

  .course-pic > .el-image {
    border-radius: 14px;
  }
}
.Detail-top-simple {
  position: relative;
  height: 40spx;
  line-height: 40px;
  margin: 10px 98px;
  background: #79bbff;
  border-radius: 14px;
  text-align: center;
  .course-title {
    margin: 0;
    color: #fff;
    font-size: 24px;
    font-weight: 400;
  }
}

.Detail-content {
  min-height: calc(100vh - 320px);
  margin: 0 98px;
  background-color: #fff;

  .el-menu-item {
    font-size: 18px;
    padding: 0 40px;
  }

  .Detail-contain {
    overflow: auto;
    max-height: calc(100vh - 406px);
    padding: 14px 32px;
  }
  .Detail-contain-1 {
    overflow: auto;
    max-height: calc(100vh - 212px);
    padding: 14px 32px;
  }
}

.pack-up {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
