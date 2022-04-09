<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view></router-view>
    </transition>
    <el-backtop :bottom="80"
                :right="20">
      <div style="
           {
            height: 100%;
            width: 100%;
            text-align: center;
            color: #79bbff;
            line-height: 100%;
          }
        ">
        回到顶部<i class="el-icon-top"
           style="transform: translateY(1px)"></i>
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  created () {
    //   this.$request
    //     .post('login', { username: '1631808212211d', userpwd: '212211' })
    //     .then((res = {}) => {
    //       console.log(res)
    //     })
    //     .catch((e) => {
    //       console.log(e)
    //       // catch 可以不要，如果想要捕获异常，就加上去
    //     })
  },
}
</script>

<style lang="less" scoped>
#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.el-backtop {
  width: 100px;
  border-radius: 14px;
  font-size: 16px;
}
</style>
