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
          <div style="height: 480px">
              <el-table class="attendTable" :data="attendList" height="480px">
                <el-table-column prop="id" label="考勤编号" width="350px">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="考勤时间"
                  width="550px"
                  sortable
                >
                </el-table-column>
                <el-table-column width="150px">
                  <el-button @click="drawer = true" plain>查看</el-button>
                </el-table-column>
              </el-table>
            <div>
              <el-drawer
                title="考勤详情"
                :visible.sync="drawer"
                :direction="direction"
              >
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
    const item = {
      id: "1111111",
      time: "0000-00-00 00:00:00",
    };
    return {
      drawer: false,
      direction: "ltr",
      attendList: Array(15).fill(item),
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index == 0)
        this.$router.push({name: "tasks",});
      else if (tab.index == 1)
        this.$router.push({name: "projects",});
      else if (tab.index == 2)
        this.$router.push({name: "attendances",});
    },
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
</style>
