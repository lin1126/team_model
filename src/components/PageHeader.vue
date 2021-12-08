// 页面头部组件
<template>
  <div>
    <div class="page-head">
      <el-page-header @back="goBack" :content="pageHeaderContent"> </el-page-header>
      <div class="stu-search">
        <el-input placeholder="请输入内容" v-model="courseSearchInput" clearable class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: 'pageHeader',
  props: ['pageHeaderContent'],
  data() {
    return {
      courseSearchInput: '',
    }
  },
  methods: {
    goBack() {
      history.back()
    },
  },
}
</script>

<style lang="less" scoped>
.page-head {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
}

.el-divider--horizontal {
  margin: 6px;
}

.el-page-header {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 48px;
}
.stu-search {
  position: absolute;
  top: 0;
  right: 0;
  // float: right;
  width: 320px;
  height: 60px;
  line-height: 60px;
  padding-right: 32px;
}

.el-input-group__append button.el-button:hover {
  color: #409eff !important;
}
</style>
