<template>
  <div>
    <el-tabs class="projectTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane class="optionPage" label="发布任务">
        <div>
          <el-container class="projectContainer">
            <el-aside>
              <el-card class="typeCard" shadow="hover">
                <i class="el-icon-s-cooperation"></i><br>
                <p class="type1">发布实验项目</p>
              </el-card>
            </el-aside>
            <el-aside style="position: relative;left: 100px">
              <el-card class="typeCard" shadow="hover">
                <i class="el-icon-user-solid"></i><br>
                <p class="type2">发布课程考勤</p>
              </el-card>
            </el-aside>
          </el-container>
        </div>
      </el-tab-pane>

      <el-tab-pane class="optionPage" label="实验项目">
        <router-view name="projectList"></router-view>
      </el-tab-pane>

      <el-tab-pane class="optionPage" label="课程考勤">
        <router-view name="attendanceList"></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ManageTask",
  data() {
    const item = {
      id: '1111111',
      time: '0000-00-00 00:00:00',
      input: ''
    };
    return {
      drawer: false,
      direction: 'ltr',
      attendList:Array(15).fill(item),
    };
  },
  methods:{
    handleClick(tab,event){
      if(tab.index == 0)
        this.$router.push({
          name:'tasks',
          params: {
            course_id:42024401
          }
        })
      else if(tab.index == 1)
        this.$router.push({
          name:'projects',
          params: {
            course_id:42024401
          }
        })
      else if(tab.index == 2)
        this.$router.push({
          name:'attendances',
          params:{
            course_id:42024401
          }
        })
    }
  }
}
</script>

<style scoped>
.projectTab{
  height:480px;
  width: 1150px;
  position: relative;
  left: 70px;
  top:45px;
}

.optionPage{
  height: 450px;
}

.projectContainer{
  height: 450px;
  width: 800px;
  position: relative;
  left: 220px;
  top:50px
}

.el-icon-s-cooperation{
  font-size: 180px;
  position: relative;
  left: 30px;
}

.el-icon-user-solid{
  font-size: 180px;
  position: relative;
  left: 30px;
}

.type1{
  font-size: 25px;
  position: relative;
  left: 50px;
}

.type2{
  font-size: 25px;
  position: relative;
  left: 50px;
}

.typeCard{
  border-width: 2px;
}
</style>