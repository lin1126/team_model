<template>
  <div>
    <!-- 页面头部内容 -->
    <div class="page-head">
      <PageHeader pageHeaderContent="空教室查询"> </PageHeader>
      <!-- 教学楼选择器 -->
      <div class="stu-search">
        <el-select v-model="Selectvalue" clearable placeholder="请选择教学楼" @change="changeSelectValue">
          <el-option v-for="item in Selectoptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 查询到的教室界面 -->
    <div class="query-room" v-if="Selectvalue">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="building" label="教学楼"> </el-table-column>
        <el-table-column prop="classroom" label="教室"> </el-table-column>
        <el-table-column prop="type" label="类型"> </el-table-column>
        <el-table-column prop="number" label="当前人数" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.number > 10 ? 'danger' : 'success'" disable-transitions>{{ scope.row.number }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 还未选择教学楼时的空状态 -->
    <div class="empty" v-if="!Selectvalue">
      <el-empty :image-size="200" description="请在右上角选择教学楼"></el-empty>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
export default {
  name: 'ClassroomQuery',
  components: {
    PageHeader,
  },
  data() {
    return {
      Selectoptions: [
        {
          value: '1',
          label: '1号楼',
        },
        {
          value: '2',
          label: '2号楼',
        },
        {
          value: '3',
          label: '3号楼',
        },
        {
          value: '4',
          label: '4号楼',
        },
        {
          value: '5',
          label: '5号楼',
        },
        {
          value: '6',
          label: '6号楼',
        },
        {
          value: '7',
          label: '7号楼',
        },
        {
          value: '11',
          label: '11号楼',
        },
        {
          value: '12',
          label: '12号楼',
        },
        {
          value: '13',
          label: '13号楼',
        },
        {
          value: '14',
          label: '14号楼',
        },
      ],
      Selectvalue: '',
      tableData: [
        {
          building: '12号楼',
          classroom: '12#205',
          type: '多媒体教室',
          number: 12,
        },
        {
          building: '12号楼',
          classroom: '12#205',
          type: '多媒体教室',
          number: 12,
        },
        {
          building: '12号楼',
          classroom: '12#205',
          type: '多媒体教室',
          number: 12,
        },
        {
          building: '12号楼',
          classroom: '12#205',
          type: '多媒体教室',
          number: 1,
        },
        {
          building: '12号楼',
          classroom: '12#205',
          type: '多媒体教室',
          number: 12,
        },
        {
          building: '12号楼',
          classroom: '12#205',
          type: '多媒体教室',
          number: 10,
        },
        {
          building: '12号楼',
          classroom: '12#205',
          type: '多媒体教室',
          number: 12,
        },
      ],
    }
  },
  methods: {
    changeSelectValue() {},
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
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

.stu-search {
  position: absolute;
  top: 0;
  right: 0;
  // float: right;
  width: 320px;
  height: 60px;
  line-height: 60px;
  padding-right: 32px;

  .el-select {
    display: block;
  }
}

.query-room {
  height: 500px;
  // background-color: pink;
  padding: 10px 68px;

  .el-table .warning-row {
    background-color: rgb(160, 113, 27);
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
}

.empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
