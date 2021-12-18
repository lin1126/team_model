<template>
  <div>
    <!-- 页面头部内容 -->
    <div class="page-head">
      <PageHeader pageHeaderContent="班级管理"> </PageHeader>
      <div class="stu-search">
        <el-input placeholder="请输入内容" v-model="courseSearchInput" clearable class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 管理班级模块开始 -->
    <div class="teacher-class">
      <!-- 第一行 -->
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item>
          <!-- 每个班级头部模块 -->
          <template slot="title">
            <span class="class-icon"><i class="el-icon-data-board"></i></span>
            <p class="class-name">18物联网工程2班</p>
            <span class="class-number">学生人数 0 人</span>
            <span class="add-student-link"><el-link type="primary" :underline="false">添加学生</el-link></span>
          </template>
          <!-- 班级学生具体信息模块 -->
          <div class="class-student-info">
            <el-table :data="studentInfo.filter((data) => !search || data.name.toLowerCase().includes(search.toLowerCase()))" stripe style="width: 85%; margin: 0 auto" height="250" border>
              <el-table-column label="序号" width="90" align="center" fixed>
                <template slot-scope="scope">
                  <el-tag size="medium">{{ scope.row.no }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="number" label="学号" width=""> </el-table-column>
              <el-table-column prop="name" label="姓名" width=""> </el-table-column>
              <el-table-column width="220" align="center">
                <template slot="header" slot-scope="scope">
                  <el-input @click="handleClick(scope.row)" v-model="search" size="medium" placeholder="输入关键字搜索" />
                </template>
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="medium"><i class="el-icon-view"></i> 查看</el-button>
                  <el-button type="text" size="medium"><i class="el-icon-delete"></i>删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
export default {
  name: 'teaClass',
  components: {
    PageHeader,
  },
  data() {
    return {
      courseSearchInput: '',
      activeName: '1',
      studentInfo: [
        {
          no: 1,
          number: 1631808212211,
          name: '林成俊',
        },
        {
          no: 2,
          number: 1631708212125,
          name: '刘莉珠',
        },
        {
          no: 3,
          number: 1631808212211,
          name: '林成俊',
        },
        {
          no: 4,
          number: 1631708212125,
          name: '刘莉珠',
        },
        {
          no: 5,
          number: 1631808212211,
          name: '林成俊',
        },
        {
          no: 6,
          number: 1631708212125,
          name: '刘莉珠',
        },
        {
          no: 7,
          number: 1631808212211,
          name: '林成俊',
        },
        {
          no: 8,
          number: 1631708212125,
          name: '刘莉珠',
        },
      ],
      search: '',
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
.stu-search {
  position: absolute;
  top: 0;
  right: 0;
  // float: right;
  width: 320px;
  height: 60px;
  line-height: 60px;
  padding-right: 32px;
}

.el-input-group__append button.el-button:hover {
  color: #409eff !important;
}

.teacher-class {
  padding: 20px 24px;

  .class-icon {
    width: 34px;
    height: 34px;
    font-size: 24px;
    text-align: center;
    line-height: 34px;
    background-color: #72aee8;
    border-radius: 50%;
    margin-left: 10px;
  }

  .class-name {
    display: inline-block;
    font-size: 20px;
    padding-left: 24px;
  }

  .class-number {
    font-size: 10px;
    color: #9394a1;
    padding-left: 24px;
  }

  .add-student-link {
    flex: 1;
    text-align: right;
    margin-right: 68px;
  }
  // 班级学生具体信息模块
  .class-student-info {
    padding-left: 24px;
    text-align: center;
  }
}
</style>
