<template>
  <div>
    <!-- 页面头部内容 -->
    <div class="page-head">
      <PageHeader pageHeaderContent="视频监控"> </PageHeader>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <div class="motion_show">
      <!-- 教室人数展示部分开始 -->
      <div class="people-number"><span>人数：42</span></div>
      <!-- 教室人数展示部分结束 -->
      <!-- 监控画面图像部分开始 -->
      <div class="demo-image__placeholder">
        <div class="block">
          <el-image :src="src">
            <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
            <div slot="error" class="image-slot">
              <span class="dot">加载失败，请检查摄像头是否正常开启。</span>
            </div>
          </el-image>
        </div>
      </div>
      <!-- 监控画面图像部分结束 -->
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
export default {
  name: 'adminVideo',
  components: {
    PageHeader,
  },
  data() {
    return {
      src: 'http://192.168.137.32:4242/',
      // src: 'http://39.105.106.13:8000/',
    }
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
.motion_show {
  position: relative;
  overflow: hidden;
  text-align: center;
  margin-top: 32px;

  .people-number {
    z-index: 111;
    position: absolute;
    top: 16px;
    right: 50%;
    transform: translateX(440%);
    span {
      color: #fff;
    }
  }
}
.block .el-image {
  width: 640px;
  height: 480px;
  border-radius: 16px;
  border: 0;
  text-align: center;
  line-height: 480px;
  background-color: hsl(0, 0%, 25%);
  color: #fff;
}
</style>
