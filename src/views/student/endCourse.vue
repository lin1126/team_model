<template>
  <div>
    <!-- 头部课程搜索框部分 -->
    <div class="stu-head">
      <CourseSearch> </CourseSearch>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 课程盒子部分 -->
    <div class="study-contain">
      <el-row :gutter="10">
        <!-- 单个课程的盒子开始 -->
        <el-col :md="{ span: 6, offset: 2, pull: 1 }">
          <div class="course-cover">
            <!-- 课程顶部图片 -->
            <el-image :src="src" style="border-radius: 14px; height: 150px; width: 100%" key="cover">
              <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
            </el-image>
            <!-- 课程名称 -->
            <div class="course-title">
              <h3>电科院计算机建立举行喘吁吁小程序发射点发射点发射点犯得上vvvvvvvvv</h3>
            </div>
            <!-- 课程日期 -->
            <div class="course-date">2021-2022 第一学期</div>
            <!-- 授课老师 -->
            <div class="course-teacher">授课教师：张茹</div>
          </div>
        </el-col>
        <!-- 单个课程的盒子结束 -->
        <el-col :md="{ span: 6, offset: 2, pull: 1 }">
          <div class="course-cover">
            <el-image :src="src" style="border-radius: 14px; height: 150px; width: 100%" key="cover">
              <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
            </el-image>

            <div class="course-title">
              <h3>电科院计算机建立举行喘吁吁小程序发射点发射点发射点犯得上vvvvvvvvv</h3>
            </div>
            <div class="course-date">2021-2022 第一学期</div>
            <div class="course-teacher">授课教师：张茹</div>
          </div>
        </el-col>
        <el-col :md="{ span: 6, offset: 2, pull: 1 }">
          <div class="course-cover">
            <el-image :src="src" style="border-radius: 14px; height: 150px; width: 100%" key="cover">
              <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
            </el-image>

            <div class="course-title">
              <h3>电科院计算机建立举行喘吁吁小程序发射点发射点发射点犯得上vvvvvvvvv</h3>
            </div>
            <div class="course-date">2021-2022 第一学期</div>
            <div class="course-teacher">授课教师：张茹</div>
          </div>
        </el-col>
        <!-- 第二行 -->
      </el-row>
    </div>
  </div>
</template>

<script>
import CourseSearch from '@/components/CourseSearch.vue'
export default {
  name: 'endCourse',
  components: {
    CourseSearch,
  },
  data() {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    }
  },
}
</script>

<style lang="less" scoped>
.stu-head {
  width: 100%;
  height: 60px;
  line-height: 60px;
}
.el-divider--horizontal {
  margin: 6px;
}

.study-contain {
  padding: 10px 24px;

  .course-cover {
    height: 282px;
    border-radius: 14px;
    cursor: pointer;
    margin: 10px 0;
    border: 1px solid #fff;
    transition: all 0.25s ease-in-out;
  }
  .course-cover:hover {
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
  }

  .course-teacher {
    font-size: 12px;
    color: #8a8b99;
  }
}
</style>
