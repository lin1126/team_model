<template>
  <div>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-row>
        <el-col :xs="2" :sm="2" :md="4"
          ><div class="aside"><Aside></Aside></div
        ></el-col>
        <el-col :xs="22" :sm="22" :md="20"><el-main>Main</el-main></el-col>
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
.el-header {
  z-index: 999;
  background-color: #79bbff;
  color: #333;
  padding: 0;
  box-shadow: 0 3px 3px #dcdfe6;
}
.aside {
  background-color: #fff;
  text-align: left;
  height: 800px;
  border-bottom-left-radius: 8px;
}

.el-main {
  height: 500px;
  background-color: #fff;
  color: #333;
  margin: 1rem 0 0 1rem;
  padding: 0;
}
</style>
