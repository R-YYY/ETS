<template class="homeMain">
  <el-tabs class="stuTab"  v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="课程学生" name="student" style="width: 200px">
      <el-table>

      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "Student",
  data(){
    return{
      activeName:'student'
    }
  },
  methods:{
    handleClick(){

    }
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
</style>