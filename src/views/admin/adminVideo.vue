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
      <div class="people-number">
        <span>人数：{{ stuNumber }}</span>
      </div>
      <!-- 打开监控按钮 -->
      <div class="open-btn">
        <transition name="el-zoom-in-center">
          <el-button type="primary" plain v-if="openShow" @click="openMotion()">开启摄像头</el-button>
        </transition>
        <transition name="el-zoom-in-center">
          <el-button type="primary" plain v-if="closeShow" @click="closeMotion()">关闭摄像头</el-button>
        </transition>
      </div>
      <!-- 教室人数展示部分结束 -->
      <!-- 监控画面图像部分开始 -->
      <div class="demo-image__placeholder">
        <div class="block">
          <transition name="el-fade-in-linear">
            <el-image :src="src" @error="motionError()" @load="motionSuccess()" v-if="imageShow">
              <div slot="placeholder" class="image-slot">正在加载画面中<span class="dot">...</span></div>
              <div slot="error" class="image-slot">
                <span class="dot" v-if="errorTip">加载失败，请检查摄像头是否发生故障。</span>
                <span class="dot" v-else>加载失败，请打开摄像头。</span>
              </div>
            </el-image>
          </transition>
        </div>
      </div>
      <!-- 监控画面图像部分结束 -->
    </div>
  </div>
</template>

<script>
// 引入mqtt
import { client } from '../../utils/mqtt'
import PageHeader from '@/components/PageHeader.vue'
export default {
  name: 'adminVideo',
  components: {
    PageHeader,
  },
  created() {
    this.mqttMsg()
  },
  beforeDestroy() {
    this.doUnSubscribe('raspi/student')
  },
  data() {
    return {
      src: 'http://192.168.137.32:4242/',
      // src: 'http://39.105.106.13:8000/',
      // 教室内人数
      stuNumber: 45,
      errorShow: false,
      openShow: false,
      closeShow: false,
      errorTip: false,
      imageShow: true,
    }
  },
  methods: {
    // 获取mqtt数据
    mqttMsg() {
      client.on('connect', (e) => {
        console.log('连接成功！！！')
        client.subscribe('raspi/student', { qos: 0 }, (error) => {
          if (!error) {
            console.log('订阅raspi/student主题成功')
          } else {
            console.log('订阅raspi/student主题失败')
          }
        })
      })
      client.subscribe('raspi/student', { qos: 0 }, (error) => {
        if (!error) {
          console.log('订阅raspi/student主题成功')
        } else {
          console.log('订阅raspi/student主题失败')
        }
      })

      // 接收消息处理
      client.on('message', (topic, message) => {
        if (topic === 'raspi/student') {
          const mess = message.toString()
          console.log('收到来自', topic, '的消息', mess)
          const jsonMess = JSON.parse(mess)
          this.stuNumber = jsonMess.stuNumber
        }
      })
    },

    // 取消订阅mqtt主题
    doUnSubscribe(topic) {
      client.unsubscribe(topic, (error) => {
        if (error) {
          console.log('Unsubscribe error', error)
        }
        console.log(`取消订阅MQTT主题：${topic}成功`)
      })
    },

    // 发布mqtt数据
    mqttSet(topic, jsonmsg) {
      // 订阅topic主题
      client.publish(topic, jsonmsg)
      // 发布信息
    },

    // 视频加载失败时执行的方法
    motionError() {
      if (this.errorShow === true) {
        this.errorTip = true
      }
      this.closeShow = false
      this.openShow = true
      this.errorShow = true
    },

    // 视频加载成功时执行的方法
    motionSuccess() {
      this.openShow = false
      this.errorShow = false
      setTimeout(() => {
        this.closeShow = true
      }, 100)
      this.errorTip = false
    },

    // 打开摄像头
    openMotion() {
      this.mqttSet('raspi/motion', '{"motion":"True"}')
      this.imageShow = false
      setTimeout(() => {
        this.imageShow = true
      }, 100)
    },

    // 关闭摄像头
    closeMotion() {
      this.mqttSet('raspi/motion', '{"motion":"False"}')
      this.closeShow = false
      setTimeout(() => {
        this.openShow = true
      }, 100)
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
  .open-btn {
    z-index: 111;
    display: inline;
    position: absolute;
    bottom: 0;
    left: -200px;
    transform: translateX(276%);
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
