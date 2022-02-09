<template>
  <div class="course-control">
    <div class="course-control-item">
      <div class="course-control-label"><span>班级状态：</span></div>
      <div class="course-control-content"><el-switch v-model="stateValue" active-text="正在进行" inactive-text="已结课" @change="chageState()"> </el-switch></div>
    </div>
    <div class="course-control-item">
      <div class="course-control-label"><span>班级操作：</span></div>
      <div class="course-control-content">
        <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="此操作不可逆，是否继续" @confirm="delCourse()">
          <el-link slot="reference" type="danger" :underline="false">删除课程</el-link>
        </el-popconfirm>
      </div>
    </div>
  </div>
</template>

<script>
import { changeCourseState, delCourse } from '@/api/teacher/teaCourseDetail/teaCourseNotice.js'
export default {
  data() {
    return {
      stateValue: true,
      // 课程号
      courseID: '',
    }
  },
  created() {
    this.getURl()
  },
  methods: {
    // 获取网址栏上的课程号
    getURl() {
      const url = this.$route.query
      this.courseID = url.courseId
    },
    // 改变课程状态
    async chageState() {
      const req = {
        _courseID: this.courseID,
        _state: this.stateValue ? 'underway' : 'end',
      }
      const res = await changeCourseState(req)
      if (res === 'OK') {
        this.$message({
          message: '更改课程状态成功！',
          type: 'success',
        })
      }
    },
    // 删除班级
    async delCourse() {
      const req = {
        _courseID: this.courseID,
      }
      const res = await delCourse(req)
      if (res === 'OK') {
        this.$message({
          message: '删除课程成功',
          type: 'success',
        })
        this.$router.push('/teahome/teacourse')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.course-control {
  margin-top: 18px;
  border: 1px solid #e6e6e6;
  border-bottom: 0;
  .course-control-item {
    display: flex;
    font-size: 18px;
    border-bottom: 1px solid #e6e6e6;

    .course-control-label,
    .course-control-content {
      flex: 1;
      height: 68px;
      // background-color: red;
      text-align: center;
      line-height: 68px;
    }
    .course-control-content {
      flex: 7;
      text-align: left;
    }
  }
}
</style>
