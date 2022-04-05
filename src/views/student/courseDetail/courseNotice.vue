<template>
  <div class="course-notice">
    <div class="course-notice-contain"
         v-for="item in msg"
         :key="item._id">
      <!-- 触发按钮 -->
      <el-button type="text"
                 @click="item.show = true"
                 class="course-btn">
        <div class="course-notice-list">
          <div class="course-notice-list-logo">公告</div>
          <span class="course-notice-list-title">{{ item.title }}</span>
          <span class="course-notice-list-time">{{ TimeFormat(item.Time) }}</span>
        </div>
      </el-button>
      <!-- 弹出消息 -->
      <el-dialog :title="item.title"
                 :visible.sync="item.show"
                 width="30%"
                 :before-close="handleClose">
        <span class="course-dialog-content">
          {{ item.notice }}
        </span>

        <span slot="footer"
              class="dialog-footer">
          <el-button @click="item.show = false">取 消</el-button>
          <el-button type="primary"
                     @click="item.show = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCourseNotice } from '@/api/student/courseDetail/courseNotice.js'
import { formatTime } from '@/utils/formatTime.js'
export default {
  created () {
    this.getURl()
  },
  mounted () {
    this.getNotice()
  },
  data () {
    return {
      page: 1,
      limit: 10,
      courseID: '',
      msg: '',
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => { })
    },
    // 获取课堂通知
    async getNotice () {
      const data = {
        _courseID: this.courseID,
      }
      const msg = await getCourseNotice(data)
      this.msg = msg
    },
    // 获取网址栏上的课程号
    getURl () {
      const url = this.$route.query
      this.courseID = url.courseId
    },
    // 格式化时间
    TimeFormat (data) {
      return formatTime(data)
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
