<template>
  <div>
    <div>
      <!-- 页面头部内容 -->
      <div class="page-head">
        <PageHeader pageHeaderContent="环境监控"> </PageHeader>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <div>
        <div id="chartLineBox" style="width: 100%; height: 360px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { client } from '../../utils/mqtt'
import PageHeader from '@/components/PageHeader.vue'
export default {
  name: 'adminEnvironment',
  components: {
    PageHeader,
  },
  data() {
    return {
      dd: {
        humi: 60,
        temp: 0,
      },
      cc: '',

      option: {
        // echarts设置
        series: [
          {
            name: '温度',
            radius: 80,
            type: 'gauge',
            center: ['25%', '60%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 50, // 最大范围
            splitNumber: 10, // 分成几格

            itemStyle: {
              color: '#fd6e1f',
            },
            progress: {
              show: true,
              width: 30,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 30,
              },
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999',
              },
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999',
              },
            },
            axisLabel: {
              distance: -10,
              color: '#999',
              fontSize: 16,
            },
            anchor: {
              show: false,
            },
            title: {
              show: true,
              offsetCenter: ['0%', '80%'],
              fontSize: 24,
              color: '#fd6e1f',
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 20,
              fontWeight: 'bolder',
              formatter: '{value} °C',
              color: '#fd6e1f',
            },
            data: [
              {
                value: this.cc,
                name: '温度',
              },
            ],
          },

          {
            name: '湿度',
            radius: 80,
            type: 'gauge',
            center: ['75%', '60%'], // 设置位置
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: {
              color: '#6dff3b',
            },
            progress: {
              show: true,
              width: 30,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 30,
              },
            },
            axisTick: {
              distance: -45,
              splitNumber: 5,
              lineStyle: {
                width: 2,
                color: '#999',
              },
            },
            splitLine: {
              distance: -52,
              length: 14,
              lineStyle: {
                width: 3,
                color: '#999',
              },
            },
            axisLabel: {
              distance: -10,
              color: '#999',
              fontSize: 16,
            },
            anchor: {
              show: false,
            },
            title: {
              show: true,
              offsetCenter: ['0%', '80%'],
              fontSize: 20,
              color: '#6dff3b',
            },
            detail: {
              valueAnimation: true,
              width: '60%',
              lineHeight: 40,
              borderRadius: 8,
              offsetCenter: [0, '-15%'],
              fontSize: 20,
              fontWeight: 'bolder',
              formatter: '{value} %',
              color: '#6dff3b',
            },
            data: [
              {
                value: this.cc,
                name: '湿度',
              },
            ],
          },

          {
            type: 'gauge',
            center: ['20%', '50%'],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: '#FD7347',
            },
            progress: {
              show: true,
              width: 8,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: '',
              },
            ],
          },
        ],
      },
    } // return 到此结束
  }, // data到这里结束
  mounted() {
    this.chartChange()
  },
  created() {
    this.mqttMSG()
  },
  methods: {
    chartChange() {
      const myEcharts = this.$echarts.init(document.getElementById('chartLineBox'), 'gauge')
      // 使用刚指定的配置项和数据显示图表。
      var random1 = this.dd.temp
      var random2 = this.dd.humi
      console.log(111)
      this.option.series[0].data[0].value = random1
      this.option.series[1].data[0].value = random2
      myEcharts.setOption(this.option, true)
    },
    mqttMSG() {
      // mqtt连接
      client.on('connect', (e) => {
        console.log('连接成功:')
        client.subscribe(
          'raspi/dht11',
          {
            qos: 1,
          },
          (error) => {
            if (!error) {
              console.log('订阅成功')
            } else {
              console.log('订阅失败')
            }
          }
        )
      })
      // 接收消息处理
      client.on('message', (topic, message) => {
        const myEcharts = this.$echarts.init(document.getElementById('chartLineBox'), 'gauge')
        console.log('收到来自', topic, '的消息', message.toString())
        this.msg = message.toString()
        const DD = this.msg // 赋值
        this.dd = JSON.parse(DD)
        this.option.series[0].data[0].value = this.dd.temp
        this.option.series[1].data[0].value = this.dd.humi
        myEcharts.setOption(this.option, true)
      })

      // 断开发起重连
      client.on('reconnect', (error) => {
        console.log('正在重连:', error)
      })
      // 链接异常处理
      client.on('error', (error) => {
        console.log('连接失败:', error)
      })
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
</style>
