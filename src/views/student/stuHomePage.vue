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
            <Aside></Aside>
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
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
export default {
  name: 'stuHomePage',
  components: {
    Header,
    Aside,
  },
}
</script>

<style lang="less" scoped>
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c8;
}
.el-header {
  z-index: 999;
  background-color: #79bbff;
  color: #333;
  padding: 0;
  box-shadow: 0 3px 3px #dcdfe6;
}
.aside {
  overflow: auto;
  max-height: calc(100vh - 74px) !important;
  background-color: #fff;
  text-align: left;
  padding: 1rem 0;
  border: 0;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  box-sizing: border-box;
}

.el-main {
  overflow: auto;
  position: relative;
  max-height: calc(100vh - 90px);
  min-height: calc(100vh - 90px);
  margin: 1rem;
  padding: 10px;
  border-radius: 14px;
  background-color: #fff;
  color: #333;
  box-sizing: border-box;
}
</style>
