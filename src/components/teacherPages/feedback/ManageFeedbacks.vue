<template>
  <div>
    <el-tabs class="feedbackTab" type="border-card">
      <div class="searchArea">
        <el-input class="input" v-model="input" placeholder="请输入反馈人姓名">
        </el-input>
        <el-button type="primary">搜索</el-button>
      </div>
      <el-empty description="没有反馈"></el-empty>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Feedback"
}
</script>

<style scoped>
.feedbackTab{
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color:white;
}

.searchArea{
  position:relative;
  left: 50px;
  top: 20px;
  height: 60px;
}

.input{
  width: 300px;
}
</style>