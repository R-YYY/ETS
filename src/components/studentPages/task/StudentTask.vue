<template>
  <el-tabs class="stuTaskTab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="实验项目" name="project">
      <div class="projectCard" v-for="project in projectList">
        <p style="font-size: 18px"><i class="el-icon-ship" style="color: #0cd5ce;margin-left: 5px;margin-right: 15px"></i>{{project.name}}</p>
        <p>{{project.description}}</p>
        <p style="color: #9b9b9b">{{project.release_time}}</p>
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