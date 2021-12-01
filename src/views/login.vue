<template>
  <div>
    <div class="login">
      <div class="login-pic">图片部分</div>
      <div class="login-form">
        <el-form label-width="54px">
          <el-form-item label="用户名"> </el-form-item>
          <el-input type="password"></el-input>
          <el-form-item label="密码"> </el-form-item>
          <el-input type="password"></el-input>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
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
    .el-form-item {
      text-align: left;
    }
  }
}
</style>
