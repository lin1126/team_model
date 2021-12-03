<template>
  <div class="login">
    <div class="login-pic">图片部分</div>
    <div class="login-form">
      <el-form label-width="54px" label-position="top" :model="loginForm">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.userpwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 验证码部分开始 -->
        <el-form-item label="验证码">
          <el-input v-model="loginForm.userInputCode" style="width: 50%" placeholder="请输入验证码"></el-input>
          <div @click="refreshCode" class="coderight">
            <identify :identifyCode="identifyCode"></identify>
          </div>
        </el-form-item>
        <!-- 验证码部分结束 -->
        <el-form-item>
          <el-button type="primary" round style="width: 100%" @click="loginSubmit">登录</el-button>
        </el-form-item>
        <div class="login-link">
          <el-link type="primary" :underline="false">立即注册</el-link>&nbsp;
          <el-link type="primary" :underline="false">找回密码</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入验证码组件
import identify from '@/components/identify.vue'
import { checkCodeofRandom } from '@/utils/codeRandom.js'
export default {
  name: 'Login',
  components: {
    identify,
  },
  data() {
    return {
      loginForm: {
        username: '',
        userpwd: '',
        userInputCode: '',
      },
      identifyCode: '',
    }
  },
  methods: {
    refreshCode() {
      this.identifyCode = checkCodeofRandom(4)
    },
    // 判断验证码是否正确
    checkEqual() {
      if (this.identifyCode.toUpperCase() === this.loginForm.userInputCode.toUpperCase()) {
        return true
      } else {
        return false
      }
    },
    // 登录按钮事件
    loginSubmit() {
      alert(this.checkEqual())
    },
  },
  computed: {},
  created() {
    this.identifyCode = checkCodeofRandom(4)
  },
}
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 1000px;
  height: 580px;
  background-color: pink;
  padding: 10px;
  transform: translate(-50%, -50%);
  border-radius: 18px;

  .login-pic {
    float: left;
    width: 500px;
    height: 580px;
    background-color: green;
  }

  .login-form {
    float: left;
    width: 500px;
    height: 580px;
    padding: 80px 80px;
    box-sizing: border-box;

    .coderight {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }

    .login-link {
      float: right;
    }
  }
}
</style>
