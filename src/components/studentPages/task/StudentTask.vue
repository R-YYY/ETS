<template>
  <el-tabs class="stuTaskTab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="实验项目" name="project">
      <div class="projectCard" v-for="project in projectList">
        <el-descriptions :title="project.name" :column="2">
          <template slot="extra">
            <el-button type="primary" icon="el-icon-edit" plain id="checkButton" size="medium" @click="btnClick">去完成</el-button>
          </template>
          <el-descriptions-item label="开始时间">{{project.start_time}}</el-descriptions-item>
          <el-descriptions-item label="截止时间" class="redEndTime">{{project.end_time}}</el-descriptions-item>
          <el-descriptions-item label="发布老师">待定</el-descriptions-item>
        </el-descriptions>
<!--          <span>-->
<!--            <p style="font-size: 18px"><i class="el-icon-ship" style="color: #0cd5ce;margin-left: 5px;margin-right: 15px"></i>{{project.name}}</p>-->
<!--            <p>{{project.description}}</p>-->
<!--            <p style="color: #9b9b9b">{{project.release_time}}</p>-->
<!--          </span>-->
        <el-divider></el-divider>
      </div>
    </el-tab-pane>
    <el-tab-pane label="考勤" name="attendance">

    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "StudentTask",
  data(){
    return{
      activeName:'project',
      projectList:[]
    }
  },
  methods:{
    handleClick(){

    },
    open(){
      window.open()
    },
    btnClick(){

      // this.getElementById("checkButton")
    }
  },
  mounted() {
    let _this=this
    this.$axios.get(
        '/course/getProjectListByCourseId',{
      params: {
        course_ID: this.$route.params.course_id,
      },
    })
    .then((response)=>{
      _this.projectList=response.data
    })
  }
}
</script>

<style scoped>
.stuTaskTab{
  height: 100%;
  margin-top: 30px;
  margin-left: 170px;
  margin-right: 20px;
  background-color: white;
}

.redEndTime{
  color: tomato;
}

.projectCard{
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;
  cursor: pointer;
}
</style>

<style>
.el-tabs__item{
  margin-top: 10px;
  height: 50px;
  width: 150px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #303133;
}
</style>