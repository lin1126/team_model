<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-row>
        <el-col :xs="2"
                :sm="2"
                :md="4">
          <div class="aside">
            <TeaAside></TeaAside>
          </div>
        </el-col>
        <el-col :xs="22"
                :sm="22"
                :md="20">
          <el-main>
            <!-- 利用路由切换主内容部分 -->
            <router-view></router-view>
          </el-main>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/TeaHeader.vue'
import TeaAside from '@/components/teaAside.vue'
export default {
  name: 'stuHomePage',
  components: {
    Header,
    TeaAside,
  },
}
</script>

<style lang="less" scoped>
.el-header {
  z-index: 999;
  background-color: #79bbff;
  color: #333;
  padding: 0;
  box-shadow: 0 3px 3px #dcdfe6;
}
.aside {
  min-height: calc(100vh - 74px);
  background-color: #fff;
  text-align: left;
  padding: 1rem 0;
  border: 0;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  box-sizing: border-box;
}

.el-main {
  position: relative;
  min-height: calc(100vh - 90px);
  margin: 1rem;
  padding: 10px;
  border-radius: 14px;
  background-color: #fff;
  color: #333;
  box-sizing: border-box;
}
</style>
