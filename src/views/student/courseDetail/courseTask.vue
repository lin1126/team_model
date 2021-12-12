<template>
  <div>
    <el-collapse>
      <el-collapse-item>
        <template slot="title">
          <span class="el-collapse-item-title">正在进行&nbsp;<i class="el-icon-s-order"></i> </span>
        </template>
        <!-- 任务列表 -->
        <div class="collapse-item-list">
          <div class="collapse-left">签到</div>
          <span class="collapse-center">位置签到</span>
          <span class="collapse-time">2021-01-15 08:25</span>
        </div>
        <div class="collapse-item-list">
          <div class="collapse-left">签到</div>
          <span class="collapse-center">位置签到</span>
          <span class="collapse-time">2021-01-15 08:25</span>
        </div>
        <div class="collapse-item-list">
          <div class="collapse-left">签到</div>
          <span class="collapse-center">位置签到</span>
          <span class="collapse-time">2021-01-15 08:25</span>
        </div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <span class="el-collapse-item-title">已结束&nbsp;<i class="el-icon-s-release"></i></span>
        </template>
        <div class="collapse-item-list">
          <div class="collapse-left end">签到</div>
          <span class="collapse-center">位置签到</span>
          <span class="collapse-time">2021-01-15 08:25</span>
        </div>
        <div class="collapse-item-list">
          <div class="collapse-left end">签到</div>
          <span class="collapse-center">位置签到</span>
          <span class="collapse-time">2021-01-15 08:25</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
::v-deep .el-collapse-item__header {
  height: 68px;
}
.el-collapse-item-title {
  font-size: 24px;
  font-weight: 700;
  margin: 24px 0;
}

.collapse-item-list:hover {
  background-color: #f7fafc;
}

.collapse-item-list {
  position: relative;
  height: 68px;
  line-height: 68px;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 1px solid #e6e6e6;

  .collapse-left {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 48px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    border-radius: 8px;
    background-color: #79bbff;
  }

  .collapse-center {
    margin-left: 88px;
  }

  .collapse-time {
    float: right;
    margin-right: 20px;
  }

  .end {
    background-color: #c4c9cc !important;
  }
}
</style>
