<template>
  <div>
    <el-tabs class="feedbackTab" type="border-card">
      <div class="searchArea">
        <el-input class="input" v-model="input" placeholder="请输入反馈人姓名"></el-input>
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
  height:520px;
  width: 1150px;
  position: relative;
  left: 70px;
  top:45px;
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