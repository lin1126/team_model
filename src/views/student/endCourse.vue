<template>
  <div>
    <!-- 页面头部内容 -->
    <div class="page-head">
      <PageHeader pageHeaderContent="已结束"> </PageHeader>
      <div class="stu-search">
        <el-input placeholder="请输入内容" v-model="courseSearchInput" clearable class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 课程盒子部分 -->
    <div class="study-contain">
      <el-row :gutter="10">
        <!-- 单个课程的盒子开始 -->
        <router-link :to="courseUrl" target="_blank" v-for="item in courseData" :key="item.courseDetail[0].courseID">
          <el-col :lg="{ span: 6, offset: 2, pull: 1 }">
            <div class="course-box">
              <!-- 遮蔽图层  -->
              <div class="course-cover" v-show="isEnd">已结课</div>
              <!-- 课程顶部图片 -->
              <el-image :src="item.courseDetail[0].Photo" style="border-radius: 14px; height: 150px; width: 100%" key="cover">
                <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
              </el-image>
              <!-- 课程名称 -->
              <div class="course-title">
                <h3>{{ item.courseDetail[0].name }}</h3>
              </div>
              <!-- 课程日期 -->
              <div class="course-date">{{ item.courseDetail[0].year }}</div>
              <!-- 授课老师 -->
              <div class="course-teacher">授课教师： {{ item.teacherName }}</div>
            </div>
          </el-col>
        </router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getCourse } from '@/api/student/studyCourse.js'
import PageHeader from '@/components/PageHeader.vue'
export default {
  name: 'endCourse',
  components: {
    PageHeader,
  },
  data() {
    return {
      isEnd: true,
      courseSearchInput: '',
      courseData: '',
    }
  },

  methods: {
    async getCourseAjax() {
      const res = { _id: this.$store.state.id }
      const data = await getCourse(res)
      const cdata = data.filter(myFunction)
      // 提取出正在进行中的课程
      function myFunction(value, index, array) {
        return value.courseDetail[0].state === 'end'
      }
      console.log(cdata)
      this.courseData = cdata
    },
  },
  created() {
    this.getCourseAjax()
  },
  computed: {
    courseUrl: function () {
      return '/courseDetail?courseId=' + this.courseId
    },
  },
}
</script>

<style lang="less" scoped>
.page-head {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
}

.el-divider--horizontal {
  margin: 6px;
}
.stu-search {
  position: absolute;
  top: 0;
  right: 0;
  // float: right;
  width: 320px;
  height: 60px;
  line-height: 60px;
  padding-right: 32px;
}

.el-input-group__append button.el-button:hover {
  color: #409eff !important;
}

.study-contain {
  padding: 10px 24px;

  .course-box {
    position: relative;
    height: 282px;
    border-radius: 14px;
    cursor: pointer;
    margin: 10px 0;
    border: 1px solid #fff;
    transition: all 0.25s ease-in-out;

    .course-cover {
      z-index: 100;
      position: absolute;
      width: 100%;
      height: 150px;
      line-height: 150px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 14px;
      font-size: 20px;
      text-align: center;
      color: #79bbff;
    }
  }
  .course-box:hover {
    transform: translateY(-5px);
    border: 1px solid rgba(0, 135, 203, 0.5);
    box-shadow: 0px 4px 32px -16px rgba(0, 135, 203, 0.5);
  }

  .image-slot {
    text-align: center;
    line-height: 150px;
  }

  .course-title {
    height: 42px;
    padding: 0 6px;
    margin: 10px 0;
    color: #000;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /*截取第三行*/

    h3 {
      margin: 0;
    }
  }
  .course-date,
  .course-teacher {
    height: 18px;
    padding: 8px 6px;
    font-size: 14px;
    font-weight: 400;
    color: #3e3e3e;
  }

  .course-teacher {
    font-size: 12px;
    color: #8a8b99;
  }
}
</style>
