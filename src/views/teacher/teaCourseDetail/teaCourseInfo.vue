<template>
  <div>
    <div class="course-intro">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="课程名称">
          <el-input v-model="couseTable.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="教学班级">
          <el-input v-model="couseTable.class" disabled></el-input>
        </el-form-item>
        <el-form-item label="学年-学期">
          <el-input v-model="couseTable.year" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-input v-model="couseTable.organization" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCourseDetail } from '@/api/student/courseDetail/courseIntro.js'
export default {
  created() {
    this.getURl()
  },
  mounted() {
    this.getCourse()
  },
  data() {
    return {
      couseTable: {},
    }
  },
  methods: {
    // 获取课程详细信息
    async getCourse() {
      const data = {
        _courseID: this.courseID,
      }
      const msg = await getCourseDetail(data)
      this.couseTable = msg[0]
    },
    // 获取网址栏上的课程号
    getURl() {
      const url = this.$route.query
      this.courseID = url.courseId
    },
  },
}
</script>

<style lang="less" scoped>
.course-intro {
  margin: 24px;
  padding: 28px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 14px;

  ::v-deep .el-form-item__label {
    width: 120px !important;
    padding-right: 48px;
    box-sizing: border-box;
  }

  ::v-deep .el-form-item__content {
    margin-left: 120px !important;
  }
}
</style>
