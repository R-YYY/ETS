<template>
  <el-container class="firstContainer">
    <el-header height="100px">
      <h1 style="font-size: 35px">口v口 Experiment Teaching System 口∧口</h1>
    </el-header>
    <el-container class="optionContainer">
      <el-aside class="optionAside" width="170px">
        <div>
          <img class="optionImg" src="../../../src/assets/course.jpg" alt="加载失败">
        </div>
        <div>
          <el-menu :default-active="activeIndex">
            <el-menu-item class="option" index="1" @click="toCourse">课程管理</el-menu-item>
            <el-menu-item class="option" index="2" @click="toStudent">学生管理</el-menu-item>
            <el-menu-item class="option" index="3" @click="toProject">学习任务</el-menu-item>
            <el-menu-item class="option" index="4" @click="toGrade">成绩管理</el-menu-item>
            <el-menu-item class="option" index="5" @click="toFile">学习资料</el-menu-item>
            <el-menu-item class="option" index="6" @click="toFeedback">课程反馈</el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main class="optionMain">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "CourseHome",
  data() {
    return {
        activeIndex: '1'
    }
  },
  methods:{
    toCourse(){
      this.$router.push({path:'/managecourse'})
    },
    toStudent(){
      this.$router.push({path:'/managestudent'})
    },
    toProject(){
      this.$router.push({path:'/manageproject'})
    },
    toGrade(){
      this.$router.push({path:'/managegrade'})
    },
    toFile(){
      this.$router.push({path:'/managefile'})
    },
    toFeedback(){
      this.$router.push({path:'/feedback'})
    }
  }
}
</script>

<style scoped>

.firstContainer{
  height: 100%;
  width: 100% ;
  border: 1px solid #eee
}

.optionContainer{
  width: 100%;
  height: 595px
}

.option{
  height: 70px;
  font-size: 17px;
}

.optionImg{
  width: 160px
}

.optionAside{
  text-align: center;
  background-color: rgb(238, 241, 246)
}

.optionMain{
  background-color: #e5eff5
}

</style>