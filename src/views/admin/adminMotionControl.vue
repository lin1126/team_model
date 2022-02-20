<template>
  <div>
    <div>
      <!-- 页面头部内容 -->
      <div class="page-head">
        <PageHeader pageHeaderContent="视频控制"> </PageHeader>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
export default {
  name: 'adminMotionControl',
  components: {
    PageHeader,
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
</style>
