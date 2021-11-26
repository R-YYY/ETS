<template>
  <div>
    <div>
      <el-input
        class="searchProject"
        v-model="input"
        placeholder="请输入项目名称"
        @input="search"
      >
      </el-input>
      <el-button type="primary" @click="search">
        <span>搜索</span>
      </el-button>
    </div>
    <div>
      <el-tabs
        class="projectTab"
        type="border-card"
        @tab-click="handleClick"
        value="project"
      >
        <el-tab-pane label="发布任务" name="task"> </el-tab-pane>
        <el-tab-pane label="实验项目" name="project">
          <div class="projectArea">
            <el-row>
              <el-col
                :span="7.5"
                v-for="item in tmpList"
                :key="item.project_ID"
                :offest="1"
              >
                <div class="eachProject">
                  <el-card class="projectCard">
                    <div slot="header">
                      <span>项目名称：{{ item.name }}</span>
                    </div>
                    <div>
                      <p>发布时间：{{ item.start_time }}</p>
                      <p>截至时间：{{ item.end_time }}</p>
                      <p>发布人：{{ item.teacher_ID }}</p>
                      <br />
                    </div>
                    <div>
                      <el-button class="btn" @click="checkProject">
                        <span>查看</span>
                      </el-button>
                      <el-button
                        class="btn"
                        type="danger"
                        plain
                        @click="deleteProject"
                      >
                        <span>删除</span>
                      </el-button>
                    </div>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>

          <el-dialog :visible.sync="checkDialogVisible">
            <el-table>
              <el-table-column label="学号"></el-table-column>
              <el-table-column label="姓名"></el-table-column>
              <el-table-column label="提交时间"></el-table-column>
              <el-table-column
                label="批改时间"
                :filters="[
                  { text: '已批改', value: '已批改' },
                  { text: '未批改', value: '未批改' },
                ]"
                :filter-method="filterState"
              ></el-table-column>
            </el-table>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="课程考勤" name="attendance"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  data() {
    return {
      input: "",
      projectList: null,
      tmpList: null,
      checkDialogVisible: false,
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index == 0) this.$router.push({ name: "tasks" });
      else if (tab.index == 1) this.$router.push({ name: "projects" });
      else if (tab.index == 2) this.$router.push({ name: "attendances" });
    },
    search() {
      if (this.input === "") this.tmpList = this.projectList;
      else {
        this.tmpList = [];
        for (let t in this.projectList) {
          if (this.projectList[t].name.indexOf(this.input) !== -1) {
            this.tmpList.push(this.projectList[t]);
          }
        }
      }
    },
    checkProject() {
      this.checkDialogVisible = true;
    },
    deleteProject() {},
    filterState(value, row) {
      return row.state === value;
    },
  },
  mounted() {
    this.$axios
      .get("/course/getProjectListByCourseId", {
        params: {
          course_ID: this.$route.params.course_id,
        },
      })
      .then((response) => {
        this.projectList = response.data;
        this.tmpList = this.projectList;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.projectTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.searchProject {
  width: 300px;
  margin-left: 40px;
}

.projectCard {
  height: 300px;
  width: 300px;
}

.btn {
  margin-left: 30px;
  margin-right: 35px;
}

.projectArea {
  height: 480px;
  overflow: auto;
}

.eachProject {
  margin-top: 30px;
  margin-left: 70px;
}
</style>
