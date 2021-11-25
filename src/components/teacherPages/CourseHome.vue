<template>
  <el-container style="height: 100%">
    <el-header style="height: 10%">
      <h1 class="title">口v口 Experiment Teaching System 口∧口</h1>
    </el-header>
    <el-container>
      <el-aside class="mainAside" width="170px">
        <img
          id="courseImg"
          src="../../../src/assets/course.png"
          alt="加载失败"
        />
        <div>
          <el-menu
            :default-active="activeIndex"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item class="option" index="1" @click="toCourse">
              <i class="el-icon-reading"></i>
              <span>课程管理</span>
            </el-menu-item>
            <el-menu-item class="option" index="2" @click="toStudent">
              <i class="el-icon-user"></i>
              <span>学生管理</span>
            </el-menu-item>
            <el-menu-item class="option" index="3" @click="toTask">
              <i class="el-icon-document-copy"></i>
              <span>学习任务</span>
            </el-menu-item>
            <el-menu-item class="option" index="4" @click="toGrade">
              <i class="el-icon-finished"></i>
              <span>成绩管理</span>
            </el-menu-item>
            <el-menu-item class="option" index="5" @click="toFile">
              <i class="el-icon-folder-opened"></i>
              <span>学习资料</span>
            </el-menu-item>
            <el-menu-item class="option" index="6" @click="toFeedback">
              <i class="el-icon-edit-outline"></i>
              <span>课程反馈</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main style="background-color: #f5f5f5">
        <router-view style="height: 100%"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "CourseHome",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    toCourse() {
      this.$router.push({ name: "info" });
    },
    toStudent() {
      this.$router.push({ name: "students" });
    },
    toTask() {
      this.$router.push({ name: "tasks" });
    },
    toGrade() {
      this.$router.push({ name: "totalGrades" });
    },
    toFile() {
      this.$router.push({ name: "files" });
    },
    toFeedback() {
      this.$router.push({ name: "feedbacks" });
    },
  },
  mounted() {
    this.$router.push({
      name: "info",
      params: {
        course_id: 42024401,
      },
    });
  },
};
</script>

<style scoped>
.option {
  width: 170px;
  height: 70px;
  font-size: 17px;
}

#courseImg {
  margin-top: 5px;
  width: 170px;
}

.mainAside {
  text-align: center;
  background-color: #545c64;
}

.title {
  font-size: 35px;
  line-height: 10px;
  text-align: left;
}
</style>

