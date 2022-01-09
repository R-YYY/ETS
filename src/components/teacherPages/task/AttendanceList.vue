<template>
  <div>
    <div style="height: 40px"></div>
    <div>
      <el-tabs
        class="attendanceTab"
        type="border-card"
        @tab-click="handleClick"
        value="attendance"
      >
        <el-tab-pane label="发布任务" name="task"> </el-tab-pane>
        <el-tab-pane label="实验项目" name="project"> </el-tab-pane>
        <el-tab-pane label="课程考勤" name="attendance">
          <div style="height: 500px">
            <el-table
              class="attendTable"
              :data="attendList"
              height="500px"
            >
              <el-table-column label="序号" type="index" width="200px">
              </el-table-column>
              <el-table-column
                prop="start_time"
                label="开始时间"
                width="250px"
                sortable
              >
              </el-table-column>
              <el-table-column
                prop="end_time"
                label="结束时间"
                width="250px"
                sortable
              >
              </el-table-column>
              <el-table-column
                  prop="number"
                  label="考勤人数"
                  width="150px"
              ></el-table-column>
              <el-table-column width="200px">
                <template slot-scope="scope">
                <el-button type="text" @click="attendInfo(scope.row)"
                  >查看详情</el-button>
                  <el-button type="text" @click="open(scope.row)" style="margin-left: 50px" v-if="isTea()"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div>
              <el-drawer
                :title="'考勤开始时间：'+ this.start_time"
                :visible.sync="drawer"
                :direction="direction"
                size="30%"
              >
                <el-table
                    class="attendStuTable"
                    :data="attendStuList"
                    :row-style="{ height: '50px' }"
                    :cell-style="{ padding: '0' }"
                >
                  <el-table-column
                      label="学号"
                      prop="student_ID"
                      width="130px"
                      sortable
                  ></el-table-column>
                  <el-table-column
                      label="姓名"
                      prop="name"
                      width="150px"
                      sortable
                  ></el-table-column>
                  <el-table-column
                      label="考勤状态"
                      prop="attend_state"
                      align="center"
                      width="120px"
                      :filters="[
                  { text: '出勤', value: '出勤' },
                  { text: '缺勤', value: '缺勤' },]"
                      :filter-method="filterAttend">
                    <template slot-scope="scope">
                      <el-tag
                          :type="scope.row.attend_state === '出勤' ? 'success' : 'danger' "
                          disable-transitions>
                        {{ scope.row.attend_state }}</el-tag>
                    </template>
                  </el-table-column>
                </el-table>
              </el-drawer>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttendanceList",
  data() {
    return {
      drawer: false,
      direction: "ltr",
      start_time:"",
      attendList: [],
      attendStuList:[],
    };
  },
  methods: {
    isAct(){
      return window.sessionStorage.getItem("is_active") === "1"
    },

    isRes(){
      let resTeacher_ID = window.sessionStorage.getItem("resTeacher_ID")
      let account_ID = window.sessionStorage.getItem("account_ID")
      return resTeacher_ID === account_ID
    },

    isTea(){
      let account_ID = window.sessionStorage.getItem("account_ID")
      return account_ID.length===5
    },

    handleClick(tab, event) {
      if (tab.index == 0) this.$router.push({ name: "tasks" });
      else if (tab.index == 1) this.$router.push({ name: "projects" });
      else if (tab.index == 2) this.$router.push({ name: "attendances" });
    },

    filterAttend(value, row) {
      return row.attend_state === value;
    },

    open(row){
      this.$confirm("此操作将从课程中删除该考勤及相关考勤记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteAttend(row)
      }).catch();
    },

    deleteAttend(row){
      let data = new FormData()
      data.append("course_ID",this.$route.params.course_id)
      data.append("start_time",row.start_time)
      data.append("end_time",row.end_time)
      this.$axios({
        url:"/attend/deleteAttendance",
        method:"post",
        data:data,
        headers: {
          token: window.sessionStorage.getItem('token')
        },
      }).then((response)=>{
        if(response.data === 1){
          this.attendList.splice(row,1)
          this.$message({
            type: "success",
            message: "删除成功！",
          });
        }
        else{
          this.$message({
            type: "error",
            message: "删除失败，请重试！",
          });
        }
      }).catch(()=>{
        this.$message({
          type: "error",
          message: "删除失败，请重试！",
        });
      })
    },

    attendInfo(row){
      this.start_time = row.start_time
      this.attendStuList = []
      this.$axios({
        url:"/attend/getStuAttendList",
        method:"get",
        params:{
          course_ID:this.$route.params.course_id,
          start_time:this.start_time
        },
        headers: {
          token: window.sessionStorage.getItem('token')
        },
      }).then((response)=>{
        for (let i = 0; i < response.data.length; i++) {
          this.attendStuList.push({
            "student_ID":response.data[i].student_ID,
            "name":response.data[i].name,
            "attend_state":response.data[i].attend_type===null?"缺勤":"出勤"
          })
        }
      }).catch()
      this.drawer=true
    }
  },
  mounted() {
    //调用api加载考勤列表
    this.$axios({
      url: "/attend/getAttendanceInfoList",
      method: "get",
      params: {
        course_ID: this.$route.params.course_id,
      },
      headers: {
        token: window.sessionStorage.getItem('token')
      },
    }).then((response)=>{
      for (let i = 0; i < response.data.length; i++) {
        this.attendList.push({
          start_time: response.data[i].start_time,
          end_time: response.data[i].end_time,
          number: response.data[i].number + "/" + response.data[i].total,
        });
      }
    });
  },
};
</script>

<style scoped>
.attendanceTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.attendTable {
  width: 90%;
  margin-left: 80px;
}

.attendStuTable{
  margin-left: 20px;
  width: 400px;
}
</style>
