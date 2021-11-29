<template>
  <el-tabs class="stuTab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane name="normalStudent">
      <span slot="label" class="paneName"><i class="el-icon-user-solid"></i> 学生</span>
      <NormalStudent v-bind:course_id="'42024401'"></NormalStudent>
    </el-tab-pane>

    <el-tab-pane name="TA">
      <span slot="label" class="paneName"><i class="el-icon-s-custom"></i> 助教</span>
      <TA v-bind:course_id="'42024401'"></TA>
    </el-tab-pane>
  </el-tabs>
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
.stuTab{
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