<template>
  <!-- 课程留言模块 -->
  <div class="course-message">
    <!-- 发布留言主体 -->
    <div class="course-message-post">
      <div class="course-message-photo">
        <el-avatar :size="48" fit="fill" :src="this.$store.state.introduction.photo"></el-avatar>
      </div>
      <!-- 留言文本框部分开始 -->
      <div class="course-message-textarea">
        <el-input type="textarea" placeholder="说点什么吧~~~" v-model="textarea" maxlength="200" show-word-limit resize="none" rows="5"> </el-input>
        <!-- 发布留言主体底部发布按钮 -->
        <div class="course-message-textarea-bottom">
          <el-button type="primary" round @click="setMessage()">发表留言</el-button>
        </div>
      </div>
      <!-- 留言文本框部分结束 -->
    </div>

    <!-- 留言列表留言头部 -->
    <div class="course-message-header">留言</div>
    <!-- 已发布留言列表 -->
    <div class="course-message-list" v-for="item in msg" :key="item._id">
      <!-- 头像部分 -->
      <div class="course-message-photo">
        <el-avatar :size="48" fit="fill" :src="item.stuInfo[0].photo"></el-avatar>
      </div>
      <!-- 留言部分 -->
      <div class="course-message-content">
        <h4>
          {{ item.stuInfo[0].name }} <span class="date">{{ TimeFormat(item.time) }}</span>
        </h4>
        <p>
          {{ item.message }}
        </p>
        <!-- 回复部分 -->
        <div class="course-message-reply" v-for="child in item.children" :key="child._id">
          <p>
            <span>{{ child.name }}：</span> {{ child.message }}
          </p>
          <div class="course-message-reply-link">
            <a href="javaScript:;">{{ TimeFormat(child.time) }}</a>
          </div>
        </div>

        <!-- 单个评论底部回复部分 -->
        <div class="course-message-bottom">
          <a href="javascript:;" :style="item.isShow ? 'color: #409eff' : 'color: #91919e'">
            <i class="el-icon-chat-square"></i>
            <!-- 关闭其他文本框,并清空文本框内容,避免冲突 -->
            <span
              style="margin-left: 4px"
              @click="
                if (item.isShow == false) {
                  msg.forEach((i) => {
                    i.isShow = false
                  })
                }
                item.isShow = !item.isShow
                textarea_children = ''
              "
              >{{ item.isShow ? '收起' : '回复' }}
            </span>
          </a>
          <div v-show="item.isShow">
            <div style="margin-left: 34px; margin-right: 88px"><el-input type="textarea" :rows="3" v-model="textarea_children" resize="none"> </el-input></div>
            <div class="reply-btn"><el-button type="primary" @click="setchildrenMes(item._id)">回复</el-button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourseMessage, setCourseMessage, setCourseMesChildren } from '@/api/student/courseDetail/courseMessage.js'
import { formatTime } from '@/utils/formatTime.js'
export default {
  created() {
    this.getURl()
  },
  mounted() {
    this.getMessage()
  },
  data() {
    return {
      textarea: '',
      textarea_children: '',
      courseID: '',
      page: 1,
      limit: 10,
      msg: '',
    }
  },
  methods: {
    // 获取留言
    async getMessage() {
      const data = {
        _courseID: this.courseID,
        _page: this.page,
        _limit: this.limit,
      }
      this.msg = await getCourseMessage(data)
    },
    // 留言
    async setMessage() {
      const data = {
        _courseID: this.courseID,
        _ID: this.$store.state.id,
        _content: this.textarea,
      }
      const msg = await setCourseMessage(data)
      if (msg === 'OK') {
        this.$message({
          message: '发布留言成功',
          type: 'success',
        })
        this.textarea = ''
        this.getMessage()
      }
    },
    // 回复留言的子留言
    async setchildrenMes(childrenID) {
      const data = {
        _childrenID: childrenID,
        _ID: this.$store.state.id,
        _message: this.textarea_children,
        _name: this.$store.state.introduction.name,
      }
      const msg = await setCourseMesChildren(data)
      if (msg === 'OK') {
        this.$message({
          message: '留言成功',
          type: 'success',
        })
        this.textarea_children = ''
        this.getMessage()
      }
    },
    // 获取网址栏上的课程号
    getURl() {
      const url = this.$route.query
      this.courseID = url.courseId
    },
    // 格式化时间
    TimeFormat(data) {
      return formatTime(parseInt(data))
    },
  },
}
</script>

<style lang="less" scoped>
.course-message {
  padding: 10px 128px 10px 24px;
  .course-message-header {
    font-weight: 400;
    font-size: 28px;
    padding-bottom: 16px;

    .number {
      font-size: 16px;
      color: #adadb0;
      margin-left: 8px;
    }
  }

  .course-message-post {
    position: relative;
    padding-bottom: 48px;
    .course-message-textarea {
      height: 188px;
      // background-color: red;
      margin-left: 68px;

      ::v-deep .el-textarea__inner {
        border-radius: 0;
      }
    }

    .course-message-textarea-bottom {
      height: 70px;
      line-height: 70px;
      border: 1px solid #dcdfe6;
      border-top: 0;
      text-align: right;
      padding-right: 18px;
    }
  }
  .course-message-photo {
    position: absolute;
    top: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
  }
  .course-message-list {
    position: relative;
    min-height: 128px;
    // background-color: pink;
    padding: 24px 0;
    border-top: 1px solid#dcdfe6;

    .course-message-photo {
      top: 24px;
    }

    .course-message-content {
      margin-left: 68px;

      h4 {
        margin: 0;
        padding: 10px 0;
        font-weight: 400;

        .date {
          padding: 0 12px;
          font-size: 12px;
          color: #91919e;
        }
      }

      p {
        text-indent: 2rem;
        margin: 0;
        margin-bottom: 18px;
        line-height: 24px;
      }

      .course-message-reply {
        padding: 6px 10px 0 10px;
        background-color: #f7f7f7;

        span {
          color: #000;
          font-weight: 700;
        }

        p {
          margin-bottom: 4px;
          padding-left: 2rem;
          text-indent: 0;
          font-size: 14px;
          line-height: 26px;
          color: #91919e;
        }

        .course-message-reply-link a,
        .course-message-reply-more a {
          margin-left: 34px;
          font-size: 10px;
          color: #91919e;
        }
        .course-message-reply-link span {
          padding-left: 12px;
          font-size: 10px;
          color: #91919e;
        }
        .course-message-reply-more {
          padding: 14px 0;
        }
      }

      .course-message-bottom a {
        display: block;
        height: 24px;
        line-height: 24px;
        margin-left: 34px;
        padding: 14px 0;
        font-size: 14px;
        color: #91919e;
      }

      .course-message-bottom .reply-btn {
        position: absolute;
        bottom: 24px;
        right: 2px;
        width: 88px;
        height: 75px;

        .el-button {
          float: left;
          width: 100%;
          height: 100%;
          padding: 0;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
  }
}
</style>
