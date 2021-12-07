<template>
  <div id="app">
    <router-view></router-view>
    <el-backtop :bottom="80" :right="20">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            text-align: center;
            color: #79bbff;
            line-height: 100%;
          }
        "
      >
        回到顶部<i class="el-icon-top" style="transform: translateY(1px)"></i>
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
}
.el-backtop {
  width: 100px;
  border-radius: 14px;
  font-size: 16px;
}
</style>
