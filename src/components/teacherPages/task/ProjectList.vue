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
                <div style="margin-top: 30px; margin-left: 70px">
                  <el-card class="projectCard">
                    <div slot="header">
                      <span>项目名称：{{ item.name }}</span>
                    </div>
                    <div>
                      <p>发布时间：{{ item.release_time }}</p>
                      <p>截至时间：{{ item.deadline }}</p>
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
        </el-tab-pane>
        <el-tab-pane label="课程考勤" name="attendancd"> </el-tab-pane>
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
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index == 0)
        this.$router.push({
          name: "tasks",
          params: {
            course_id: 42024401,
          },
        });
      else if (tab.index == 1)
        this.$router.push({
          name: "projects",
          params: {
            course_id: 42024401,
          },
        });
      else if (tab.index == 2)
        this.$router.push({
          name: "attendances",
          params: {
            course_id: 42024401,
          },
        });
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
    checkProject() {},
    deleteProject() {},
  },
  mounted() {
    const match = (dataList) => {
      this.projectList = [];
      for (let i = 0; i < dataList.length; i++) {
        this.projectList.push({
          name: dataList[i].name,
          release_time: dataList[i].release_time,
          deadline: dataList[i].deadline,
          teacher_ID: dataList[i].teacher_ID,
        });
      }
    };
    this.$axios
      .get("/course/getProjectListByCourseId", {
        params: {
          course_ID: this.$route.params.course_id,
        },
      })
      .then((response) => {
        match(response.data);
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
</style>
