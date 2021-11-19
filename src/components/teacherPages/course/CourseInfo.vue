<template>
  <div>
    <div>
      <h2>课程信息</h2>
      <p id="courseID">课程编号：{{this.$route.params.course_id}}</p>
      <p id="courseTeacher">责任教师：</p>
      <P id="courseName">课程名称：</P>
      <p id="courseDes">课程介绍：</p>
    </div>
    <div>
      <el-button class="editBtn" @click="editCourse">
        <span>编辑资料</span>
      </el-button>
      <el-button class="endBtn">
        <span>结束课程</span>
      </el-button>
      <el-button
          class="deleteBtn"
          type="danger"
          plain>
        <span>删除课程</span>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseInfo",
  data(){
    return{

    }
  },
  methods:{
    editCourse(e){
      this.$router.push({
        name:'edit',
        params:{
          course_id:42024401,
          course_name:document.getElementById("courseName").innerText.split("：")[1],
          course_teacher_ID:document.getElementById("courseTeacher").innerText.split("：")[1],
          course_des:document.getElementById("courseDes").innerText.split("：")[1]
        }
      })
    }
  },
  mounted:function () {
    let _this = this;
    this.$axios.get(
        "/course/get",{
          params:{
            course_ID:42024401
          }
        })
        .then(function (response) {
          document.getElementById("courseTeacher").innerHTML += response.data.teacher_ID
          document.getElementById("courseName").innerHTML += response.data.name
          document.getElementById("courseDes").innerHTML += response.data.description
        })
        .catch(function (error) {
          _this.courseInfo.name = ''
          _this.courseInfo.description = ''
        })
  },
}
</script>

<style scoped>

#courseID, #courseName, #courseTeacher, #courseDes{
  position: relative;
  margin-top: 35px;
  margin-bottom: 30px;
}

.editBtn, .endBtn, .deleteBtn{
  position: relative;
  margin-top: 60px;
  margin-left: 30px;
  margin-right: 40px;
}
</style>