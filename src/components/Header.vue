<template>
  <div>
    <!-- 登录注销提醒框 -->
    <el-dialog title="警告 " :visible.sync="dialogVisible" width="30%" :modal="false">
      <span>是否注销该账号的登录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exitLogin">确 定</el-button>
      </span>
    </el-dialog>
    <el-row>
      <!-- logo部分 -->
      <el-col :md="4">
        <a :href="role == '学生' ? '/#/stuhomepage/studycourse' : '/#/teaHome'">
          <div class="logo"><el-image fit="contain" style="height: 3rem" :src="url[0]"></el-image></div>
        </a>
      </el-col>
      <el-col :md="{ span: 6, offset: 14 }">
        <!-- 首页头部右边部分 -->
        <div class="header-right">
          <!-- 消息通知部分 -->
          <span class="header-right-icon header-right-notice">
            <!-- 通知图标 -->
            <span style="position: relative">
              <span @click="noticeClick"><el-badge is-dot class="el-icon-bell bell-icon-hover icon-hover zIndex"> </el-badge></span>
              <!-- 点击通知图标时出现的盒子 -->
              <transition name="el-fade-in">
                <div class="floatNotice stophover" v-show="showNotice">
                  <!-- 悬浮消息通知选项卡部分 -->
                  <!-- <el-tabs v-model="activeName" @tab-click="handleClick" stretch="true">-->
                  <el-tabs v-model="activeName">
                    <el-tab-pane label="全部" name="first">
                      <!-- 悬浮消息通知全部选项卡内容部分 -->
                      <div v-for="o in 4" :key="o" class="text item">
                        <span>{{ '作业通知 ' + o }}</span> <span class="small-text">课程：计算机组成原理&nbsp;&nbsp;&nbsp;&nbsp;发布人：林旭云</span>
                      </div>
                      <div v-for="o in 4" :key="o" class="text item">
                        <span>{{ '朋友留言 ' + o }}</span> <span class="small-text">————林旭云</span>
                      </div>
                    </el-tab-pane>
                    <!-- 悬浮消息通知课程通知选项卡内容部分 -->
                    <el-tab-pane label="课程通知" name="second">
                      <div v-for="o in 4" :key="o" class="text item">
                        <span>{{ '作业通知 ' + o }}</span> <span class="small-text">课程：计算机组成原理&nbsp;&nbsp;&nbsp;&nbsp;发布人：林旭云</span>
                      </div>
                    </el-tab-pane>
                    <!-- 悬浮消息通知消息选项卡内容部分 -->
                    <el-tab-pane label="消息" name="third">
                      <div v-for="o in 4" :key="o" class="text item">
                        <span>{{ '朋友留言 ' + o }}</span> <span class="small-text">————林旭云</span>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                  <!-- 悬浮消息通知选项卡底部部分 -->
                  <div class="floatNotice-bottom">
                    <div class="floatNotice-bottom-read"><i class="el-icon-thumb"></i>一键已读</div>
                    <div class="floatNotice-bottom-all"><i class="el-icon-view"></i>全部消息</div>
                  </div>
                </div>
              </transition>
            </span>
          </span>

          <span class="header-right-icon">
            <!-- 用户头像部分 -->
            <el-avatar class="header-right-avatar" shape="circle" size="medium" :src="this.introduction.photo"> </el-avatar>
            <!-- 显示用户名部分 -->
            <span class="header-right-username icon-hover">
              <el-dropdown>
                <span class="el-dropdown-link icon-hover">{{ this.introduction.name }}<i class="el-icon-arrow-down el-icon--right"></i> </span>
                <el-dropdown-menu slot="dropdown">
                  <router-link to="/stuhomepage/stuInfo"><el-dropdown-item>个人中心</el-dropdown-item></router-link>
                  <span @click="dialogVisible = true"><el-dropdown-item>注销</el-dropdown-item></span>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { delCookie } from '@/utils/cookie.js'
export default {
  name: 'Header',
  data() {
    return {
      url: [require('../assets/images/logo.png')],
      activeName: 'first',
      showNotice: false,
      dialogVisible: false,
    }
  },
  methods: {
    noticeClick() {
      this.showNotice = !this.showNotice
    },
    exitLogin() {
      delCookie('Token')
      this.$router.push('/login')
    },
  },
  computed: {
    ...mapState(['role', 'introduction']),
  },
  created() {},
}
</script>

<style lang="less" scoped>
.logo {
  height: 60px;
  text-align: center;
  padding-top: 5px;
  box-sizing: border-box;
}
.header-right {
  position: relative;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  .header-right-icon {
    margin: 0 10px;

    .icon-hover {
      cursor: pointer;
      z-index: 999;
    }
    .icon-hover:hover,
    .bell-icon-hover:hover {
      color: #f56c6c;
    }

    .bell-icon-hover:hover .floatNotice {
      color: #000;
    }
    .stophover:hover {
      color: #000;
    }
    .header-right-avatar {
      position: absolute;
      top: 13px;
      vertical-align: middle;
    }
    // 悬浮消息通知选项卡
    .floatNotice {
      z-index: 99;
      position: absolute;
      top: 34px;
      right: 0px;
      width: 420px;
      min-height: 120px;
      padding: 10px 16px;
      background-color: #fff;
      border: 2px solid #e7e7e7;
      border-radius: 6px;
      box-shadow: inset 0 0 6px #e7e7e7;
      line-height: 1.5;
      .el-tab-pane {
        padding: 0 16px;
      }

      .text {
        font-size: 16px;
      }
      .small-text {
        float: right;
        font-size: 12px;
        color: #acbbd6;
      }
      .item {
        padding: 9px 0;
      }
      .item:hover {
        background-color: #ecf5ff !important;
        color: #409eff;
      }

      .floatNotice-bottom {
        display: flex;
        width: 100%;
        height: 40px;
        font-size: 16px;
        padding: 10px 0;
        color: #409eff;
        box-sizing: border-box;

        .floatNotice-bottom-read,
        .floatNotice-bottom-all {
          flex: 1;
          text-align: center;
          cursor: pointer;

          .el-icon-thumb,
          .el-icon-view {
            padding-right: 6px;
          }
        }
      }
    }
    .floatNotice::before {
      content: '';
      position: absolute;
      top: -24px;
      right: 0;
      width: 0;
      height: 0;
      border: 16px solid transparent;
      border-bottom: 16px solid #fff;
    }
    .el-badge {
      vertical-align: inherit;
    }
  }
  .header-right-notice {
    margin-right: 24px;
  }
  .header-right-username {
    margin-left: 52px;

    .el-dropdown-link {
      cursor: pointer;
    }
  }
}
</style>
