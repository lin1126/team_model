<template>
  <div>
    <div class="course-intro">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="课程名称">
          <el-input v-model="couseTable.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="教学班级">
          <el-input v-model="couseTable.class" disabled></el-input>
        </el-form-item>
        <el-form-item label="学年-学期">
          <el-input v-model="couseTable.time" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-input v-model="couseTable.organization" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teaCourseInfo',
  data() {
    return {
      couseTable: {
        name: '物联网控制技术与应用',
        class: '18物联网工程1、2班',
        time: '2020-2021 第二学期',
        organization: '福建江夏学院电子信息科学学院物联网研究部',
      },
    }
  },
}
</script>

<style lang="less" scoped>
.course-intro {
  margin: 24px;
  padding: 28px 10px;
  border: 1px solid #e6e6e6;
  border-radius: 14px;

  ::v-deep .el-form-item__label {
    width: 120px !important;
    padding-right: 48px;
    box-sizing: border-box;
  }

  ::v-deep .el-form-item__content {
    margin-left: 120px !important;
  }
}
</style>
