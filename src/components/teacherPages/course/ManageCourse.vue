<template>
  <div>
    <div style="height: 40px">
      <!--课程管理按钮区域-->
      <el-button class="btn" @click="editCourse" v-if="isRes()" :disabled="!isAct()">
        编辑资料
      </el-button>
      <el-button class="btn" @click="openEnd" v-if="isRes()" :disabled="!isAct()">
        <span>结束课程</span>
      </el-button>
      <el-button class="btn" @click="openDelete" type="danger" plain v-if="isRes()" :disabled="!isAct()">
        <span>删除课程</span>
      </el-button>
    </div>
    <div>
      <el-tabs
        class="courseTab"
        v-model="activeIndex"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="课程设置">
          <el-container style="height: 500px" v-loading="loading">
            <!--课程头像-->
            <div class="imgArea">
              <img
                src="../../../assets/course.png"
                alt="加载失败"
                style="width: 260px"
              />
            </div>
            <!--课程信息-->
            <div class="infoArea">
              <h2>课程信息</h2>
              <el-form label-position="left" label-width="80px" style="width: 480px">
                <el-form-item label="课程编号">
                  <span class="info">{{ this.$route.params.course_id }}</span>
                </el-form-item>
                <el-form-item label="责任教师">
                  <span class="info">{{ courseTeacherID }}</span>
                </el-form-item>
                <el-form-item label="课程名称">
                  <span class="info">{{ courseName }}</span>
                </el-form-item>
                <el-form-item label="课程介绍">
                  <span class="info">{{ courseDes }}</span>
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
  name: "ManageCourse",
  data() {
    return {
      loading:true,
      activeIndex: "0",
      courseTeacherID: "",
      courseName: "",
      courseDes: "",
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
    editCourse(e) {
      this.$router.push({
        name: "edit",
        params: {
          course_name: this.courseName,
          course_teacher_ID: this.courseTeacherID,
          course_des: this.courseDes,
        },
      });
    },
    endCourse(){
      let data = new FormData()
      data.append("course_ID",this.$route.params.course_id)
      this.$axios({
        url:"course/end",
        method:"post",
        data:data,
        headers:{
          token: window.sessionStorage.getItem('token')
        }
      }).then((response)=>{
        if(response.data === 1){
          this.$message({
            type: 'success',
            message: '课程已结束，您即将返回主页！'
          });
          this.$router.push("/teacherhome")
        }
        else {
          this.$message({
            type: 'error',
            message: '操作失败，请重试！'
          });
        }
      }).catch(()=>{
        this.$message({
          type: 'error',
          message: '操作失败，请重试！'
        });
      })
    },

    openEnd(){
      this.$confirm('结束课程后，您不能再继续管理该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.endCourse()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },

    deleteCourse(){
      let data = new FormData()
      data.append("course_ID",this.$route.params.course_id)
      this.$axios({
        url:"course/delete",
        method:"post",
        data:data,
        headers:{
          token: window.sessionStorage.getItem('token')
        }
      }).then((response)=>{
        if(response.data === 1){
          this.$message({
            type: 'success',
            message: '课程已删除，您即将返回主页！'
          });
          this.$router.push("/teacherhome")
        }
        else {
          this.$message({
            type: 'error',
            message: '操作失败，请重试！'
          });
        }
      }).catch(()=>{
        this.$message({
          type: 'error',
          message: '操作失败，请重试！'
        });
      })
    },

    openDelete(){
      this.$confirm('删除课程后，您不能再继续管理该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.deleteCourse()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  },
  async mounted() {
    let _this = this;
    await this.$axios({
      url: "/course/get",
      method: "get",
      params: {
        course_ID: this.$route.params.course_id,
      },
      headers: {
        token: window.sessionStorage.getItem('token')
      },
    })
        .then(function (response) {
          window.sessionStorage.setItem("is_active", response.data.is_active);
          window.sessionStorage.setItem("resTeacher_ID", response.data.teacher_ID);
          _this.courseTeacherID = response.data.teacher_ID;
          _this.courseName = response.data.name;
          _this.courseDes = response.data.description;
        })
        .catch(function (error) {
          _this.courseTeacherID = "";
          _this.courseName = "";
          _this.courseDes = "";
        });
    this.loading=false
  },
};
</script>

<style scoped>
.courseTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.imgArea {
  margin-left: 170px;
  margin-top: 120px;
  margin-right: 100px;
}

.infoArea {
  margin-left: 110px;
  margin-top: 50px;
  line-height: 50px;
}

.btn {
  margin-left: 40px;
  margin-right: 20px;
}

.info {
  font-size: 17px;
}
</style>
