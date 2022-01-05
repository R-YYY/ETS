<template>
  <div id="File">
    <el-tabs class="stuFileTab" v-model="activeName" @tab-click="handleClick">

      <el-tab-pane name="courseFile">
        <span slot="label" class="paneName"><i class="el-icon-document"></i> 课程参考资料</span>
        <CourseFile></CourseFile>
      </el-tab-pane>

      <el-tab-pane name="projectFile">
        <span slot="label" class="paneName"><i class="el-icon-notebook-2"></i> 项目参考资料</span>
        <ProjectFile></ProjectFile>
      </el-tab-pane>
    </el-tabs>
  </div>
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
    }
  },
  mounted() {
    if(window.sessionStorage.getItem('stuFileName')!=null){
      this.activeName=window.sessionStorage.getItem('stuFileName')
    }
  },
  methods:{
    handleClick(tab) {
      window.sessionStorage.setItem('stuFileName',tab.name)
    }
  }
}
</script>

<style scoped>
#File{
  height: 100%;
  margin-top: 30px;
  margin-left: 150px;
  margin-right: 20px;
  background-color:white;
}
.stuFileTab{
  height: 830px;

  margin:30px 20px;
  border: 1px solid red;
}
.paneName{
  height: 100%;
  margin: auto 120px;
  font-size: medium;
}
</style>