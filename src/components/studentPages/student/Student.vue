<template>
  <div id="Student">
    <el-tabs class="stuTab" v-model="activeName" @tab-click="handleClick">

      <el-tab-pane name="normalStudent">
        <span slot="label" class="paneName"><i class="el-icon-user-solid"></i> 学生</span>
        <NormalStudent></NormalStudent>
      </el-tab-pane>

      <el-tab-pane name="TA">
        <span slot="label" class="paneName"><i class="el-icon-s-custom"></i> 助教</span>
        <TA></TA>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NormalStudent from "@/components/studentPages/student/NormalStudent";
import TA from "@/components/studentPages/student/TA";
export default {
  name: "Student",
  components: {TA, NormalStudent},
  data(){
    return{
      activeName:'normalStudent',
      course_ID: this.$route.params.course_id,
    }
  },
  methods:{
    handleClick(tab, event){
      console.log(tab, event);
    },
  }
}
</script>

<style scoped>
#Student{
  height: 100%;
  margin-top: 30px;
  margin-left: 150px;
  margin-right: 20px;
  background-color:white;
  cursor: context-menu;
}
.stuTab{
  height: 830px;
  margin:30px 20px;
}

.paneName{
  height: 100%;
  margin: auto 120px;
  font-size: 17px;
}
</style>