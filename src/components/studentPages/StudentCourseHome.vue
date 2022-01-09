<template>
  <el-container class="pageContainer">
    <el-header class="pageHeader">
      <el-container>
        <img
            src="@/assets/course2.png"
            alt=""
            style="height: 50px; width: 70px; margin-right: 20px;margin-top: 5px"
        />
        <span class="title"><b>实验教学管理系统</b></span>
      </el-container>
<!--      <span class="title"><b>实验教学管理系统</b></span>-->
    </el-header>

    <div class="pageMiddle">
      <el-container>
        <img class="courseImg" src="../../../src/assets/course.png" alt="加载失败">
        <span class="courseTitle">
          {{course.name}}<br>课程编号：{{courseID}}
        </span>
        <el-container class="timeArea">
          <el-card class="time">{{ parseInt(date.getHours()/10) }}</el-card>
          <el-card class="time">{{ date.getHours()%10 }}</el-card>
          <span class="colon">:</span>
          <el-card class="time">{{ parseInt(date.getMinutes()/10)}}</el-card>
          <el-card class="time">{{ date.getMinutes()%10}}</el-card>
        </el-container>
      </el-container>
    </div>

    <el-menu class="menu" :default-active="activeIndex" mode="horizontal" background-color="#746ec9" text-color="#fff" active-text-color="#fff">

      <el-menu-item index="1" class="stuOption" @click="toTask">
        <span>学习任务</span>
      </el-menu-item>

      <el-menu-item index="2" class="stuOption" @click="toFile">
        <span>课程资料</span>
      </el-menu-item>

      <el-menu-item index="3" class="stuOption" @click="toStudent">
        <span>课程学生</span>
      </el-menu-item>

      <el-menu-item index="4" class="stuOption" @click="toGrade">
        <span>课程成绩</span>
      </el-menu-item>

      <el-menu-item index="5" class="stuOption" @click="toFeedback">
        <span>课程交流</span>
      </el-menu-item>

      <el-menu-item index="6" class="toHome" style="margin-left: 300px;" @click="toHome">
        <span>返回我的主页</span>
      </el-menu-item>

    </el-menu>

    <el-container>
      <div class="courseShow-box">
        <div class="courseShow" >
          <router-view></router-view>
        </div>
      </div>

      <div class="courseInfoArea">
        <el-card class="courseInfo" shadow="never">
          <div slot="header">
            <span style="font-size: 20px">授课教师</span>
          </div>

          <el-card shadow="hover" v-for="info in teacher_list" style="margin-bottom: 14px">
            <p>姓名：{{info.name}}</p>
            <p>邮箱: {{info.email}}</p>
          </el-card>
        </el-card>


        <el-card class="courseInfo" shadow="never">
          <div slot="header">
            <span style="font-size: 20px">课程信息</span>
          </div>
          <div>
            <p>{{course.description}}</p>
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
      date:new Date(),
      courseID: this.$route.params.course_id,
      student_ID:window.sessionStorage.getItem('account_ID'),
      activeIndex: '',
      teacher_list:[],
      course : {},
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
    },
    toHome(){
      this.$router.push({name:'StudentHome'})
    }
  },
  mounted() {
    //刷新时保持侧边栏选中
    if (
        this.$route.name === "stuTasks"
    ) {
      this.activeIndex = "1";
    }
    else if (this.$route.name === "stuFiles") {
      this.activeIndex = "2";
    }
    else if (
        this.$route.name === "stuStudents"
    ) {
      this.activeIndex = "3";
    }
    else if (
        this.$route.name === "stuGrades"
    ) {
      this.activeIndex = "4";
    }
    else if (this.$route.name === "stuFeedbacks") {
      this.activeIndex = "5";
    }

    //创建定时器更新最新时间
    this.timer = setInterval(() => {
      this.date = new Date(); // 修改日期数据
    }, 1000);
    // 获取课程的授课教师列表
    let id=this.courseID;
    // console.log(id)
    this.$axios.get(
        '/course/getTeacherInfoList',{
          params:{
            course_ID:id,
          },
          headers:{
            token: window.sessionStorage.getItem('token')
          }
        }
    ).then(
        (response)=>{
          this.teacher_list=response.data;
          console.log('teacher_list')
          console.log(response.data)
        }
    )
    this.$axios.get(
        '/course/get',{
          params:{
            course_ID:id,
          },
          headers:{
            token: window.sessionStorage.getItem('token')
          }
        }
    ).then((response)=>{
      console.log('course: '+response.data)
      this.course=response.data;
      if(this.course.description==null||this.course.description=='null'){
        this.course.description='暂无课程介绍'
      }
    })
  },
  beforeDestroy() {
    //清除定时器
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
</script>

<style scoped>
.pageContainer{
  background-color: whitesmoke;
  height:100%;
  overflow:auto
}

.pageHeader{
  height: 9%;
  background-color: white
}

.pageMiddle{
  width: 100%;
  height: 28%;
  /*background-color: #9189fd*/
  background-image: linear-gradient(to bottom right, rgba(238,130,248,1), rgba(255,255,130,1));
}

.title {
  /*padding-left: 10px;*/
  font-size: 28px;
  line-height: 60px;
  text-align: left;
  /*font-family: "Microsoft YaHei UI Light";*/
}

.courseImg{
  width: 150px;
  margin-left: 180px;
  margin-top: 15px;
  margin-bottom: 10px;
}

.courseTitle{
  width: 400px;
  color: white;
  font-size: 20px;
  margin-top: 30px;
  margin-left: 50px;
  line-height: 70px;
}

.menu{
  padding-left: 150px;
}

.stuOption{
  font-size: 18px;
  width: 150px;
  text-align: center;
}
.toHome{
  width: 200px;
  text-align: center;
  font-size: 25px;
}

.courseInfoArea{
  height: 100%;
  width: 30%
}
.courseShow-box{
  width: 70%;
  /*width: 850px;*/
  /*height: 690px;*/
  /*border:1px solid black;*/
  /*margin-left: 150px;*/
  /*overflow: hidden;*/
}
.courseShow{
  /*width: 850px;*/
  /*height: 650px;*/
  /*overflow: auto;*/
  /*margin-left: 20px;*/
  /*border:1px solid black;*/
}

.courseInfo{
  margin: 30px 120px 20px 20px;
  /*border: 1px solid red;*/
  height: 400px;
  overflow: auto;
}

.timeArea{
  margin-top: 10px;
  margin-left: 50px;
  margin-bottom: 10px;
}

.time{
  margin-top: 10px;
  margin-left: 10px;
  font-size: 80px;
}

.colon{
  font-size: 90px;
  margin-top: 17px;
  margin-left: 10px;
  margin-right: 0;
  border-width: 0;
  background-color: rgba(0,0,0,0%)
}
.teacher_info{
  /*background: rgba(0,200,0,0.3);*/
  padding: 0 5px;
  border-radius: 5px;
  border: 1px solid rgba(125,125,125,0.5);
  margin:5px 1px;
  font-size: medium;
  font-weight: normal;
}
</style>
