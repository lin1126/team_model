<template>
  <div>
    <el-menu :default-openeds="['1', '2']">
      <el-submenu index="1">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-message"></i>我的课程</template>
        <el-menu-item index="1-1">正在学习</el-menu-item>
        <el-menu-item index="1-2">已结束</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-message"></i>收件箱</template>
        <el-menu-item index="2-1">课程通知</el-menu-item>
        <el-menu-item index="2-2">消息</el-menu-item>
      </el-submenu>

      <el-menu-item index="3"><i class="el-icon-message"></i>空教室查询</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.el-submenu .el-menu-item {
  padding-left: 68px !important;
}
</style>
