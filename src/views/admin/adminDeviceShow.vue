<template>
  <div>
    <div>
      <!-- 页面头部内容 -->
      <div class="page-head">
        <PageHeader pageHeaderContent="设备使用日志"> </PageHeader>
      </div>
      <div class="right">
        <el-date-picker v-model="value" value-format="timestamp" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="getTimeEq(value)"> </el-date-picker>
      </div>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 设备记录表格模块 -->
      <div class="device_show">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="time" label="日期" width="180px"> </el-table-column>
          <el-table-column prop="led" label="照明灯"> </el-table-column>
          <el-table-column prop="humidifier" label="加湿器"> </el-table-column>
          <el-table-column prop="aircon" label="空调"> </el-table-column>
          <el-table-column prop="dht11" label="dht11"> </el-table-column>
          <el-table-column prop="autocontrol" label="自动控制模式"> </el-table-column>
        </el-table>
        <!-- 分页模块，固定在底部 -->
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" :current-page.sync="page" :page-size="limit" layout="prev, pager, next, jumper" :total="totalLength"> </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
// 引入获取设备数据接口
import { getEquipmentAPI, getTimeEquipmentAPI, getEquipmentLength } from '@/api/admin/adminDeviceShow.js'
import { formatTime } from '@/utils/formatTime.js'
export default {
  name: 'adminDeviceShow',
  components: {
    PageHeader,
  },
  mounted() {
    // 调用ajax请求
    this.getEquipmentLength()
    this.getEquipment()
  },
  methods: {
    // currentPage 改变时会触发,就是当前页被改变的时候会被触发
    handleCurrentChange() {
      if (this.timeFlag) {
        this.getTimeEquipment()
      } else {
        this.getEquipment()
      }
    },
    // 发送ajax请求，获取设备使用记录的长度
    async getEquipmentLength() {
      const totalLength = await getEquipmentLength()
      this.totalLength = totalLength.length
    },
    // 发送ajax请求，获取有时间区间的设备使用记录的长度
    async getTimeEquipmentLength() {
      const totalLength = await getTimeEquipmentAPI('', '', this.start, this.end)
      this.totalLength = totalLength.length
    },
    // 分页查询数据
    async getEquipment() {
      const data = await getEquipmentAPI(this.page, this.limit)
      this.formateMsg(data)
    },
    // 有时间区间的查询数据
    async getTimeEquipment() {
      const data = await getTimeEquipmentAPI(this.page, this.limit, this.start, this.end)
      this.formateMsg(data)
    },
    // 时间变化时更改数据
    getTimeEq(data) {
      try {
        console.log('成功')
        this.page = 1
        this.timeFlag = true
        this.start = data[0]
        this.end = data[1]
        this.getTimeEquipmentLength()
        this.getTimeEquipment()
      } catch {
        console.log('错误')
        this.page = 1
        this.timeFlag = false
        this.getEquipmentLength()
      }
    },
    // 格式化数据
    formateMsg(msg) {
      for (const item1 in msg) {
        // 格式化时间
        msg[item1].time = formatTime(msg[item1].time)
        for (const item2 in msg[item1]) {
          if (msg[item1][item2] === 'true') {
            msg[item1][item2] = '开启'
          } else if (msg[item1][item2] === 'false') {
            msg[item1][item2] = '关闭'
          }
        }
      }
      this.tableData = msg
    },
  },
  data() {
    return {
      // 表格中数据
      tableData: [],
      totalLength: '',
      // 页数
      page: 1,
      // 每页限制的数据数量
      limit: 9,
      // 判断此时是否根据时间区间来查询数据
      timeFlag: false,
      start: '',
      end: '',
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

.right {
  position: absolute;
  top: 0;
  right: 24px;
  transform: translateY(50%);
}

.el-divider--horizontal {
  margin: 6px;
}
.device_show {
  position: relative;
  margin: 0 32px;
  text-align: center;
}

.pagination {
  position: absolute;
  bottom: -55px;
  width: 100%;
  height: 40px;
}
</style>
