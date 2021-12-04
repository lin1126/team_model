<template>
  <div>
    <el-menu :default-openeds="['1', '2']">
      <el-submenu index="1">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-reading"></i>我的课程</template>
        <el-menu-item index="1-1">正在学习</el-menu-item>
        <el-menu-item index="1-2">已结束</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-chat-line-round"></i>收件箱</template>
        <el-menu-item index="2-1">课堂通知</el-menu-item>
        <el-menu-item index="2-2">消息</el-menu-item>
      </el-submenu>

      <el-menu-item index="3"><i class="el-icon-search"></i>空教室查询</el-menu-item>

      <el-submenu index="4">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-user"></i>个人中心</template>
        <el-menu-item index="4-1">基本资料</el-menu-item>
        <el-menu-item index="4-2">我的头像</el-menu-item>
        <el-menu-item index="4-3">修改密码</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'stuHomePage',
}
</script>

<style lang="less" scoped>
.el-submenu .el-menu-item {
  padding-left: 68px !important;
}
</style>
