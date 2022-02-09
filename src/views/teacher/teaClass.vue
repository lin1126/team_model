<template>
  <div>
    <!-- 页面头部内容 -->
    <div class="page-head">
      <PageHeader pageHeaderContent="班级管理"> </PageHeader>
      <div class="stu-search">
        <!-- 选择班级部分开始 -->
        <el-select v-model="fromCourse.gradeValue" placeholder="请选择年级" style="width: 30%; padding-right: 3%" @change="getCareer()">
          <el-option v-for="item in grade" :key="item._id" :label="item._id" :value="item._id"> </el-option>
        </el-select>
        <el-select v-model="fromCourse.careerValue" placeholder="请选择专业" style="width: 30%; padding-right: 3%" :disabled="!career" @change="getClass()">
          <el-option v-for="item in career" :key="item._id" :label="item._id" :value="item._id"> </el-option>
        </el-select>
        <!-- 选择班级后直接获取班级学生列表 -->
        <el-select v-model="fromCourse.classValue" placeholder="请选择班级" style="width: 30%" :disabled="!class1" @change="getClaStu()">
          <el-option v-for="item in class1" :key="item._id" :label="item._id" :value="item._id"> </el-option>
        </el-select>
        <!-- 选择班级部分结束 -->
        <!-- <el-input placeholder="请输入内容" v-model="courseSearchInput" clearable class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 空状态 -->
    <div class="empty-box" v-if="studentInfo.length == 0">
      <el-empty description="请在右上角选择班级" style=""></el-empty>
    </div>
    <!-- 管理班级模块开始 -->
    <div class="teacher-class">
      <!--班级学生头部模块开始 -->
      <div class="class-header" v-if="studentInfo.length !== 0">
        <span class="class-icon"><i class="el-icon-data-board"></i></span>
        <p class="class-name">{{ this.fromCourse.gradeValue + this.fromCourse.careerValue + this.fromCourse.classValue }}班</p>
        <span class="class-number">学生人数 {{ this.studentLength }} 人</span>
        <!-- 添加学生按钮 -->
        <span class="add-student-link">
          <el-button type="primary" icon="el-icon-plus" round @click="dialogTableVisible = true">添加学生</el-button>
        </span>
      </div>
      <!--班级学生头部模块结束 -->
      <!-- 学生表格部分开始 -->
      <div class="class-student-info" v-if="studentInfo.length !== 0">
        <el-table :data="studentInfo.filter((data) => !search || data.name.toLowerCase().includes(search.toLowerCase()))" border>
          <el-table-column label="序号" width="90" align="center" fixed>
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.$index + 1 }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="ID" label="学号" width=""> </el-table-column>
          <el-table-column prop="name" label="姓名" width=""> </el-table-column>
          <el-table-column label="身份" width="90" align="center">
            <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.identity }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="280" align="center">
            <template slot="header" slot-scope="scope">
              <el-input @click="handleClick(scope.row)" v-model="search" size="medium" placeholder="输入姓名搜索" />
            </template>
            <template slot-scope="scope">
              <el-button @click="checkClick(scope.row)" type="text" size="medium"><i class="el-icon-view"></i> 查看</el-button>
              <el-button type="text" size="medium" style="color: #f56c6c" @click="stuDelete"><i class="el-icon-delete"></i>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 学生表格部分结束-->

      <!-- 查看学生信息的Dialog -->
      <el-dialog title="学生信息" :visible.sync="InfoDialogVisible" width="60%" :show-close="false" :close-on-click-modal="false">
        <!-- 学生详细信息表格 -->
        <el-descriptions class="margin-top" :column="3" border>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              姓名
            </template>
            {{ stuDetail.name }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              手机号
            </template>
            {{ stuDetail.phone == '' ? '未绑定' : stuDetail.phone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-message"></i>
              邮箱
            </template>
            {{ stuDetail.email == '' ? '未绑定' : stuDetail.email }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-tickets"></i>
              学号
            </template>
            {{ stuDetail.ID }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-school"></i>
              学校
            </template>
            {{ stuDetail.school }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-office-building"></i>
              院系
            </template>
            {{ stuDetail.college }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-receiving"></i>
              班级
            </template>
            {{ stuDetail.grade + stuDetail.career + stuDetail.class }}班
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-house"></i>
              通信地址
            </template>
            {{ stuDetail.place == '' ? '未填写' : stuDetail.place }}
          </el-descriptions-item>
        </el-descriptions>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="InfoDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>

      <!-- 添加学生头部 -->
      <el-dialog title="添加学生" :visible.sync="dialogTableVisible" style="text-align: left" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
        <!-- 添加学生主体部分 -->
        <div class="form-course">
          <el-form :rules="rules" label-position="left" label-width="80px" :model="fromStudent" ref="fromStudent">
            <el-form-item label="学号" prop="ID">
              <el-input v-model="fromStudent.ID" placeholder="学号请输入纯数字"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="fromStudent.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 添加学生底部 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm()">取 消</el-button>
          <el-button type="primary" @click="addStudentHandel('fromStudent')">完 成</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { getGrade, getCareer, getClass } from '@/api/teacher/teaCourse.js'
import { getStuList, getStuInfo, addStudent } from '@/api/teacher/teaClass.js'
export default {
  name: 'teaClass',
  components: {
    PageHeader,
  },
  data() {
    return {
      sort: 1,
      InfoDialogVisible: false,
      dialogTableVisible: false,
      search: '',
      activeName: '1',
      // 班级学生列表
      studentInfo: [],
      // 班级学生人数
      studentLength: 0,
      // 选择年级班级和专业
      fromCourse: {
        gradeValue: '',
        careerValue: '',
        classValue: '',
      },
      // 点击查看的学生信息
      stuDetail: '',
      // 年级、专业、班级
      grade: '',
      career: '',
      class1: '',

      // 添加学生中表单的数据
      fromStudent: {
        ID: '',
        name: '',
        school: '福建江夏学院',
        college: '电子信息科学学院',
        grade: '',
        career: '',
        class: '',
        identify: '学生',
      },
      // 添加学生表单规则
      rules: {
        name: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
        ID: [{ required: true, message: '此项不能为空', trigger: 'blur' }],
      },
    }
  },
  methods: {
    // 获取年级
    async getGrade() {
      const data = await getGrade()
      this.grade = data.filter((value) => {
        return value._id !== null
      })
    },
    // 获取专业
    async getCareer() {
      this.studentInfo.length = 0
      this.class1 = ''
      this.fromCourse.classValue = ''
      this.fromCourse.careerValue = ''
      const req = {
        _grade: this.fromCourse.gradeValue,
      }
      const data = await getCareer(req)
      this.career = data.filter((value) => {
        return value._id !== null
      })
    },
    // 获取班级
    async getClass() {
      this.studentInfo.length = 0
      this.fromCourse.classValue = ''
      const req = {
        _grade: this.fromCourse.gradeValue,
        _career: this.fromCourse.careerValue,
      }
      const data = await getClass(req)
      this.class1 = data.filter((value) => {
        return value._id !== null
      })
    },
    // 获取选中班级下的学生列表
    async getClaStu() {
      const req = {
        _grade: this.fromCourse.gradeValue,
        _career: this.fromCourse.careerValue,
        _class: this.fromCourse.classValue,
      }
      const data = await getStuList(req)
      this.studentInfo = data.stuList
      this.studentLength = data.stuLength
    },
    // 点击查看按钮
    async checkClick(row) {
      this.InfoDialogVisible = true
      const req = {
        _ID: row.ID,
      }
      const data = await getStuInfo(req)
      this.stuDetail = data[0]
      console.log(data[0])
    },
    // 删除学生
    stuDelete() {
      this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        showClose: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {})
    },
    // 添加学生
    addStudentHandel(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.fromStudent.grade = this.fromCourse.gradeValue
          this.fromStudent.career = this.fromCourse.careerValue
          this.fromStudent.class = this.fromCourse.classValue
          const data = await addStudent(this.fromStudent)
          if (data.code === 200) {
            this.$message({
              message: data.msg,
              type: 'success',
            })
            // 刷新当前班级学生列表
            this.getClaStu()
            // 重置添加学生表格信息
            this.resetForm()
          } else {
            this.$message.error(data.msg)
          }
        } else {
          this.$message.error('信息填写错误，请重新检查是否符合规范！')
          return false
        }
      })
    },
    // 重置添加学生表格中的数据,并关闭表格
    resetForm() {
      this.fromStudent = {
        ID: '',
        name: '',
        school: '福建江夏学院',
        college: '电子信息科学学院',
        grade: '',
        career: '',
        class: '',
        identify: '学生',
      }
      this.dialogTableVisible = false
    },
  },
  created() {
    this.getGrade()
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
  width: 400px;
  height: 60px;
  line-height: 60px;
  padding-right: 32px;
}

.el-input-group__append button.el-button:hover {
  color: #409eff !important;
}

.teacher-class {
  padding: 20px 24px;
  padding-top: 0;
  .class-header {
    position: relative;
    .class-icon {
      display: inline-block;
      width: 44px;
      height: 44px;
      font-size: 28px;
      text-align: center;
      line-height: 44px;
      background-color: #72aee8;
      border-radius: 50%;
      margin-left: 26px;
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
      display: inline-block;
      position: absolute;
      top: 50%;
      right: 50px;
      transform: translateY(-50%);
    }
  }

  // 班级学生具体信息模块
  .class-student-info {
    padding-left: 24px;
    text-align: center;
  }
}
.empty-box {
  min-height: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
