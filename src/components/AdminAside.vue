<template>
  <div>
    <!-- 只有我管理的里面的课程、班级，还有个人中心中的基本资料与学生不一样，其他都一样 -->
    <el-menu :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-video-camera"></i>实时监控</template>
        <router-link to="/adminhome/adminvideo"><el-menu-item index="1-1">视频监控 </el-menu-item></router-link>
        <router-link to="/adminhome/adminenvironment"><el-menu-item index="1-2">环境监控</el-menu-item></router-link>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-bangzhu"></i>远程控制</template>
        <router-link to="/adminhome/admindevicecontrol"><el-menu-item index="2-1">设备控制</el-menu-item></router-link>
        <router-link to="/adminhome/adminmotioncontrol"><el-menu-item index="2-2">监控控制</el-menu-item></router-link>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-document-copy"></i>历史记录</template>
        <router-link to="/adminhome/adminhumitureshow"><el-menu-item index="3-1">温湿度数据</el-menu-item></router-link>
        <router-link to="/adminhome/admindeviceshow"><el-menu-item index="3-2">设备使用数据</el-menu-item></router-link>
        <router-link to="/adminhome/adminpictureshow"><el-menu-item index="3-3">教室图片采集</el-menu-item></router-link>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title" style="padding-left: 40px"><i class="el-icon-user"></i>个人中心</template>
        <router-link to="/adminhome/admininfo"><el-menu-item index="4-1">基本资料</el-menu-item></router-link>
        <router-link to="/adminhome/adminPhoto"><el-menu-item index="4-2">我的头像</el-menu-item></router-link>
        <router-link to="/adminhome/adminPassword"><el-menu-item index="4-3">修改密码</el-menu-item></router-link>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'adminHomePage',
}
</script>

<style lang="less" scoped>
.el-submenu .el-menu-item {
  padding-left: 68px !important;
}
</style>
