// 页面头部组件
<template>
  <div>
    <el-page-header @back="goBack" :content="pageHeaderContent"> </el-page-header>
  </div>
</template>

<script>
export default {
  name: 'pageHeader',
  props: ['pageHeaderContent'],
  data() {
    return {}
  },
  methods: {
    goBack() {
      history.back()
    },
  },
}
</script>

<style lang="less" scoped>
.el-page-header {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 48px;
}
</style>
