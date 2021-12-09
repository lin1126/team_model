<template>
  <div>
    <!-- 页面头部内容 -->
    <div class="page-head">
      <PageHeader pageHeaderContent="系统消息"> </PageHeader>
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
                    &nbsp;<span>系统消息</span>
                  </div>
                  <!-- 通知的发布课程 -->
                  <div class="notify-from">
                    <span class="notify-tip"> 来自：</span>
                    <a href="#"><span class="notify-author">智慧教室研发团队</span></a>
                  </div>
                  <!-- 鼠标移动时的操作模块 -->
                  <div class="notify-del">删除</div>
                </div>
              </template>
              <!-- 通知内容主体 -->
              <div class="notify-content">
                <div class="notify-tip">通知内容：</div>
                <span class="notify-contain">
                  各位学习通用户：
                  近日，有不法分子在其他平台以冒充军人等身份，或以婚恋交友等名义为借口，告诉用户只能使用学习通进行交流，诱导用户下载学习通。通过伪造身份、编造话术，骗取信任后，将其引入到博彩、理财等所谓投资平台，或借口资金紧张，给其转钱等手段进行行骗。为了保护广大用户的个人信息以及财产安全，在此提醒广大用户：网上交友一定要谨慎，保护好自身的隐私，涉及金钱往来一定要提高警惕，做到不轻信、多核实，加强自我防范意识，不给诈骗分子提供可乘之机！
                  一旦发现有对方有诈骗行为，或已上当受骗，保留相关证据（手机号码、网络联络账号、双方沟通聊天记录、汇款转账账号及截图），尽快报警并在学习通平台进行举报（平台举报方式：点击对方头像，在个人详情页里点击举报）。 另，注册学习通后，请尽快进行实名认证或单位认证，避免在使用中造成不便与困扰。
                  学习通是基于微服务架构打造的课程学习，知识传播与管理分享平台。它利用超星20余年来积累的海量的图书、期刊、报纸、视频、原创等资源，集知识管理、课程学习、专题创作，办公应用为一体，为读者提供一站式学习与工作环境。
                  在网络诈骗频发的严峻环境下，学习通也将陆续布控一系列打击措施和安全防控措施。保护平台绿色、良好、健康的环境是超星集团绝不退让的底线！ 警方提醒： 凡是刷单，都是诈骗！凡是通过网络交友，诱导进行投资或理财的，都是诈骗！凡是自称“领导”、“熟人”要求汇款的，都是诈骗！
                  要牢记“三不一多”原则：未知链接不点击，陌生来电不轻信，个人信息不透露，转账汇款多核实。如不幸上当受骗，应立即拨打当地110报警电话进行报警。
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
