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
            <el-menu-item class="option" index="1" @click="toCourse">
              <i class="el-icon-reading"></i>课程管理
            </el-menu-item>
            <el-menu-item class="option" index="2" @click="toStudent">
              <i class="el-icon-user"></i>学生管理
            </el-menu-item>
            <el-menu-item class="option" index="3" @click="toTask">
              <i class="el-icon-document-copy"></i>学习任务
            </el-menu-item>
            <el-menu-item class="option" index="4" @click="toGrade">
              <i class="el-icon-finished"></i>成绩管理
            </el-menu-item>
            <el-menu-item class="option" index="5" @click="toFile">
              <i class="el-icon-folder-opened"></i>学习资料
            </el-menu-item>
            <el-menu-item class="option" index="6" @click="toFeedback">
              <i class="el-icon-edit-outline"></i>课程反馈
            </el-menu-item>
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
      this.$router.push({
        name:'info',
        params:{
          course_id:42024401
        }
      });
    },
    toStudent(){
      this.$router.push({
        name:'students',
        params:{
          course_id:42024401
        }
      })
    },
    toTask(){
      this.$router.push({
        name:'tasks',
        params:{
          course_id:42024401
        }
      })
    },
    toGrade(){
      this.$router.push({
        name:'grades',
        params:{
          course_id:42024401
        }
      })
    },
    toFile(){
      this.$router.push({
        name:'files',
        params:{
          course_id:42024401
        }
      })
    },
    toFeedback(){
      this.$router.push({
        name:'feedbacks',
        params:{
          course_id:42024401
        }
      })
    }
  },
  mounted() {
    this.$router.push({
      name:'info',
      params:{
        course_id:42024401
      }
    });
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
  width: 150px
}

.optionAside{
  text-align: center;
  background-color: rgb(238, 241, 246)
}

.optionMain{
  background-color: #e5eff5
}

</style>