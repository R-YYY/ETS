<template>
  <div>
    <el-tabs class="projectTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane class="optionPage" label="发布任务">
        <div>
          <el-container>
            <el-aside width="500px">
                <el-card class="typeCard" shadow="hover" @click.native="addProject">
                  <i class="el-icon-s-cooperation"></i><br>
                  <p class="choice">发布实验项目</p>
                </el-card>
              <el-dialog :visible.sync="projectDialogVisible">

              </el-dialog>
            </el-aside>
            <el-aside width="500px">
              <el-card class="typeCard" shadow="hover" @click.native="addAttendance">
                <i class="el-icon-user-solid"></i><br>
                <p class="choice">发布课程考勤</p>
              </el-card>
              <el-dialog :visible.sync="attendanceDialogVisible">

              </el-dialog>
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
    return {
      projectDialogVisible:false,
      attendanceDialogVisible:false,
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
    },
    addProject(){
      this.projectDialogVisible = true;
    },
    addAttendance(){
      this.attendanceDialogVisible = true;
    }
  }
}
</script>

<style scoped>
.projectTab{
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 30px;
  background-color:white;
}

.el-icon-user-solid, .el-icon-s-cooperation{
  font-size: 180px;
  position: relative;
  margin-left: 30px;
}

.choice{
  font-size: 25px;
  position: relative;
  margin-left: 50px;
}

.typeCard{
  border-width: 2px;
  margin-top: 110px;
  margin-left: 160px;
  margin-right: 50px;
  cursor:pointer;
}
</style>