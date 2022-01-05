<template>
  <div>
    <!-- 页面头部内容 -->
    <div class="page-head">
      <PageHeader pageHeaderContent="教学课程"> </PageHeader>
      <div class="stu-search">
        <el-input placeholder="请输入内容" v-model="courseSearchInput" clearable class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 添加课程按键 -->
    <div class="add-course-btn">
      <!-- 添加课程头部 -->
      <el-dialog title="新建课程" :visible.sync="dialogTableVisible" style="text-align: left">
        <!-- 添加课程主体部分 -->
        <div class="form-course">
          <el-form label-position="left" label-width="80px" :model="fromCourse">
            <el-form-item label="课程名称">
              <el-input v-model="fromCourse.name"></el-input>
            </el-form-item>
            <el-form-item label="所属机构">
              <el-input v-model="fromCourse.organization"></el-input>
            </el-form-item>
            <el-form-item label="课程学期">
              <el-select v-model="fromCourse.semester" placeholder="请选择课程学期">
                <el-option label="2021-2022第一学期" value="2021-2022第一学期"></el-option>
                <el-option label="2021-2022第二学期" value="2021-2022第二学期"></el-option>
                <el-option label="2022-2023第一学期" value="2022-2023第一学期"></el-option>
                <el-option label="2022-2023第二学期" value="2022-2023第二学期"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="课程封面">
              <div class="course-img">
                <el-image :src="fromCourse.url" key="scale-down" style="width: 250px; height: 150px"></el-image>
              </div>
              <div class="change-img">
                <span class="edit-link"><el-link icon="el-icon-edit" :underline="false" type="primary">修改封面</el-link></span>
                <span class="tips">支持jpg/jpeg/gif/png格式 建议单张图片不超过4M 课程封面图最佳尺寸：800*480</span>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <!-- 添加课程底部 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">完 成</el-button>
        </div>
      </el-dialog>
      <!-- 添加按钮 -->
      <el-button type="primary" icon="el-icon-plus" @click="dialogTableVisible = true" round>添加课程</el-button>
    </div>
    <!-- 课程盒子部分 -->
    <div class="study-contain">
      <el-row :gutter="10">
        <!-- 正在进行课程的盒子开始 -->
        <router-link :to="'/teacourseDetail?courseId=' + item._id" target="_blank" v-for="item in underwayCourse" :key="item._id">
          <el-col :lg="{ span: 6, offset: 2, pull: 1 }">
            <div class="course-box">
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
              <div class="course-teacher">{{ item.courseDetail[0].class }}</div>
            </div>
          </el-col>
        </router-link>
        <!-- 正在进行课程盒子结束 -->
        <!-- 遮蔽图层  -->

        <!-- 正在进行课程的盒子开始 -->
        <router-link :to="'/teacourseDetail?courseId=' + item._id" target="_blank" v-for="item in endCourse" :key="item._id">
          <el-col :lg="{ span: 6, offset: 2, pull: 1 }">
            <div class="course-box">
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
              <div class="course-teacher">{{ item.courseDetail[0].class }}</div>
            </div>
          </el-col>
        </router-link>
        <!-- 正在进行课程盒子结束 -->
      </el-row>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { getTeaCourse } from '@/api/teacher/teaCourse.js'

export default {
  name: 'teaCourse',
  components: {
    PageHeader,
  },
  data() {
    return {
      courseSearchInput: '',
      courseId: 1001,
      isEnd: true,
      // 新建课程对话框显示变量
      dialogTableVisible: false,
      // 添加课程中表单的数据
      fromCourse: {
        name: '',
        organization: '',
        semester: '',
        url: ' http://39.105.106.13:9999/stuphoto/stuphoto.jpg',
      },
      endCourse: '',
      underwayCourse: '',
    }
  },
  methods: {
    // 获取课程
    async getCourse() {
      const data = {
        _teacherID: this.$store.state.id,
      }
      const msg = await getTeaCourse(data)
      // 提取正在进行和已结束的课程
      this.endCourse = msg.filter((value, index, array) => {
        return value.courseDetail[0].state === 'end'
      })
      this.underwayCourse = msg.filter((value, index, array) => {
        return value.courseDetail[0].state === 'underway'
      })
    },
  },
  created() {
    this.getCourse()
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
      z-index: 999;
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
.add-course-btn {
  height: 60px;
  padding: 10px 50px 0;
  box-sizing: border-box;
  text-align: right;

  ::v-deep .el-dialog__header {
    border-bottom: 1px solid #f9f9f9 !important;
  }
  .dialog-footer {
    padding: 10px;
    border-top: 1px solid #f9f9f9 !important;
  }
  // 课程表单界面
  .form-course {
    padding: 0 24px;

    .course-img {
      display: inline-block;
      width: 250px;
      height: 150px;
    }

    .change-img {
      width: 250px;
      display: inline-block;
      padding-left: 24px;
      line-height: 25px;

      .edit-link {
        display: block;
        padding-bottom: 8px;
      }

      .tips {
        font-size: 8px;
        color: #a7a7b2;
        height: 20px;
      }
    }
  }
}
</style>
