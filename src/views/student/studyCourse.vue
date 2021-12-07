<template>
  <div>
    <!-- 头部课程搜索框部分 -->
    <div class="stu-head">
      <CourseSearch> </CourseSearch>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import CourseSearch from '@/components/CourseSearch.vue'
export default {
  name: 'studyCourse',
  components: {
    CourseSearch,
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
</style>
