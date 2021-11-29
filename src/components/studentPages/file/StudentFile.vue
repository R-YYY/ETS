<template>
  <el-tabs class="stuFileTab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane name="courseFile">
      <span slot="label" class="paneName"><i class="el-icon-document"></i> 课程参考资料</span>
      <CourseFile v-bind:course_id="'42024401'"></CourseFile>
    </el-tab-pane>

    <el-tab-pane name="projectFile">
      <span slot="label" class="paneName"><i class="el-icon-notebook-2"></i> 项目参考资料</span>
      <ProjectFile v-bind:course_id="'42024401'"></ProjectFile>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import CourseFile from "@/components/studentPages/file/CourseFile";
import ProjectFile from "@/components/studentPages/file/ProjectFile";
export default {
  name: "StudentFile",
  components: {ProjectFile, CourseFile},
  data(){
    return{
      activeName:'courseFile',
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

.stuFileTab{
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