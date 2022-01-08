<template>
  <el-container style="height: 100%">
    <el-header style="height: 7%">
      <span class="title"><b>口v口 Experiment Teaching System 口∧口</b></span>
      <el-button class="backHome" @click="toHome" type="primary">返回首页</el-button>
    </el-header>
    <el-container>
      <!--主页侧边栏-->
      <el-aside class="mainAside" width="150px">
        <!--主页侧边栏课程头像-->
        <img
          id="courseImg"
          src="../../../src/assets/course2.png"
          alt="加载失败"
        />
        <div>
          <!--主页侧边栏选项卡-->
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
            <el-menu-item class="option" index="6" @click="toAnnouncement">
              <i class="el-icon-edit-outline"></i>
              <span>课程交流</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main style="background-color: whitesmoke">
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
      activeIndex: "",
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
    toAnnouncement() {
      this.$router.push({ name: "announcements" });
    },
    toHome(){
      if (window.sessionStorage.getItem("account_ID").length == 5)
        this.$router.push("/teacherhome");
      else if (window.sessionStorage.getItem("account_ID").length == 7)
        this.$router.push("/studenthome");
    }
  },
  mounted() {
    //刷新时保持侧边栏选中
    if (
      this.$route.name === "info" ||
      this.$route.name === "tas" ||
      this.$route.name === "teachers"
    ) {
      this.activeIndex = "1";
    } else if (this.$route.name === "students") {
      this.activeIndex = "2";
    } else if (
      this.$route.name === "tasks" ||
      this.$route.name === "projects" ||
      this.$route.name === "attendances"
    ) {
      this.activeIndex = "3";
    } else if (
      this.$route.name === "totalGrades" ||
      this.$route.name === "partGrades" ||
      this.$route.name === "setGrades"
    ) {
      this.activeIndex = "4";
    } else if (this.$route.name === "files") {
      this.activeIndex = "5";
    }
    else if (this.$route.name === "feedbacks") {
      this.activeIndex = "6";
    }
  },
};
</script>

<style scoped>
.option {
  width: 150px;
  height: 70px;
  font-size: 17px;
}

#courseImg {
  margin-top: 30px;
  width: 140px;
  margin-bottom: 30px;
}

.mainAside {
  text-align: center;
  background-color: #545c64;
}

.title {
  font-size: 31px;
  /*line-height: 0;*/
  text-align: left;
}

.backHome{
  height: 38px;
  position: absolute;
  top:10%;
  right: 4.5%;
  /*margin-left: 500px;*/
}
</style>
