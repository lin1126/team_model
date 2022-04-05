<template>
  <div class="course-notice">
    <div class="add-Notice">
      <!-- 新建通知按钮 -->
      <el-button type="primary" round icon="el-icon-circle-plus-outline" @click="dialogTableVisible = true">新建通知</el-button>
    </div>
    <!-- 新建通知主体部分开始 -->
    <el-dialog title="新建通知" :visible.sync="dialogTableVisible" :close-on-press-escape="false" :show-close="false">
      <!-- 新建课程表单部分开始 -->
      <el-form label-width="80px" status-icon :model="formLabelData" :rules="rules" ref="formLabelData">
        <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
          <el-input v-model="formLabelData.title" maxlength="25" show-word-limit placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content" :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]">
          <el-input v-model="formLabelData.content" type="textarea" maxlength="300" show-word-limit placeholder="请输入内容" :rows="10" resize="none"></el-input>
        </el-form-item>
      </el-form>
      <!-- 新建课程表单部分结束 -->
      <!-- 新建通知底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <!-- @click="submitForm('numberValidateForm')" -->
        <el-button type="primary" @click="submitForm('formLabelData')">发 布</el-button>
      </span>
    </el-dialog>
    <!-- 新建通知主体部分结束 -->
    <div class="course-notice-contain" v-for="item in msg" :key="item._id">
      <!-- 触发按钮 -->
      <el-button type="text" @click="item.show = true" class="course-btn">
        <div class="course-notice-list">
          <div class="course-notice-list-logo">公告</div>
          <span class="course-notice-list-title">{{ item.title }}</span>
          <span class="course-notice-list-time">{{ TimeFormat(item.Time) }}</span>
        </div>
      </el-button>
      <!-- 弹出消息 -->
      <el-dialog :title="item.title" :visible.sync="item.show" width="30%" :lock-scroll="false" :show-close="false" :close-on-press-escape="false">
        <span class="course-dialog-content">
          {{ item.notice }}
        </span>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="item.show = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCourseNotice, addCourseNotice } from '@/api/teacher/teaCourseDetail/teaCourseNotice.js'
import { formatTime } from '@/utils/formatTime.js'
import { mapState } from 'vuex'
export default {
  created() {
    // 获取网址栏上的课程号
    this.getURl()
  },
  mounted() {
    this.getNotice()
  },
  data() {
    return {
      page: 1,
      limit: 10,
      courseID: '',
      msg: '',
      dialogTableVisible: false,
      // 新建公告表单内容
      formLabelData: {
        title: '',
        content: ''
      },
      // 新建公告表单验证规则
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取课堂通知
    async getNotice() {
      const data = {
        _id: this.$store.state.id,
        _page: this.page,
        _limit: this.limit,
        _courseID: this.courseID
      }
      const msg = await getCourseNotice(data)
      this.msg = msg
    },
    // 获取网址栏上的课程号
    getURl() {
      const url = this.$route.query
      this.courseID = url.courseId
    },
    // 格式化时间
    TimeFormat(data) {
      return formatTime(data)
    },
    // 提交新建公告表单
    submitForm(formName) {
      // this.dialogTableVisible = false
      this.$refs[formName].validate(async (valid) => {
        // 若规则验证成功,调用ajax添加公告
        if (valid) {
          const msg = {
            _data: {
              courseID: this.courseID,
              notice: this.formLabelData.content,
              title: this.formLabelData.title,
              teacherID: this.id,
              courseName: this.courseInfo.name,
              grade: this.courseInfo.grade,
              career: this.courseInfo.career,
              class: this.courseInfo.class
            }
          }
          const data = await addCourseNotice(msg)
          if (data === 'OK') {
            this.$message({
              message: '发布课堂公告成功',
              type: 'success'
            })
            // 添加成功后清空文本框，关闭对话框，并重新获取公告
            this.formLabelData.title = ''
            this.formLabelData.content = ''
            this.dialogTableVisible = false
            this.getNotice()
          }
        } else {
          return false
        }
      })
    }
  },
  computed: {
    ...mapState(['courseInfo', 'id'])
  }
}
</script>

<style lang="less" scoped>
.course-notice {
  // 新建通知按钮
  .add-Notice {
    height: 58px;
    line-height: 42px;
    text-align: right;
    margin-right: 48px;
    border-bottom: 1px solid #ebeef5;

    .el-button {
      width: 128px;
    }
  }

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
