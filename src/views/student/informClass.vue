<template>
  <div>
    <!-- 页面头部内容 -->
    <div class="page-head">
      <PageHeader pageHeaderContent="课堂通知"> </PageHeader>
      <div class="stu-search">
        <el-input placeholder="请输入内容" v-model="courseSearchInput" clearable class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- 课堂通知主体部分 -->
    <div class="notification-content">
      <!-- 课堂通知头部导航栏部分 -->
      <div class="notify-tab">
        <div class="notify-checkAll" v-show="checkboxShow">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll">全选</el-checkbox>
          &nbsp;&nbsp;
          <span>
            已选: <span class="notify-selected">{{ this.courseSelectNumber }}</span>
          </span>
          &nbsp;&nbsp;
          <el-link type="danger" icon="el-icon-delete" :underline="false">删除</el-link>
        </div>
        <div class="notify-operate"><el-link type="primary" icon="el-icon-edit" :underline="false">批量编辑</el-link></div>
        <div class="notify-read">
          <el-link type="primary" :underline="false"><i class="el-icon-view el-icon--left"></i>一键已读 </el-link>
        </div>
      </div>
      <el-checkbox-group v-model="checkedCities">
        <!-- 课堂通知盒子部分 -->
        <div class="notify-card">
          <!-- 实现手风琴效果 -->
          <el-collapse accordion>
            <!-- 单个盒子 -->
            <el-collapse-item>
              <template slot="title">
                <!-- 通知卡片头部 -->
                <div class="notify-card-header">
                  <!-- 通知的标题 -->
                  <div class="notify-title">
                    <!-- 多选框按钮,点击批量编辑时显示 -->
                    <div class="notify-checkbox">
                      <el-checkbox label="1" v-show="checkboxShow">&nbsp;</el-checkbox>
                    </div>
                    <el-badge is-dot class="item">
                      <div class="notify-icon"><i class="el-icon-bell"></i></div>
                    </el-badge>
                    &nbsp;<span>课堂通知</span>
                  </div>
                  <!-- 通知的发布课程 -->
                  <div class="notify-from">
                    <span class="notify-tip"> 来自：</span>
                    <a href="#"><span class="notify-author">物联网工程导论</span></a>
                  </div>
                  <!-- 鼠标移动时的操作模块 -->
                  <div class="notify-del">删除</div>
                </div>
              </template>
              <!-- 通知内容主体 -->
              <div class="notify-content">
                <div class="notify-tip">通知内容：</div>
                <span class="notify-contain">
                  亲们，我们的课程成绩已全部录入到教学系统中。大家可以在教学系统中查询成绩了。 如果你感觉本课程还不错的话，敬请在学校教务系统的评价中给予100分评价，这也是对老师的最大鼓励了。 感谢这一个学期以来的陪伴。
                  如果你觉得老师有需要改进的地方，请直接回复本条通知，或在QQ上和我反馈（Q号：1105459082）。 下学期欢迎选修我的其他课程。有任何疑问，欢迎随时联系。再次感谢。我会想念大家的。
                </span>
              </div>
              <div class="notify-content-bottom">
                <span class="notify-tip">发布时间：</span>
                <span class="notify-date">2021-06-23 19:52:52</span>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'

export default {
  name: 'informClass',
  components: {
    PageHeader,
  },
  data() {
    return {
      courseSearchInput: '',
      isIndeterminate: true,
      checkedCities: ['1'],
      checkboxShow: true,
      courseSelectNumber: 2,
    }
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

.notification-content {
  padding: 10px 16px;

  .notify-tab {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background-color: #eef1f6;

    .notify-checkAll {
      display: inline-block;
      padding-left: 8px;
      line-height: 48px;
    }

    .notify-operate,
    .notify-read {
      float: right;
      display: inline;
      padding: 0 24px;
    }

    .notify-selected {
      color: #708bff;
      font-size: 14px;
    }
  }

  .notify-card {
    padding: 24px;

    .notify-card-header {
      width: 100%;

      .notify-checkbox {
        display: inline-block;
      }

      .notify-title {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        padding: 8px 12px;

        .notify-icon {
          display: inline-block;
          width: 32px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          font-size: 20px;
          background-color: #72aee8;
          border-radius: 50%;
        }
      }

      .notify-from {
        display: inline-block;
        padding-left: 24px;

        .notify-author {
          font-size: 12px;
          color: #acb4bf;
        }
        .notify-author:hover {
          color: #3a8bff;
        }
      }

      .notify-del {
        display: none;
        float: right;
        padding-right: 128px;
        font-size: 16px;
        color: #3a8bff;
      }
    }

    .notify-card-header:hover {
      background-color: #f7fafc;
    }

    .notify-card-header:hover .notify-del {
      display: block;
    }

    .notify-tip {
      font-size: 14px;
      color: #72aee8;
      padding: 14px 0;
    }

    .notify-content {
      padding: 8px 12px;

      .notify-contain {
        padding-left: 2rem;
        font-size: 16px;
      }
    }

    .notify-content-bottom {
      padding: 8px 12px 0 12px;
    }

    .notify-date {
      font-size: 14px;
      color: #acb4bf;
    }
  }
}
</style>
