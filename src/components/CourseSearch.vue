// 课程搜索框组件

<template>
  <div class="stu-search">
    <el-input placeholder="请输入内容" v-model="courseSearchInput" clearable class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseSearchInput: '',
    }
  },
}
</script>

<style lang="less" scoped>
.stu-search {
  position: relative;
  float: right;
  width: 320px;
  height: 60px;
  line-height: 60px;
  padding-right: 32px;
}

.el-input-group__append button.el-button:hover {
  color: #409eff !important;
}
</style>
