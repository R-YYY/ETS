<template>
  <div id="Task">
    <el-tabs class="stuTaskTab" v-model="activeName" @tab-click="handleClick">

      <el-tab-pane name="project" >
        <span slot="label" class="paneName"><i class="el-icon-date"></i> 实验项目</span>
        <StudentProject></StudentProject>
      </el-tab-pane>

      <el-tab-pane name="attendance" >
        <span slot="label" class="paneName"><i class="el-icon-location-outline"></i> 考勤</span>
        <StudentAttendance></StudentAttendance>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import StudentProject from "@/components/studentPages/task/StudentProject";
import StudentAttendance from "@/components/studentPages/task/StudentAttendance";
export default {
  name: "StudentTask",
  components:{
    StudentProject,
    StudentAttendance,
  },
  data(){
    return{
      activeName: 'project',
    }
  },
  mounted() {
    if(window.sessionStorage.getItem('stuTaskName')!=null){
      this.activeName=window.sessionStorage.getItem('stuTaskName')
    }
  },

  methods:{
    handleClick(tab) {
      window.sessionStorage.setItem('stuTaskName',tab.name)
    }
  }
}
</script>

<style scoped>
#Task{
  height: 100%;
  margin-top: 30px;
  margin-left: 150px;
  margin-right: 20px;
  background-color:white;
  cursor: context-menu;
}
.stuTaskTab{
  height: 830px;
  margin:30px 20px;
}

.paneName{
  height: 100%;
  margin: auto 120px;
  font-size: 17px;
}
</style>