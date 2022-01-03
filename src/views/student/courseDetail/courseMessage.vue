<template>
  <!-- 课程留言模块 -->
  <div class="course-message">
    <!-- 发布留言主体 -->
    <div class="course-message-post">
      <div class="course-message-photo">
        <el-avatar :size="48" fit="fill" :src="url"></el-avatar>
      </div>
      <div class="course-message-textarea">
        <el-input type="textarea" placeholder="说点什么吧~~~" v-model="textarea" maxlength="200" show-word-limit resize="none" rows="5"> </el-input>
        <!-- 发布留言主体底部发布按钮 -->
        <div class="course-message-textarea-bottom"><el-button type="primary" round>发表留言</el-button></div>
      </div>
    </div>

    <!-- 留言列表留言头部 -->
    <div class="course-message-header">留言 <span class="number"> (54576)</span></div>
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
        <div class="course-message-reply">
          <p><span>刘莉珠：</span> 历朝历代不乏自己父母被自己丈夫干掉的人，但还是死心塌地的人</p>
          <div class="course-message-reply-link">
            <a href="javaScript:;">2021-8-21</a>
          </div>
        </div>
        <div class="course-message-reply">
          <p><span>刘莉珠：</span> 历朝历代不乏自己父母被自己丈夫干掉的人，但还是死心塌地的人。</p>
          <div class="course-message-reply-link"><a href="javaScript:;">2021-8-21</a></div>
        </div>
        <div class="course-message-reply">
          <p><span>刘莉珠：</span> 历朝历代不乏自己父母被自己丈夫干掉的人，但还是死心塌地的人。历朝历代不乏自己父母被自己丈夫干掉的人，但还是死心塌地的人历朝历代不乏自己父母被自己丈夫干掉的人，但还是死心塌地的人历朝历代不乏自己父母被自己丈夫干掉的人，但还是死心塌地的人</p>
          <div class="course-message-reply-link"><a href="javaScript:;">2021-8-21</a></div>
          <div class="course-message-reply-more">
            <a href="#">查看更多回复<i class="el-icon-arrow-right"></i></a>
          </div>
        </div>
        <!-- 单个评论底部回复部分 -->
        <div class="course-message-bottom">
          <a href="#"> <i class="el-icon-chat-square"></i><span style="margin-left: 4px">回复</span> </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCourseMessage } from '@/api/student/courseDetail/courseMessage.js'
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
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      textarea: '',
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
    }
  }
}
</style>
