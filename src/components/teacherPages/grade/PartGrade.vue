<template>
  <div>
    <div>
      <el-input class="inputProject" placeholder="请输入项目名称"></el-input>
      <el-button>搜索</el-button>
    </div>
    <div>
      <el-tabs
        class="gradeTab"
        active-name="part"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="总成绩" name="total"></el-tab-pane>
        <el-tab-pane label="单项成绩" name="part" style="overflow: auto">
          <div class="gradeShow">
            <el-collapse>
              <el-card class="gradeCard">
                <el-collapse-item>
                  <template slot="title">
                    <span style="font-size: 17px">实验项目</span>
                  </template>
                  <el-table :data="projectGradeList">
                    <el-table-column
                      label="实验名称"
                      prop="name"
                      width="400px"
                    ></el-table-column>
                    <el-table-column
                      label="平均分"
                      prop="average"
                      width="150px"
                    ></el-table-column>
                    <el-table-column
                      label="最低分"
                      prop="low"
                      width="150px"
                    ></el-table-column>
                    <el-table-column
                      label="最高分"
                      prop="high"
                      width="150px"
                    ></el-table-column>
                    <el-table-column width="180px">
                      <el-button>查看详情</el-button>
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
              </el-card>
              <el-card class="gradeCard">
                <el-collapse-item>
                  <template slot="title">
                    <span style="font-size: 17px">考勤</span>
                  </template>
                  <el-table :data="attendanceGradeList">
                    <el-table-column
                      type="index"
                      label="序号"
                      width="150px"
                    ></el-table-column>
                    <el-table-column
                      prop="startTime"
                      label="开始时间"
                      width="250px"
                    ></el-table-column>
                    <el-table-column
                      prop="endTime"
                      label="结束时间"
                      width="250px"
                    ></el-table-column>
                    <el-table-column
                      prop="number"
                      label="考勤人数"
                      width="200px"
                    ></el-table-column>
                    <el-table-column width="150px">
                      <el-button>查看详情</el-button>
                    </el-table-column>
                  </el-table>
                </el-collapse-item>
              </el-card>
            </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设置成绩权重" name="set"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "PartGrade",
  data() {
    return {
      projectGradeList: [
        {
          name: "实验一",
          low: 0,
          high: 100,
          average: 50,
        },
        {
          name: "实验一",
          low: 0,
          high: 100,
          average: 50,
        },
        {
          name: "实验一",
          low: 0,
          high: 100,
          average: 50,
        },
      ],
      attendanceGradeList: [
        {
          startTime: "2020-11-11 11:11:11",
          endTime: "2020-11-17 11:11:11",
          number: "11/12",
        },
        {
          startTime: "2020-11-11 11:11:11",
          endTime: "2020-11-17 11:11:11",
          number: "11/12",
        },
        {
          startTime: "2020-11-11 11:11:11",
          endTime: "2020-11-17 11:11:11",
          number: "11/12",
        },
      ],
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.index == 0)
        this.$router.push({
          name: "totalGrades",
          params: {
            course_id: 42024401,
          },
        });
      else if (tab.index == 1)
        this.$router.push({
          name: "partGrades",
          params: {
            course_id: 42024401,
          },
        });
      else if (tab.index == 2)
        this.$router.push({
          name: "setGrades",
          params: {
            course_id: 42024401,
          },
        });
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

.gradeShow {
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 30px;
  height: 450px;
}

.gradeCard {
  margin-bottom: 20px;
}
</style>
