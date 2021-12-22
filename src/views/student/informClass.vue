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
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          &nbsp;&nbsp;
          <span>
            已选: <span class="notify-selected">{{ this.checkedCities.length }}</span>
          </span>
          &nbsp;&nbsp;
          <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="是否删除选中的通知？">
            <el-link slot="reference" type="danger" icon="el-icon-delete" :underline="false">全部删除</el-link>
          </el-popconfirm>
        </div>
        <div class="notify-operate" @click="checkboxShow = !checkboxShow"><el-link type="primary" icon="el-icon-edit" :underline="false">批量编辑</el-link></div>
        <div class="notify-read">
          <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" icon="el-icon-question" icon-color="#ff9900" title="是否将所有消息设为已读？">
            <el-link slot="reference" type="primary" :underline="false"><i class="el-icon-view el-icon--left"></i>一键已读 </el-link>
          </el-popconfirm>
        </div>
      </div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <!-- 课堂通知盒子部分 -->
        <div class="notify-card">
          <!-- 实现手风琴效果 -->
          <el-collapse accordion>
            <!-- 单个盒子 -->
            <el-collapse-item v-for="item in data" :key="item._id">
              <template slot="title">
                <!-- 通知卡片头部 -->
                <div class="notify-card-header">
                  <!-- 通知的标题 -->
                  <div class="notify-title">
                    <!-- 多选框按钮,点击批量编辑时显示 -->
                    <div class="notify-checkbox">
                      <el-checkbox :label="item._id" v-show="checkboxShow">&nbsp;</el-checkbox>
                    </div>
                    <el-badge :is-dot="item.State == 'true' ? false : true" class="item">
                      <div class="notify-icon"><i class="el-icon-bell"></i></div>
                    </el-badge>
                    &nbsp;<span>{{ item.type }}</span>
                  </div>
                  <!-- 通知的发布课程 -->
                  <div class="notify-from">
                    <span class="notify-tip"> 来自：</span>
                    <a href="#"
                      ><span class="notify-author">{{ item.courseName }}</span></a
                    >
                  </div>
                  <!-- 鼠标移动时的操作模块 -->
                  <div class="notify-del" @click="eventFn($event)">
                    <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" icon="el-icon-info" icon-color="red" title="是否删除该通知？">
                      <el-link slot="reference" :underline="false">删除</el-link>
                    </el-popconfirm>
                  </div>
                </div>
              </template>
              <!-- 通知内容主体 -->
              <div class="notify-content">
                <div class="notify-tip">通知内容：</div>
                <span class="notify-contain">
                  {{ item.notice }}
                </span>
              </div>
              <div class="notify-content-bottom">
                <span class="notify-tip">发布时间：</span>
                <span class="notify-date">{{ TimeFormat(item.Time) }}</span>
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
import { getCourse } from '@/api/student/informClass.js'
import { formatTime } from '@/utils/formatTime.js'
export default {
  name: 'informClass',
  components: {
    PageHeader,
  },
  created() {
    // 获取课程公告消息
    this.getCourseNotice()
  },
  data() {
    return {
      courseSearchInput: '',
      isIndeterminate: true,
      // 选中的选项
      checkedCities: [],
      checkboxShow: false,
      checkAll: false,
      // 全部选项
      cities: [],
      data: '',
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    async getCourseNotice() {
      const req = { _id: this.$store.state.id, _page: '', _limit: '' }
      const data = await getCourse(req)
      data.forEach((value) => {
        this.cities.push(value._id)
      })
      this.data = data
    },
    TimeFormat(data) {
      return formatTime(data)
    },
    // 阻止冒泡行为
    eventFn(e) {
      e.stopPropagation()
    },
  },
  computed: {},
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
