<template>
  <el-container style="height:100%">
    <el-header style="height: 9%">
      <h1 class="title">口v口 Experiment Teaching System 口∧口</h1>
    </el-header>
    <div style="width: 100%;height: 28%;background-color: #9189fd">
      <el-container>
        <img class="courseImg" src="../../../src/assets/course.png" alt="加载失败">
        <span class="courseTitle">
          {{courseName}}<br>课程编号：{{courseID}}
        </span>
        <el-container class="timeArea">
          <el-card class="time">2</el-card>
          <el-card class="time">2</el-card>
          <span class="colon">:</span>
          <el-card class="time">2</el-card>
          <el-card class="time">2</el-card>
        </el-container>
      </el-container>
    </div>
    <el-menu default-active="1" mode="horizontal" background-color="#746ec9" text-color="#fff" active-text-color="#fff">
      <el-menu-item index="1" class="stuOption" style="margin-left: 170px" @click="toTask"><span>学习任务</span></el-menu-item>
      <el-menu-item index="2" class="stuOption" @click="toFile"><span>课程资料</span></el-menu-item>
      <el-menu-item index="3" class="stuOption" @click="toStudent"><span>课程学生</span></el-menu-item>
      <el-menu-item index="4" class="stuOption" @click="toGrade"><span>课程成绩</span></el-menu-item>
      <el-menu-item index="5" class="stuOption" @click="toFeedback"><span>课程反馈</span></el-menu-item>
    </el-menu>
    <el-container style="background-color: whitesmoke">
      <div class="courseShow" >
        <router-view></router-view>
      </div>
      <div class="courseInfoArea">
        <el-card class="courseInfo" shadow="never">
          <div slot="header">
            <span style="font-size: 20px">授课教师</span>
          </div>
        </el-card>
        <el-card class="courseInfo" shadow="never">
          <div slot="header">
            <span style="font-size: 20px">课程信息</span>
          </div>
        </el-card>
      </div>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "StudentCourseHome",
  data(){
    return {
      courseName:'软件工程课程设计',
      courseID:'42014603',
    }
  },
  methods:{
    toTask(){
      this.$router.push({name:'stuTasks'})
    },
    toFile(){
      this.$router.push({name:'stuFiles'})
    },
    toGrade(){
      this.$router.push({name:'stuGrades'})
    },
    toStudent(){
      this.$router.push({name:'stuStudents'})
    },
    toFeedback(){
      this.$router.push({name:'stuFeedbacks'})
    }
  },
  mounted() {
    this.$router.push({
      name:'stuTasks',
      params:{
        course_id:42024401
      }
    })
  }
}
</script>

<style scoped>
.title {
  font-size: 35px;
  line-height: 10px;
  text-align: left;
}

.courseImg{
  width: 150px;
  margin-left: 180px;
  margin-top: 20px;
}

.courseTitle{
  width: 300px;
  color: white;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 50px;
  line-height: 70px;
}

.stuOption{
  font-size: 16px;
  width: 150px;
  text-align: center;
}

.courseInfoArea{
  height: 100%;
  width: 30%
}

.courseShow{
  height: 100%;
  width: 70%
}

.courseInfo{
  margin-left: 20px;
  margin-right: 120px;
  margin-top: 30px;
}

.time{
  margin-top: 20px;
  margin-left: 10px;
  font-size: 100px;
}

.colon{
  font-size: 100px;
  margin-top: 35px;
  margin-left: 10px;
  margin-right: 0;
  border-width: 0;
  background-color: rgba(0,0,0,0%)
}

.timeArea{
  margin-left: 150px;
}
</style>

<style>
.el-menu-item.is-active{
  font-size: 20px;
}
</style>