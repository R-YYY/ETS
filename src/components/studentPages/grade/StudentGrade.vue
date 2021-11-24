<template class="homeMain">
  <el-tabs class="stuGradeTab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="总成绩" name="total" style="width: 200px">
    </el-tab-pane>
    <el-tab-pane label="实验项目成绩" name="project">
    </el-tab-pane>
    <el-tab-pane label="考勤成绩" name="attendance">
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "StudentGrade",
  data(){
    return{
      activeName:'total',
    }
  },
  methods:{
    handleClick(){

    }
  }
}
</script>

<style scoped>
.stuGradeTab{
  height: 100%;
  margin-top: 30px;
  margin-left: 170px;
  margin-right: 20px;
  background-color: white;
}
</style>