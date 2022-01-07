<template>
  <div>
    <!-- 页面头部内容 -->
    <div class="page-head">
      <PageHeader pageHeaderContent="基本资料"> </PageHeader>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <div class="stu-info-card">
      <!-- 学生基本资料 -->
      <div class="stu-info-basic-card">
        <el-descriptions title="用户基本资料" direction="vertical" :column="3" border size="medium ">
          <!-- 右上角操作按钮 -->
          <template slot="extra">
            <el-button type="primary" size="small" @click="isEdit = !isEdit" v-if="!isEdit">编辑</el-button>
            <el-button type="primary" size="small" @click="saveEdit" v-if="isEdit">保存</el-button>
            <el-button type="primary" size="small" @click="isEdit = !isEdit" v-if="isEdit">退出</el-button>
          </template>
          <el-descriptions-item label="姓名" label-class-name="stu-info-label">
            <span v-if="!isEdit">{{ stuInfo.name }}</span>
            <el-input type="text" placeholder="请输入内容" v-model="stuInfo.name" maxlength="10" show-word-limit v-if="isEdit" disabled> </el-input>
          </el-descriptions-item>
          <el-descriptions-item label="学号">
            <span v-if="!isEdit">{{ stuInfo.ID }}</span>
            <el-input type="text" placeholder="请输入内容" v-model="stuInfo.ID" maxlength="20" show-word-limit v-if="isEdit" disabled> </el-input>
          </el-descriptions-item>
          <el-descriptions-item label="身份">
            <el-tag size="medium">{{ stuInfo.identity }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="学校">
            <span v-if="!isEdit">{{ stuInfo.school }}</span>
            <el-input type="text" placeholder="请输入内容" v-model="stuInfo.school" maxlength="20" show-word-limit v-if="isEdit" disabled> </el-input>
          </el-descriptions-item>
          <el-descriptions-item label="院系">
            <span v-if="!isEdit">{{ stuInfo.college }}</span>
            <el-input type="text" placeholder="请输入内容" v-model="stuInfo.college" maxlength="15" show-word-limit v-if="isEdit" disabled> </el-input>
          </el-descriptions-item>
          <el-descriptions-item label="">
            <div style="min-width: 200px" v-if="isEdit"></div>
          </el-descriptions-item>
          <el-descriptions-item label="通信地址" :labelStyle="{ 'text-align': 'center' }" :contentStyle="{ 'text-align': 'center' }">
            <span v-if="!isEdit">{{ stuInfo.place ? stuInfo.place : '未填写通信地址' }}</span>
            <span>
              <el-input type="text" placeholder="请输入您的通信地址" v-model="stuInfo.place" maxlength="30" show-word-limit v-if="isEdit"> </el-input>
            </span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!-- 手机号解绑提醒框 -->
      <el-dialog title="警告 " :visible.sync="dialogVisible" width="30%">
        <span>是否确认解绑该手机号?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="unbindPhone">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 邮箱解绑提醒框 -->
      <el-dialog title="警告" :visible.sync="emailVisible" width="30%">
        <span>是否确认解绑该邮箱?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="emailVisible = false">取 消</el-button>
          <el-button type="primary" @click="unbindEmail">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 学生账号信息 -->
      <div class="stu-info-account-card">
        <h4>用户账号设置</h4>
        <ul>
          <li>
            <span class="stu-info-label-title">账号</span>
            <span class="stu-info-label-content">{{ stuInfo.ID }}</span>
          </li>
          <li>
            <span class="stu-info-label-title">手机号</span>
            <span class="stu-info-label-content" v-if="!isPhone">{{ stuInfo.phone ? stuInfo.phone : '未绑定' }}</span>
            <el-input type="text" placeholder="请输入您的手机号" v-model="stuInfo.phone" maxlength="20" v-if="isPhone"> </el-input>
            <span class="stu-info-label-btn" v-if="stuInfo.phone && !isPhone">
              <a href="javascript:;" @click="isPhone = !isPhone">更换手机号</a>
              <a href="javascript:;" @click="dialogVisible = true">解绑</a>
            </span>
            <span class="stu-info-label-btn" v-if="!stuInfo.phone && !isPhone">
              <a href="javascript:;" @click="isPhone = !isPhone">点击绑定</a>
            </span>
            <span class="stu-info-label-btn" v-if="isPhone">
              <a href="javascript:;" @click="savePhone">保存</a>
              <a href="javascript:;" @click="isPhone = !isPhone">取消</a>
            </span>
          </li>
          <li>
            <span class="stu-info-label-title">邮箱</span>
            <span class="stu-info-label-content" v-if="!isEmail">{{ stuInfo.email ? stuInfo.email : '未绑定' }}</span>
            <el-input type="text" placeholder="请输入您的邮箱" v-model="stuInfo.email" maxlength="25" v-if="isEmail"> </el-input>
            <span class="stu-info-label-btn" v-if="stuInfo.email && !isEmail">
              <a href="javascript:;" @click="isEmail = !isEmail">更换邮箱</a>
              <a href="javascript:;" @click="emailVisible = true">解绑</a>
            </span>
            <span class="stu-info-label-btn" v-if="!stuInfo.email && !isEmail">
              <a href="javascript:;" @click="isEmail = !isEmail">点击绑定</a>
            </span>
            <span class="stu-info-label-btn" v-if="isEmail">
              <a href="javascript:;" @click="saveEmail">保存</a>
              <a href="javascript:;" @click="isEmail = !isEmail">取消</a>
            </span>
          </li>
          <li>
            <span class="stu-info-label-title">密码</span>
            <span class="stu-info-label-content">******</span>
            <span class="stu-info-label-btn">
              <router-link to="/teahome/teaPassword">修改密码</router-link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { updateInfo } from '@/api/student/stuInfo.js'
import { mapState } from 'vuex'

export default {
  name: 'stuInfo',
  components: {
    PageHeader,
  },
  data() {
    return {
      // 用户资本资料输入框显示变量
      isEdit: false,
      // 手机输入框显示变量
      isPhone: false,
      isEmail: false,
      stuInfo: {},
      dialogVisible: false,
      emailVisible: false,
    }
  },
  methods: {
    // 保存更改的地址
    saveEdit() {
      updateInfo(this.introduction.ID, 'place', this.introduction.place)
      this.isEdit = false
    },
    // 解绑手机号
    unbindPhone() {
      this.introduction.phone = ''
      updateInfo(this.introduction.ID, 'phone', this.introduction.phone)
      this.dialogVisible = false
    },
    // 解绑邮箱
    unbindEmail() {
      this.introduction.email = ''
      updateInfo(this.introduction.ID, 'email', this.introduction.email)
      this.emailVisible = false
    },
    // 保存更改后的手机号
    savePhone() {
      updateInfo(this.introduction.ID, 'phone', this.introduction.phone)
      this.isPhone = false
    },
    // 保存更改后的邮箱
    saveEmail() {
      updateInfo(this.introduction.ID, 'email', this.introduction.email)
      this.isEmail = false
    },
  },
  computed: {
    ...mapState(['introduction']),
    formatClass() {
      return `${this.stuInfo.grade} ${this.stuInfo.career} ${this.stuInfo.class}班`
    },
  },
  created() {
    this.stuInfo = this.introduction
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

.stu-info-card {
  // height: 500px;
  padding: 24px 32px;

  .stu-info-account-card > ul {
    padding: 0;
    border: 1px solid #ebeef5;
    border-radius: 4px;
  }

  .stu-info-account-card > ul > li {
    list-style: none;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ebeef5;

    .el-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 60% !important;
    }
  }

  .stu-info-label-title {
    display: inline-block;
    width: 160px;
    padding: 0 16px;
  }

  .stu-info-label-btn {
    float: right;
    padding-right: 32px;
  }

  .stu-info-label-btn > a {
    padding: 0 10px;
    color: #79bbff;
  }
}
</style>
