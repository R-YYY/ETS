<template>
  <el-container style="height:100%">
    <el-header style="height: 9%">
      <h1 class="title">口v口 Experiment Teaching System 口∧口</h1>
    </el-header>
    <div style="width: 100%;height: 25%;background-color: #ceced2">
      <img class="courseImg" src="../../../src/assets/course.png" alt="加载失败">
    </div>
      <el-menu  mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1" style="margin-left: 250px"><span>课程信息</span></el-menu-item>
        <el-menu-item index="2"><span>课程学生</span></el-menu-item>
        <el-menu-item index="3"><span>学习任务</span></el-menu-item>
        <el-menu-item index="4"><span>课程成绩</span></el-menu-item>
        <el-menu-item index="5"><span>课程资料</span></el-menu-item>
        <el-menu-item index="6"><span>课程反馈</span></el-menu-item>
      </el-menu>
  </el-container>
</template>

<script>
export default {
  name: "StudentCourseHome"
}
</script>

<style scoped>
.title {
  font-size: 35px;
  line-height: 10px;
  text-align: left;
}

.courseImg{
  width: 150px;
  margin-left: 250px;
  margin-top: 15px;
}
</style>