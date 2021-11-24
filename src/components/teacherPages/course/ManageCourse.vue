<template>
  <div>
    <div>
      <el-button class="btn" @click="editCourse">
        <span>编辑资料</span>
      </el-button>
      <el-button class="btn">
        <span>结束课程</span>
      </el-button>
      <el-button class="btn" type="danger" plain>
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
          <el-container style="height: 480px">
            <div class="imgArea">
              <img
                src="../../../assets/course.png"
                alt="加载失败"
                style="width: 260px"
              />
            </div>
            <div class="infoArea">
              <h2>课程信息</h2>
              <el-form label-position="left" label-width="80px">
                <el-form-item label="课程编号">
                  <span class="info">{{ this.$route.params.course_id }}</span>
                </el-form-item>
                <el-form-item label="责任教师">
                  <span class="info">{{courseTeacherID}}</span>
                </el-form-item>
                <el-form-item label="课程名称">
                  <span class="info">{{courseName}}</span>
                </el-form-item>
                <el-form-item label="课程介绍">
                  <span class="info">{{courseDes}}</span>
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
      activeIndex: "0",
      courseTeacherID:'',
      courseName:'',
      courseDes:'',
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.index == 0)
        this.$router.push({
          name: "info",
          params: {
            course_id: 42024401,
          },
        });
      else if (tab.index == 1)
        this.$router.push({
          name: "teachers",
          params: {
            course_id: 42024401,
          },
        });
      else if (tab.index == 2)
        this.$router.push({
          name: "tas",
          params: {
            course_id: 42024401,
          },
        });
    },
    editCourse(e) {
      this.$router.push({
        name: "edit",
        params: {
          course_id: 42024401,
          course_name: this.courseName,
          course_teacher_ID: this.courseTeacherID,
          course_des: this.courseDes,
        },
      });
    },
  },
  mounted() {
    let _this = this;
    this.$axios
      .get("/course/get", {
        params: {
          course_ID: this.$route.params.course_id,
        },
      })
      .then(function (response) {
        console.log(response.data)
        _this.courseTeacherID=response.data.teacher_ID
        _this.courseName=response.data.name
        _this.courseDes=response.data.description
      })
      .catch(function (error) {
        _this.courseTeacherID=''
        _this.courseName=''
        _this.courseDes=''
      });
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
  margin-top: 100px;
  margin-right: 100px;
}

.infoArea {
  margin-left: 130px;
  margin-top: 30px;
  line-height: 70px;
}

.btn {
  margin-left: 40px;
  margin-right: 20px;
}

.info{
  font-size: 17px;
}
</style>
