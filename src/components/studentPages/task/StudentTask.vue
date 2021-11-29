<template>
  <el-tabs class="stuTaskTab" v-model="activeName" @click="handleClick">

    <el-tab-pane name="project">
      <span slot="label" class="paneName"><i class="el-icon-date"></i> 实验项目</span>
      <StudentProject v-bind:course_id="'42024401'"></StudentProject>
    </el-tab-pane>

    <el-tab-pane name="attendance">
      <span slot="label" class="paneName"><i class="el-icon-location-outline"></i> 考勤</span>
      <StudentAttendance></StudentAttendance>
    </el-tab-pane>

  </el-tabs>
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
      course_ID: this.$route.params.course_id,
    }
  },
  methods:{
    handleClick(tab, event){
      console.log(tab, event);
    },
    // goBack() {
    //   window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    // },
    // open(){
    //   window.open()
    // },
  },
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

.paneName{
  height: 100%;
  margin-left: 50px;
  margin-right: 50px;
  font-size: medium;
}
</style>