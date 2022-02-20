<template>
  <div>
    <div>
      <!-- 页面头部内容 -->
      <div class="page-head">
        <PageHeader pageHeaderContent="温湿度数据"> </PageHeader>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <div class="top_show">
        <div class="top_temp_show">
          <div id="temp_pie" class="temp_pie" style="width: 200px; height: 200px"></div>
        </div>
        <div class="top_humi_show">
          <div id="humi_pie" class="humi_pie" style="width: 200px; height: 200px"></div>
        </div>
      </div>
      <div class="buttom_show">
        <div id="echart-line" style="width: 100%; height: 280px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { getHumidifierAPILi } from '@/api/admin/adminHumitureShow.js'
export default {
  name: 'adminHumitureShow',
  components: {
    PageHeader,
  },
  async mounted() {
    this.loading = true
    // 发送ajax请求获取数据
    await this.getAjax()
    // 绘制温湿度折线图
    await this.humiLine()
    // 绘制温度饼状图
    await this.tempPie()
    // 绘制湿度饼状图
    await this.humiPie()
    this.loading = false
  },
  data() {
    return {
      msg: [],
      msg1: [],
      temp: { one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0, eight: 0 },
      humi: { one: 0, two: 0, three: 0, four: 0 },
      loading: true,
    }
  },
  methods: {
    // 画温湿度折线图图表
    async humiLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('echart-line'))
      // 指定图表的配置项和数据'

      const option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          },
        },
        title: {
          left: 'left',
          text: '温湿度折线图',
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none',
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
        },
        yAxis: [
          {
            type: 'value',
            boundaryGap: [0, '100%'],
            position: 'left',
            name: '温度',
            splitLine: {
              show: false,
            },
            axisLabel: {
              formatter: '{value} °C',
            },
          },
          {
            type: 'value',
            boundaryGap: [0, '100%'],
            position: 'right',
            name: '湿度',
            max: 'dataMax',
            splitLine: {
              show: false,
            },
            axisLabel: {
              formatter: '{value} %',
            },
          },
        ],
        legend: {
          data: ['温度', '湿度'],
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 20,
          },
          {
            start: 0,
            end: 20,
          },
        ],

        series: [
          {
            name: '温度',
            type: 'line',
            smooth: true,
            symbol: 'none',

            // areaStyle: {},
            data: this.msg,
          },
          {
            name: '湿度',
            type: 'line',
            smooth: true,
            symbol: 'none',
            // areaStyle: {},
            data: this.msg1,
            yAxisIndex: 1,
          },
        ],
      }
      myChart.setOption(option)
    },
    // 发送ajax请求获取数据
    async getAjax() {
      const data = await getHumidifierAPILi('', '')

      for (const item in data) {
        const arr = [data[item].time, data[item].temp]
        const arr1 = [data[item].time, data[item].humi]
        /** *******************分析各个温度段的个数有几个****************************
        one: 代表0度一下的温度，two：0-10度，three：10-15，four：15-20度，five：20-25，
        six：25-30；seven：30-35；eight：35以上
        ***************************************************************************/
        if (data[item].temp < 0) {
          this.temp.one++
        } else if (data[item].temp >= 0 && data[item].temp < 10) {
          this.temp.two++
        } else if (data[item].temp >= 10 && data[item].temp < 15) {
          this.temp.three++
        } else if (data[item].temp >= 15 && data[item].temp < 20) {
          this.temp.four++
        } else if (data[item].temp >= 20 && data[item].temp < 25) {
          this.temp.five++
        } else if (data[item].temp >= 25 && data[item].temp < 30) {
          this.temp.six++
        } else if (data[item].temp >= 30 && data[item].temp < 35) {
          this.temp.seven++
        } else if (data[item].temp >= 35) {
          this.temp.eight++
        }
        /** *******************分析各个湿度段的个数有几个****************************
        one: 代表40%一下的温度，two：40-60%，three：60-80%，four：80%以上，
        ***************************************************************************/
        if (data[item].humi < 40) {
          this.humi.one++
        } else if (data[item].humi >= 40 && data[item].humi < 60) {
          this.humi.two++
        } else if (data[item].humi >= 60 && data[item].humi < 80) {
          this.humi.three++
        } else if (data[item].humi >= 80) {
          this.humi.four++
        }
        await this.asyncEvent(arr, arr1)
      }
    },
    // 异步变同步方法
    asyncEvent(msg1, msg2) {
      return new Promise((resolve) => {
        resolve(this.msg.push(msg1), this.msg1.push(msg2))
      })
    },
    // 绘制温度饼图
    tempPie() {
      const myChart = this.$echarts.init(document.getElementById('temp_pie'))
      const option1 = {
        title: {
          left: 'left',
          text: '温度饼图',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          show: false,
        },
        series: [
          {
            name: '温度',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '10',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },

            data: [
              { value: this.temp.one, name: '0°C以下' },
              { value: this.temp.two, name: '0°C-10°C' },
              { value: this.temp.three, name: '10°C-15°C' },
              { value: this.temp.four, name: '15°C-20°C' },
              { value: this.temp.five, name: '20°C-25°C' },
              { value: this.temp.six, name: '25°C-30°C' },
              { value: this.temp.seven, name: '30°C-35°C' },
              { value: this.temp.eight, name: '35°C以上' },
            ],
          },
        ],
      }

      option1 && myChart.setOption(option1)
    },
    // 绘制湿度饼状图
    humiPie() {
      const myChart = this.$echarts.init(document.getElementById('humi_pie'))
      const option1 = {
        title: {
          left: 'left',
          text: '湿度饼图',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          show: false,
        },
        series: [
          {
            name: '湿度',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '10',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },

            data: [
              { value: this.humi.one, name: '40%以下' },
              { value: this.humi.two, name: '40%-60%' },
              { value: this.humi.three, name: '60%-80%' },
              { value: this.humi.four, name: '80%以上' },
            ],
          },
        ],
      }

      option1 && myChart.setOption(option1)
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
.humiture {
  margin: 0 32px;
}
.humiture_show {
  /* display: flex; */
  height: 480px;
  padding: 0 16px;
  box-sizing: border-box;
  text-align: center;
}
.humiture_show .top_show {
  height: 200px;
}
.humiture_show .buttom_show {
  height: 280px;
  padding: 0 10px;
}
.top_show {
  display: flex;
  margin-top: 48px;
}

.top_show .top_temp_show,
.top_show .top_humi_show {
  flex: 1;
}
.temp_pie,
.humi_pie {
  margin: auto;
}
</style>
