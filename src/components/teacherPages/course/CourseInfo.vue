<template>
  <div>
    <div>
      <h2>课程信息</h2>
      <p class="courseID">课程编号：{{this.$route.params.course_id}}</p>
      <P class="courseName" id="courseName">课程名称：</P>
      <p class="courseDes" id="courseDes">课程介绍：</p>
    </div>
    <div class="btnArea">
      <el-button @click="editCourse">编辑资料</el-button>
      <el-button class="endCourseBtn">结束课程</el-button>
      <el-button class="deleteCourseBtn" type="danger" plain>删除课程</el-button>
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

.courseID{
  position: relative;
  top: 20px
}

.courseName{
  position: relative;
  top: 45px
}

.courseDes{
  position: relative;
  top: 70px
}

.btnArea{
  position:relative;
  top: 130px
}

.endCourseBtn{
  position: relative;
  left: 50px;
}

.deleteCourseBtn{
  position: relative;
  left: 100px;
}
</style>