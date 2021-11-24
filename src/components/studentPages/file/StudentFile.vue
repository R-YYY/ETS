<template>
  <el-tabs class="stuFileTab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="课程参考资料" name="courseFile"></el-tab-pane>
    <el-tab-pane label="实验项目资料" name="projectFile"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "StudentFile",
  data(){
    return{
      activeName:'courseFile',
      name:'courseFile'
    }
  },
  methods:{
    handleClick(){

    }
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
</style>