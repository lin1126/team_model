<template>
  <div>
    <!-- 页面头部内容 -->
    <div class="page-head">
      <PageHeader pageHeaderContent="我的头像"> </PageHeader>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 上传图片和预览图片的部分 -->
    <div class="stu-info-photo">
      <div class="stu-info-photo-content">
        <!-- 上传头像部分 -->
        <div class="stu-info-upload">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="http://127.0.0.1:3000/api/student/updateImage"
            :headers="{ authorization: Token }"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="handleAvatarProgress"
            :auto-upload="false"
            :limit="1"
            :disabled="isImage"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="clearImage" @click="handleAvatarLimit"><el-link type="primary" :underline="false">清除已选图片</el-link></div>
        </div>
        <!-- 当前头像部分 -->
        <div class="stu-info-nowPhoto">
          <div class="stu-info-pic">
            <el-avatar v-if="!imageUrl" :src="this.introduction.photo" style="width: 98px; height: 98px"> </el-avatar>
            <el-avatar v-show="imageUrl" :src="imageUrl" style="width: 98px; height: 98px"> </el-avatar>
            <p>当前头像</p>
          </div>
        </div>
      </div>
      <P class="stu-info-tips">请选择图片上传：推荐大小为180 * 180像素，支持JPG、PNG等格式，图片需小于3M</P>
      <!-- 底部保存头像按钮  -->
      <div class="stu-info-photo-footer">
        <el-button type="primary" plain @click="submitUpload">保存头像</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { getCookie } from '@/utils/cookie.js'
import { mapState } from 'vuex'
var isLt2M = ''
export default {
  name: 'endCourse',
  components: {
    PageHeader,
  },
  created() {
    this.Token = getCookie('Token')
  },
  data() {
    return {
      Token: '',
      imageUrl: '',
    }
  },

  methods: {
    // 上传成功回调函数
    handleAvatarSuccess(res, file) {
      if (res.isValid) {
        this.$store.state.introduction.photo = res.path
        this.$message({
          showClose: true,
          message: '保存头像成功',
          type: 'success',
        })
      } else {
        this.$message.error('身份验证失败')
      }
    },
    // 上传图像时的回调函数
    beforeAvatarUpload(file) {
      return isLt2M
    },
    // 保存头像触发上传事件
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleAvatarProgress(res, file) {
      isLt2M = file[0].size / 1024 / 1024 < 2
      console.log(file[0].size)
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        this.$refs.upload.clearFiles()
      } else {
        this.imageUrl = URL.createObjectURL(file[0].raw)
      }
    },
    handleAvatarLimit() {
      this.$refs.upload.clearFiles()
      this.imageUrl = ''
    },
  },
  computed: {
    ...mapState(['introduction']),
    isImage() {
      if (this.imageUrl === '') {
        return false
      }
      return true
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

.stu-info-photo {
  height: 500px;
  text-align: center;

  .stu-info-photo-content {
    position: relative;
    display: inline-block;
    width: 360px;
    padding: 80px 0 60px 0;
  }

  .stu-info-upload {
    float: left;
    width: 180px;
    height: 180px;
    padding-right: 40px;
    border-right: 1px solid #e5e9ef;

    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      background-color: #eef1f6;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .clearImage {
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
  }

  .stu-info-nowPhoto {
    display: inline-block;
    height: 178px;
    margin-left: 40px;
    box-sizing: border-box;

    .stu-info-pic {
      display: flex;
      height: 178px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p {
        color: #99a2aa;
        font-size: 12px;
        margin-top: 20px;
      }
    }
  }

  .stu-info-tips {
    color: #99a2aa;
    font-size: 12px;
  }

  .stu-info-photo-footer {
    margin-top: 40px;
    text-align: center;
  }
}
</style>
