<template>
  <div id="StuFeedback">
    <el-tabs class="stuFileTab" v-model="activeName" @tab-click="handleClick">

      <el-tab-pane name="announcement">
        <span slot="label" class="paneName"><i class="el-icon-bell"></i> 公告</span>
        <Announcement></Announcement>
      </el-tab-pane>

      <el-tab-pane name="feedback">
        <span slot="label" class="paneName"><i class="el-icon-edit-outline"></i> 学生反馈</span>
        <Feedback></Feedback>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Feedback from "./Feedback";
import Announcement from "./Announcement";
export default {
  name: "StudentFeedback",
  components: {Announcement, Feedback},
  data(){
    return{
      activeName:'announcement',
    }
  },
  mounted() {
    if(window.sessionStorage.getItem('stuFeedbackName')!=null){
      this.activeName=window.sessionStorage.getItem('stuFeedbackName')
    }
  },
  methods:{
    handleClick(tab) {
      window.sessionStorage.setItem('stuFeedbackName',tab.name)
    }
  }
}
</script>
<style scoped>
#StuFeedback{
  height: 100%;
  margin-top: 30px;
  margin-left: 150px;
  margin-right: 20px;
  background-color:white;
}
.stuFileTab{
  height: 830px;
  margin:30px 20px;
  /*border: 1px solid red;*/
}
.paneName{
  height: 100%;
  margin: auto 120px;
  font-size: medium;
}
</style>

