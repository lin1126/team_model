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
            <el-button type="primary" size="small" @click="changeEditState" v-if="!isEdit">编辑</el-button>
            <el-button type="primary" size="small" @click="changeEditState" v-if="isEdit">保存</el-button>
            <el-button type="primary" size="small" @click="changeEditState" v-if="isEdit">退出</el-button>
          </template>
          <el-descriptions-item label="姓名" label-class-name="stu-info-label">
            <span v-if="!isEdit">{{ stuInfo.name }}</span>
            <el-input type="text" placeholder="请输入内容" v-model="stuInfo.name" maxlength="10" show-word-limit v-if="isEdit" disabled> </el-input>
          </el-descriptions-item>
          <el-descriptions-item label="工号">
            <span v-if="!isEdit">{{ stuInfo.number }}</span>
            <el-input type="text" placeholder="请输入内容" v-model="stuInfo.number" maxlength="20" show-word-limit v-if="isEdit" disabled> </el-input>
          </el-descriptions-item>
          <el-descriptions-item label="身份">
            <el-tag size="medium">{{ stuInfo.identity }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="学校">
            <span v-if="!isEdit">{{ stuInfo.school }}</span>
            <el-input type="text" placeholder="请输入内容" v-model="stuInfo.school" maxlength="20" show-word-limit v-if="isEdit" disabled> </el-input>
          </el-descriptions-item>
          <el-descriptions-item label="院系">
            <span v-if="!isEdit">{{ stuInfo.department }}</span>
            <el-input type="text" placeholder="请输入内容" v-model="stuInfo.department" maxlength="15" show-word-limit v-if="isEdit" disabled> </el-input>
          </el-descriptions-item>
          <el-descriptions-item label="通信地址" :labelStyle="{ 'text-align': 'center' }" :contentStyle="{ 'text-align': 'center' }">
            <span v-if="!isEdit">{{ stuInfo.address }}</span>
            <el-input type="text" placeholder="请输入内容" v-model="stuInfo.address" maxlength="50" show-word-limit v-if="isEdit"> </el-input>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <!-- 学生账号信息 -->
      <div class="stu-info-account-card">
        <h4>用户账号设置</h4>
        <ul>
          <li>
            <span class="stu-info-label-title">账号</span>
            <span class="stu-info-label-content">{{ stuInfo.number }}</span>
          </li>
          <li>
            <span class="stu-info-label-title">手机号</span>
            <span class="stu-info-label-content">13328823562</span>
            <span class="stu-info-label-btn">
              <a href="#">更换手机号</a>
              <a href="#">解绑</a>
            </span>
          </li>
          <li>
            <span class="stu-info-label-title">邮箱</span>
            <span class="stu-info-label-content">670542311@qq.com</span>
            <span class="stu-info-label-btn">
              <a href="#">更换邮箱</a>
              <a href="#">解绑</a>
            </span>
          </li>
          <li>
            <span class="stu-info-label-title">密码</span>
            <span class="stu-info-label-content">******</span>
            <span class="stu-info-label-btn">
              <router-link to="/stuhomepage/stuPassword">修改密码</router-link>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'

export default {
  name: 'teaInfo',
  components: {
    PageHeader,
  },
  data() {
    return {
      isEdit: false,
      stuInfo: { name: '林旭云', number: 38277721, identity: '教师', school: '福建江夏学院', department: '电子信息科学学院', address: '福建省莆田市' },
    }
  },
  methods: {
    changeEditState() {
      this.isEdit = !this.isEdit
    },
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
