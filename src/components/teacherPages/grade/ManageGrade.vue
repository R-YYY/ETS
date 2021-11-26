<template>
  <div>
    <div>
      <el-input class="inputProject" placeholder="请输入学生姓名"></el-input>
      <el-button>搜索</el-button>
      <el-button>导出成绩</el-button>
    </div>
    <div>
      <el-tabs
        class="gradeTab"
        active-name="total"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="总成绩" name="total">
          <div style="height: 480px">
            <el-table
              :data="totalGradeList"
              class="totalGradeTable"
              height="470px"
            >
              <el-table-column
                type="student_ID"
                label="学号"
                width="180px"
              ></el-table-column>
              <el-table-column
                type="name"
                label="姓名"
                width="180px"
              ></el-table-column>
              <el-table-column
                prop="projectGrade"
                label="实验成绩"
                width="190px"
              ></el-table-column>
              <el-table-column
                prop="attendanceGrade"
                label="考勤成绩"
                width="190px"
              ></el-table-column>
              <el-table-column
                prop="totalGrade"
                label="总成绩"
                width="190px"
              ></el-table-column>
              <el-table-column width="140px">
                <el-button>查看详情</el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="单项成绩" name="part"></el-tab-pane>
        <el-tab-pane label="设置成绩权重" name="set"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageGrade",
  data() {
    return {
      totalGradeList: [],
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.index == 0) this.$router.push({ name: "totalGrades" });
      else if (tab.index == 1) this.$router.push({ name: "partGrades" });
      else if (tab.index == 2) this.$router.push({ name: "setGrades" });
    },
  },
};
</script>

<style scoped>
.gradeTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.inputProject {
  width: 300px;
  margin-left: 40px;
}

.totalGradeTable {
  width: 90%;
  margin-left: 70px;
}
</style>
