<template>
  <div class="course-notice">
    <div class="course-notice-contain">
      <!-- 触发按钮 -->
      <el-button type="text" @click="dialogVisible = true" class="course-btn">
        <div class="course-notice-list">
          <div class="course-notice-list-logo">公告</div>
          <span class="course-notice-list-title">关于期末考试说明</span>
          <span class="course-notice-list-time">2021-10-10 23:58</span>
        </div>
      </el-button>
      <!-- 弹出消息 -->
      <el-dialog title="关于期末考试说明" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span class="course-dialog-content">
          亲们，我们的课程成绩已全部录入到教学系统中。大家可以在教学系统中查询成绩了。 如果你感觉本课程还不错的话，敬请在学校教务系统的评价中给予100分评价，这也是对老师的最大鼓励了。 感谢这一个学期以来的陪伴。 如果你觉得老师有需要改进的地方，请直接回复本条通知，或在QQ上和我反馈（Q号：1105459082）。
          下学期欢迎选修我的其他课程。有任何疑问，欢迎随时联系。再次感谢。我会想念大家的。
        </span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teaCourseNotice',
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>

<style lang="less" scoped>
.course-notice {
  .course-notice-list {
    position: relative;
    display: block;
    height: 88px;
    line-height: 88px;
    text-align: left;
    font-size: 16px;
    color: #000;
    border-bottom: 1px solid #ebeef5;

    .course-notice-list-logo {
      position: absolute;
      top: 10px;
      left: 18px;
      display: inline-block;
      width: 68px;
      height: 68px;
      font-size: 24px;
      line-height: 68px;
      text-align: center;
      background-color: #79bbff;
      color: #fff;
      border-radius: 8px;
    }

    .course-notice-list-title {
      margin-left: 120px;
    }

    .course-notice-list-time {
      float: right;
      margin-right: 32px;
    }
  }
  ::v-deep.course-btn {
    width: 100%;
  }

  .course-dialog-content {
    padding-left: 2rem;
  }
}
</style>
