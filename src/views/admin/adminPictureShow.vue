<template>
  <div>
    <div>
      <!-- 页面头部内容 -->
      <div class="page-head">
        <PageHeader pageHeaderContent="教室图片展示"> </PageHeader>
      </div>
      <div class="right">
        <el-date-picker v-model="value" value-format="timestamp" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="chageTime()"> </el-date-picker>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>

      <div class="banner">
        <!-- 轮播图部分开始 -->
        <div class="banner-content">
          <el-carousel :interval="4000" type="card" height="320px">
            <el-carousel-item v-for="item in src" :key="item">
              <h3 class="medium"><el-image :src="item" alt="" /></h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 轮播图部分结束 -->
        <!-- 底下图片列表部分开始 -->
        <div class="banner-list" v-infinite-scroll="load" :infinite-scroll-delay="500" :infinite-scroll-disabled="isDisabled">
          <div class="demo-image__preview" v-for="(item, index) in srclist" :key="item">
            <div class="image-box">
              <el-image style="width: 212px; height: 160px  border-radius: 8px;" :src="item" :preview-src-list="srclist" lazy> </el-image>
            </div>
            <span class="image-time">{{ srcTime[index] }}</span>
          </div>
          <i v-for="item in srclist.length - 1" :key="item"></i>
        </div>
        <p v-if="loading" class="loading-tip">加载中...</p>
        <p v-if="noMore" class="loading-tip">没有更多了</p>
        <!-- 底下图片列表部分结束 -->
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/formatTime.js'
import { getPictureApi, getPictureByTimeApi } from '@/api/admin/adminPictureShow.js'
import PageHeader from '@/components/PageHeader.vue'
export default {
  name: 'adminPictureShow',
  components: {
    PageHeader,
  },
  data() {
    return {
      src: [],
      // 图片列表
      srclist: [],
      // 图片时间列表
      srcTime: [],
      formatList: [],
      // 是否加载
      loading: true,
      noMore: false,
      // 是否禁用滚动加载
      isDisabled: false,
      // 选择时间区间
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      // 选择查询的时间
      value: '',
      page: 1,
      limit: 20,
    }
  },
  created() {
    this.getPicture()
  },
  methods: {
    // 获取图片
    async getPicture() {
      const msg = await getPictureApi(this.page, this.limit)
      if (msg.length === 0) {
        // 加载中文字改成没有更多了，禁止滚动加载触发
        this.loading = false
        this.noMore = true
        this.isDisabled = true
        return
      }
      msg.PicDirInfo.forEach((element, index, array) => {
        this.srcTime.push(formatTime(parseInt(element)))
        this.srclist.push(`http://39.105.106.13:9999/upload/${element}.jpg`)
      })
      this.src = this.srclist.slice(0, 5)
    },
    // 根据时间查询图片
    async getPictureByTime() {
      const msg = await getPictureByTimeApi(this.value[0], this.value[1], this.page, this.limit)
      if (msg.length === 0) {
        // 加载中文字改成没有更多了，禁止滚动加载触发
        this.loading = false
        this.noMore = true
        this.isDisabled = true
        return
      }
      msg.PicDirInfo.forEach((element, index, array) => {
        this.srcTime.push(formatTime(parseInt(element)))
        this.srclist.push(`http://39.105.106.13:9999/upload/${element}.jpg`)
      })
    },

    // 选中时间改变时触发
    chageTime() {
      this.page = 1
      this.noMore = false
      this.loading = true
      this.isDisabled = false
      this.srcTime = []
      this.srclist = []
      // 如果有选中时间的话
      if (this.value !== null) {
        this.getPictureByTime()
      } else {
        this.getPicture()
      }
    },
    // 下滑加载的方法
    load() {
      this.loading = true
      this.page++
      console.log(this.value)
      if (this.value === '' || this.value === null) {
        this.getPicture()
      } else {
        this.getPictureByTime()
      }
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
.right {
  position: absolute;
  top: 0;
  right: 24px;
  transform: translateY(50%);
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
    width: 212px;

    .image-box {
      width: 212px;
      height: 170px;
    }
    .image-time {
      display: block;
      width: 212px;
      text-align: center;
      padding: 12px 0 24px 0;
    }
  }
  .loading-tip {
    text-align: center;
    padding-bottom: 28px;
    font-size: 20px;
  }
}
</style>
