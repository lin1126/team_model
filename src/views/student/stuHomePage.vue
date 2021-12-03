<template>
  <div>
    <el-container>
      <el-header><Header></Header></el-header>
      <el-row>
        <el-col :xs="2" :sm="2" :md="4"><div class="aside">Aside</div></el-col>
        <el-col :xs="22" :sm="22" :md="20"><el-main>Main</el-main></el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'stuHomePage',
  components: {
    Header,
  },
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #fff;
  color: #333;
  padding: 0;
  box-shadow: 0 -3px 3px #dcdfe6 inset;
}
.aside {
  background-color: #79bbff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
