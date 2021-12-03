<template>
  <div>
    <el-row>
      <!-- logo部分 -->
      <el-col :md="4">
        <div class="logo"><el-image fit="cover" style="height: 32px" :src="url[0]"></el-image></div>
      </el-col>
      <el-col :md="{ span: 6, offset: 14 }">
        <div class="header-right">
          <span class="header-right-icon"><i class="el-icon-setting"></i></span>
          <span class="header-right-icon"> <i class="el-icon-bell"></i></span>
          <span class="header-right-icon"> <el-avatar class="header-right-avatar" shape="circle" size="medium" :src="url[1]"></el-avatar> <span class="header-right-username">林成俊</span> </span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      url: [require('../assets/images/logo.png'), 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
    }
  },
}
</script>

<style lang="less" scoped>
.logo {
  height: 60px;
  text-align: center;
  padding-top: 14px;
  box-sizing: border-box;
}
.header-right {
  position: relative;
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  .header-right-icon {
    margin: 0 10px;
  }
  .header-right-avatar {
    position: absolute;
    top: 13px;
    vertical-align: middle;
  }
  .header-right-username {
    margin-left: 46px;
    font-size: 14px;
  }
}
</style>
