<template>
  <div class="login-bgc">
    <div class="login">
      <!-- 登录界面图片部分 -->
      <div class="login-pic">
        <el-image style="width: 100%; height: 100%" :src="url[0]" fit="cover"></el-image>
        <div class="big-cloud">
          <el-image style="width: 100%; height: 100%" :src="url[2]" fit="cover"></el-image>
        </div>
        <div class="small-clound">
          <el-image style="width: 100%; height: 100%" :src="url[2]" fit="cover"></el-image>
        </div>
        <div class="mini-clound">
          <el-image style="width: 100%; height: 100%" :src="url[2]" fit="cover"></el-image>
        </div>
      </div>
      <!-- 登录界面表单界面 -->
      <div class="login-form">
        <div class="login-logo">
          <el-image style="width: 200px" :src="url[1]" fit="cover"></el-image>
        </div>
        <el-form :rules="rules" ref="ruleForm" label-width="54px" label-position="top" :model="loginForm" style="padding: 0">
          <el-form-item label="账号" prop="username">
            <el-input placeholder="请输入账号" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpwd">
            <el-input v-model="loginForm.userpwd" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- 验证码部分开始 -->
          <el-form-item label="验证码" prop="userInputCode">
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
  </div>
</template>

<script>
// 引入验证码组件
import identify from '@/components/identify.vue'
import { checkCodeofRandom } from '@/utils/codeRandom.js'
import { login } from '@/api/login.js'
import { setCookie } from '@/utils/cookie.js'

export default {
  name: 'Login',
  components: {
    identify,
  },
  data() {
    // 自定义表单规则，判断验证码是否正确
    const validateCode = (rule, value, callback) => {
      if (this.identifyCode.toUpperCase() === value.toUpperCase()) {
        callback()
      } else {
        this.refreshCode()
        callback(new Error('验证码不匹配!'))
      }
    }
    return {
      loginForm: {
        username: '',
        userpwd: '',
        userInputCode: '',
      },
      identifyCode: '',
      url: [require('../assets/images/login.png'), require('../assets/images/logo.png'), require('../assets/images/cloud1.png')],
      // 验证规则
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        userpwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        userInputCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            validator: validateCode,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 生成四位随机验证码
    refreshCode() {
      this.identifyCode = checkCodeofRandom(4)
    },
    // 登录按钮事件
    loginSubmit() {
      // alert(this.checkEqual())
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const msg = { username: this.loginForm.username, userpwd: this.loginForm.userpwd }
          const data = await login(msg)
          if (parseInt(data.code) === 10000) {
            // 设置cookie销毁时间为7天
            setCookie('Token', data.aceessToken, 60 * 60 * 24 * 7)
            if (data.identify === '学生') {
              this.$router.push({ path: '/stuhomepage/studycourse' })
            } else if (data.identify === '教师') {
              this.$router.push({ path: '/teahome/teacourse' })
            }
          } else {
            this.$message.error({
              message: data.mes,
            })
          }
        }
      })
    },
  },
  computed: {},
  created() {
    this.identifyCode = checkCodeofRandom(4)
  },
}
</script>

<style lang="less" scoped>
@keyframes bigCloudMoveFirst {
  0% {
    top: 96px;
    left: 335px;
  }
  100% {
    top: 180px;
    left: 500px;
  }
}
@keyframes bigCloudMove {
  0% {
    top: -80px;
    left: 0;
  }

  100% {
    top: 180px;
    left: 500px;
  }
}
@keyframes smallCloudMoveFirst {
  0% {
    top: 95px;
    left: 164px;
  }
  100% {
    top: 268px;
    left: 500px;
  }
}
@keyframes smallCloudMove {
  0% {
    top: -30px;
    left: -60px;
  }

  100% {
    top: 268px;
    left: 500px;
  }
}
@keyframes miniCloudMoveFirst {
  0% {
    top: 0px;
    left: 286px;
  }
  100% {
    top: 125px;
    left: 500px;
  }
}

@keyframes miniCloudMove {
  0% {
    top: -40px;
    left: 212px;
  }

  100% {
    top: 125px;
    left: 500px;
  }
}
.login-bgc {
  width: 100%;
  height: 100%;
  background-color: #c7edff;
}
.login {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 1000px;
  height: 580px;
  // background-color: #fff;
  padding: 10px;
  transform: translate(-50%, -50%);
  border-radius: 18px;

  .login-pic {
    position: absolute;
    overflow: hidden;
    top: 50%;
    transform: translateY(-50%);
    width: 500px;
    height: 480px;
    background-color: #fff;

    .big-cloud {
      position: absolute;
      top: 96px;
      left: 335px;
      width: 80px;
      height: 80px;
      animation: bigCloudMoveFirst 20s ease-in, bigCloudMove 45s ease-in 20s infinite;
    }

    .small-clound {
      position: absolute;
      top: -30px;
      left: -60px;
      top: 95px;
      left: 164px;
      width: 60px;
      height: 60px;
      animation: smallCloudMoveFirst 35s ease-in, smallCloudMove 55s ease-in 35s infinite;
    }

    .mini-clound {
      position: absolute;
      top: 0px;
      left: 286px;
      width: 40px;
      height: 40px;
      animation: miniCloudMoveFirst 45s ease-in, miniCloudMove 60s ease-in 45s infinite;
    }
  }

  .login-form {
    position: relative;
    float: right;
    width: 500px;
    height: 580px;
    padding: 100px 80px 80px 80px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0px 4px 32px -16px rgba(0, 135, 203, 0.5);
    border-radius: 4px;
    .login-logo {
      position: absolute;
      top: 30px;
      left: 50%;
      transform: translateX(-50%);
    }

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
