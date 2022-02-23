<template>
  <div>
    <div>
      <!-- 页面头部内容 -->
      <div class="page-head">
        <PageHeader pageHeaderContent="教室图片展示"> </PageHeader>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>

      <div class="banner">
        <!-- 轮播图部分开始 -->
        <div class="banner-content">
          <el-carousel :interval="4000" type="card" height="320px">
            <el-carousel-item v-for="item in src" :key="item">
              <h3 class="medium"><img :src="item" alt="" /></h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 轮播图部分结束 -->
        <!-- 底下图片列表部分开始 -->
        <div class="banner-list">
          <div class="demo-image__preview" v-for="item in srclist" :key="item">
            <el-image style="width: 212px; height: 160px  border-radius: 8px;" :src="item" :preview-src-list="srclist"> </el-image>
            <span class="image-time">2022-10-11 10:11:24</span>
          </div>
          <i v-for="item in srclist.length - 1" :key="item"></i>
        </div>
        <!-- 底下图片列表部分结束 -->
      </div>
    </div>
  </div>
</template>

<script>
// import { formatTime } from '@/utils/formatTime.js'
import PageHeader from '@/components/PageHeader.vue'
export default {
  name: 'adminPictureShow',
  components: {
    PageHeader,
  },
  data() {
    return {
      src: ['http://39.105.106.13:9999/img/1.jpg', 'http://39.105.106.13:9999/img/2.jpg', 'http://39.105.106.13:9999/img/3.jpg', 'http://39.105.106.13:9999/img/4.jpg'],
      srclist: [
        'http://39.105.106.13:9999/img/1.jpg',
        'http://39.105.106.13:9999/img/2.jpg',
        'http://39.105.106.13:9999/img/1.jpg',
        'http://39.105.106.13:9999/img/2.jpg',
        'http://39.105.106.13:9999/img/3.jpg',
        'http://39.105.106.13:9999/img/4.jpg',
        'http://39.105.106.13:9999/img/1.jpg',
        'http://39.105.106.13:9999/img/2.jpg',
        'http://39.105.106.13:9999/img/1.jpg',
        'http://39.105.106.13:9999/img/2.jpg',
        'http://39.105.106.13:9999/img/3.jpg',
        'http://39.105.106.13:9999/img/4.jpg',
        'http://39.105.106.13:9999/img/4.jpg',
        'http://39.105.106.13:9999/img/4.jpg',
      ],
      formatList: [],
    }
  },
  methods: {},
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

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  line-height: 320px;
  margin: 0;
}

.banner {
  position: relative;
  height: 360px;
  .banner-content {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 360px;
    left: 50%;
    transform: translateX(-50%);
    padding: 12px 68px;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
  }

  .banner-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    padding-top: 385px;
    margin: 15px 10px 0 0;
  }

  .banner-list > i {
    width: 212px;
    margin-right: 10px;
  }
  .demo-image__preview {
    // flex: 1;
    .image-time {
      display: block;
      width: 212px;
      text-align: center;
      padding: 12px 0 24px 0;
    }
  }
}
</style>
