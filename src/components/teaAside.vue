<template>
  <div>
    <!-- 只有我管理的里面的课程、班级，还有个人中心中的基本资料与学生不一样，其他都一样 -->
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-reading"></i>我管理的</template>
        <router-link to="/teahome/teacourse"><el-menu-item index="1-1">教学课程 </el-menu-item></router-link>
        <router-link to="/teahome/teaclass"><el-menu-item index="1-2">班级管理</el-menu-item></router-link>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-chat-line-round"></i>收件箱</template>
        <router-link to="/teahome/infromClass"><el-menu-item index="2-1">课堂通知</el-menu-item></router-link>
        <router-link to="/teahome/message"><el-menu-item index="2-2">系统消息</el-menu-item></router-link>
      </el-submenu>

      <router-link to="/teahome/classroomQuery"
        ><el-menu-item index="3"><i class="el-icon-search"></i>空教室查询</el-menu-item></router-link
      >

      <el-submenu index="4">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-user"></i>个人中心</template>
        <router-link to="/teahome/teainfo"><el-menu-item index="4-1">基本资料</el-menu-item></router-link>
        <router-link to="/teahome/teaPhoto"><el-menu-item index="4-2">我的头像</el-menu-item></router-link>
        <router-link to="/teahome/teaPassword"><el-menu-item index="4-3">修改密码</el-menu-item></router-link>
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
