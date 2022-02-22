<template>
  <div>
    <div>
      <!-- 页面头部内容 -->
      <div class="page-head">
        <PageHeader pageHeaderContent="设备控制"> </PageHeader>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 设备控制页控制模式部分 -->
      <div v-loading="fullscreenLoading">
        <div class="device_head">
          <!-- 头部左边模块 -->
          <div class="device_head_left">
            <!-- 控制模式开关 -->
            <el-switch v-model="autocontrol" :width="60" style="display: block" active-text="自动控制" inactive-text="手动控制"> </el-switch>
          </div>
          <!-- 头部右边模块 -->
          <div class="device_head_right">
            <div class="hint">
              <!-- 鼠标悬浮显示提示信息  -->
              <el-popover placement="top-start" title="使用说明" width="200" trigger="hover" content="如果需要控制设备,请切换至手动模式.">
                <el-button class="el-icon-question" slot="reference"></el-button>
              </el-popover>
            </div>
            <div class="descript">
              <h3>当前控制模式为</h3>
              <br />
              <br />
              <span>{{ autocontrolmsg }}</span>
            </div>
          </div>
        </div>

        <!-- 设备控制页面控制设备部分 -->
        <div class="device_contain">
          <div class="device_contain_children device_led">
            <span>空调</span><br /><br />
            <img :src="airsrc" /><br /><br />
            <el-switch style="display: block" v-model="aircon" active-text="开" inactive-text="关" :disabled="autocontrol"> </el-switch>
          </div>
          <div class="device_contain_children device_humidifier">
            <span>加湿器</span><br /><br />
            <img :src="humisrc" /><br /><br />
            <el-switch style="display: block" v-model="humidifier" active-text="开" inactive-text="关" :disabled="autocontrol"> </el-switch>
          </div>
          <div class="device_contain_children device_aircon">
            <span>照明灯</span><br /><br />
            <img :src="ledsrc" /><br /><br />
            <el-switch style="display: block" v-model="led" active-text="开" inactive-text="关" :disabled="autocontrol"> </el-switch>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { client } from '../../utils/mqtt'
import PageHeader from '@/components/PageHeader.vue'
export default {
  name: 'adminDeviceControl',
  components: {
    PageHeader,
  },
  data() {
    return {
      autocontrol: false,
      autocontrolmsg: '手动控制模式',
      dht11: true,
      humidifier: false,
      led: false,
      aircon: false,
      humisrc: require('../../assets/images/humioff.png'),
      airsrc: require('../../assets/images/airoff.png'),
      ledsrc: require('../../assets/images/ledoff.png'),
      // 加载图层
      fullscreenLoading: true,
    }
  },
  created() {
    this.mqttMsg()
  },
  beforeDestroy() {
    this.doUnSubscribe('raspi/device')
  },
  methods: {
    // 获取mqtt数据
    mqttMsg() {
      client.on('connect', (e) => {
        console.log('连接成功！！！')
        client.subscribe('raspi/device', { qos: 0 }, (error) => {
          if (!error) {
            console.log('订阅raspi/device主题成功')
          } else {
            console.log('订阅raspi/device主题失败')
          }
        })
      })
      client.subscribe('raspi/device', { qos: 0 }, (error) => {
        if (!error) {
          console.log('订阅raspi/device主题成功')
        } else {
          console.log('订阅raspi/device主题失败')
        }
      })

      // 接收消息处理
      client.on('message', (topic, message) => {
        if (topic === 'raspi/device') {
          this.fullscreenLoading = false
          const mess = message.toString()
          console.log('收到来自', topic, '的消息', mess)
          const jsonMess = JSON.parse(mess)
          this.autocontrol = jsonMess.autocontrol
          this.dht11 = jsonMess.dht11
          this.humidifier = jsonMess.humidifier
          this.led = jsonMess.led
          this.aircon = jsonMess.aircon
        }
      })
    },
    // 发布mqtt数据
    mqttSet(topic, jsonmsg) {
      // 订阅topic主题
      client.publish(topic, jsonmsg)
      // 发布信息
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
  },
  watch: {
    humidifier: function (newVal, oldVal) {
      if (newVal === true) {
        this.mqttSet('raspi/humidifier', '{"humidifier":"True"}')
        this.humisrc = require('../../assets/images/humion.png')
      } else if (newVal === false) {
        this.mqttSet('raspi/humidifier', '{"humidifier":"False"}')
        this.humisrc = require('../../assets/images/humioff.png')
      }
    },
    aircon: function (newVal, oldVal) {
      if (newVal === true) {
        this.mqttSet('raspi/aircon', '{"aircon":"True"}')
        this.airsrc = require('../../assets/images/airon.png')
      } else if (newVal === false) {
        this.mqttSet('raspi/aircon', '{"aircon":"False"}')
        this.airsrc = require('../../assets/images/airoff.png')
      }
    },
    led: function (newVal, oldVal) {
      if (newVal === true) {
        this.mqttSet('raspi/led', '{"led":"True"}')
        this.ledsrc = require('../../assets/images/ledon.png')
      } else if (newVal === false) {
        this.mqttSet('raspi/led', '{"led":"False"}')
        this.ledsrc = require('../../assets/images/ledoff.png')
      }
    },
    autocontrol: function (newVal, oldVal) {
      if (newVal === true) {
        this.autocontrolmsg = '自动控制模式'
        this.mqttSet('raspi/control', ' {"method":"True"}')
      } else if (newVal === false) {
        this.autocontrolmsg = '手动控制模式'
        this.mqttSet('raspi/control', '{"method":"False"}')
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

.el-divider--horizontal {
  margin: 6px;
}
.device {
  margin: 0 32px;
}
.device_head {
  position: relative;
  display: flex;
  width: 100%;
  height: 160px;
  margin-top: 24px;
}

.device_contain {
  display: flex;
  width: calc(100% - 64px);
  height: 264px;
  padding-top: 16px;
  background-color: #fff;
  margin-bottom: 24px;
  text-align: center;
  border-radius: 5px;
  margin: 32px 32px 0 32px;
}

.device_contain_children {
  overflow: hidden;
  flex: 1;
  margin-left: 16px;
  padding-top: 16px;
  /* background: #161e29; */
  border-radius: 14px;
}
.device_contain_children:nth-child(1) {
  margin-left: 0;
}
.device_contain img {
  width: 144px;
  height: 144px;
  background-color: #000;
  border-radius: 16px;
}
.device_head .hint {
  position: absolute;
  top: 26px;
  left: 187px;
  background-color: #cfe8fc;
  .el-button {
    background-color: #cfe8fc !important;
  }
}

.device_head_left,
.device_head_right {
  position: relative;
  flex: 1;
  text-align: center;
}
.device_head_right .descript {
  width: 240px;
  height: 100%;
  background-color: #cfe8fc;
  color: #409eff;
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
}
.el-button {
  padding: 0 !important ;
  border: 0 !important;
}
</style>
