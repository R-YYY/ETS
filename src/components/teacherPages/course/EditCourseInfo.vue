<template>
  <div>
    <div style="height: 40px">
      <!--编辑课程信息按钮区域-->
      <el-button class="btn" @click="saveEdit">
        <span>保存</span>
      </el-button>
      <el-button class="btn" type="danger" @click="cancelEdit" plain>
        <span>取消</span>
      </el-button>
    </div>
    <div>
      <el-tabs
        class="editTab"
        v-model="activeIndex"
        type="border-card"
        @tab-click="handleClick"
        v-loading="loading"
      >
        <el-tab-pane label="课程设置">
          <el-container style="height: 500px">
            <div class="uploadArea">
              <!--上传课程头像-->
              <el-upload
                class="avatar-uploader"
                action="#"
                :http-request="uploadPhoto"
                :before-upload="beforeUpload"
                :show-file-list="false"
              >
                <img
                  src="../../../assets/course.png"
                  alt="加载失败"
                  style="width: 260px"
                />
              </el-upload>
              <!--课程头像上传建议-->
              <div class="tips">
                <br /><br /><span>仅支持jpg,png格式图片</span><br />
                <span>建议最佳尺寸1024*1024，不超过1MB</span>
              </div>
            </div>
            <div class="editArea">
              <h2>课程信息</h2>
              <!--课程信息表单-->
              <el-form>
                <el-form-item label="课程编号">
                  <el-input
                    class="inputInfo"
                    v-model="this.$route.params.course_id"
                    :disabled="true"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="责任教师">
                  <el-input
                    v-model="this.$route.params.course_teacher_ID"
                    :disabled="true"
                    class="inputInfo"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="课程名称">
                  <el-input v-model="tmpName" style="width: 400px"> </el-input>
                </el-form-item>
                <el-form-item label="课程介绍">
                  <el-input
                    v-model="tmpDes"
                    :rows="4"
                    type="textarea"
                    resize="none"
                    style="width: 400px"
                  >
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="教师团队"> </el-tab-pane>
        <el-tab-pane label="助教团队"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCourseInfo",
  data() {
    return {
      loading:false,
      activeIndex: "0",
      tmpName: "",
      tmpDes: "",
    };
  },
  methods: {
    isAct(){
      return window.sessionStorage.getItem("is_active") === "1"
    },

    isRes(){
      let resTeacher_ID = window.sessionStorage.getItem("resTeacher_ID")
      let account_ID = window.sessionStorage.getItem("account_ID")
      return resTeacher_ID === account_ID
    },

    isTea(){
      let account_ID = window.sessionStorage.getItem("account_ID")
      return account_ID.length===5
    },

    handleClick(tab) {
      if (tab.index == 0) this.$router.push({ name: "info" });
      else if (tab.index == 1) this.$router.push({ name: "teachers" });
      else if (tab.index == 2) this.$router.push({ name: "tas" });
    },
    //更新课程资料
    async saveEdit() {
      let data = new FormData();
      data.append("course_ID", this.$route.params.course_id);
      data.append("name", this.tmpName);
      data.append("description", this.tmpDes);
      this.loading=true
      await this.$axios({
        url: "/course/setInfo",
        method: "post",
        data:data,
        headers: {
          token: window.sessionStorage.getItem('token')
        },
      })
        .then((response) => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.loading=false
          this.$router.push({ name: "info" });
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: "修改失败!请重试！",
          });
        });
    },

    cancelEdit() {
      this.$router.push({ name: "info" });
    },

    uploadPhoto(file){
      let data = new FormData()
      data.append("course_ID",this.$route.params.course_id)
      data.append("photo",file.file)
      this.$axios({
        url:"/file/uploadPhoto",
        method:"post",
        data:data,
        headers: {
          token: window.sessionStorage.getItem('token')
        },
      }).then((response)=>{
        if(response.data === 1){
          this.$message({
            type: "success",
            message: "修改成功！",
          });
        }
        else{
          this.$message({
            type: "error",
            message: "修改失败！请重试！",
          });
        }
      }).catch(()=>{
        this.$message({
          type: "error",
          message: "修改失败！请重试！",
        });
      })
    },

    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      return isJPG;
    }
  },
  mounted() {
    let _this = this;
    _this.tmpName = this.$route.params.course_name;
    _this.tmpDes = this.$route.params.course_des;
  },
};
</script>

<style scoped>
.editTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.uploadArea {
  margin-left: 170px;
  margin-top: 100px;
  margin-right: 100px;
  font-size: 12px;
  text-align: center;
}

.editArea {
  margin-top: 10px;
  margin-left: 100px;
  line-height: 90px;
  width: 600px;
}

.btn {
  margin-left: 40px;
  margin-right: 20px;
}

.inputInfo {
  width: 150px;
  font-size: 17px;
}
</style>
