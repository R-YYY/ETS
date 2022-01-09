<template>
  <div id="StudentGrade">
    <el-tabs class="stuGradeTab" v-model="activeName" @tab-click="handleClick">

      <el-tab-pane name="weight">
        <span slot="label" class="paneName"><i class="el-icon-user-solid"></i> 成绩权重</span>
        <GradeWeight></GradeWeight>
      </el-tab-pane>

      <el-tab-pane name="project">
        <span slot="label" class="paneName"><i class="el-icon-edit-outline"></i> 实验项目成绩</span>
        <ProjectGrade></ProjectGrade>
      </el-tab-pane>

      <el-tab-pane name="total">
        <span slot="label" class="paneName"><i class="el-icon-date"></i> 总成绩</span>
        <TotalGrade></TotalGrade>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import GradeWeight from "./GradeWeight";
import ProjectGrade from "./ProjectGrade";
import TotalGrade from "./TotalGrade";

export default {
  name: "StudentGrade",
  components: {GradeWeight, ProjectGrade, TotalGrade},
  data(){
    return{
      activeName:'weight',
    }
  },
  mounted() {
    if(window.sessionStorage.getItem('stuGradeName')!=null){
      this.activeName=window.sessionStorage.getItem('stuGradeName')
    }
  },
  methods:{
    handleClick(tab) {
      window.sessionStorage.setItem('stuGradeName',tab.name)
    }
  }
}
</script>

<style scoped>
#StudentGrade{
  height: 100%;
  margin-top: 30px;
  margin-left: 150px;
  margin-right: 20px;
  background-color:white;
  cursor: context-menu;
}
.stuGradeTab{
  height: 830px;
  margin:30px 20px;
}
.paneName{
  height: 100%;
  margin: auto 55px;
  font-size: 17px;
}
</style>