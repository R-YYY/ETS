<template class="homeMain">
  <el-tabs class="stuTaskTab" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部" name="total" style="width: 200px">
      <el-table>

      </el-table>
    </el-tab-pane>
    <el-tab-pane label="实验项目" name="project">

    </el-tab-pane>
    <el-tab-pane label="考勤" name="attendance">

    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "StudentTask",
  data(){
    return{
      activeName:'total'
    }
  },
  methods:{
    handleClick(){

    }
  }
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
</style>

<style>
.el-tabs__item{
  margin-top: 10px;
  height: 50px;
  width: 150px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #303133;
}
</style>