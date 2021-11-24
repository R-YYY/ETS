<template>
  <div>
    <div>
      <el-button class="addStudentBtn" @click="writeInfo">
        <span>添加学生</span>
      </el-button>
      <el-button>
        <span>导出名单</span>
      </el-button>
    </div>
    <div>
      <el-tabs class="studentTab" type="border-card">
        <el-tab-pane label="课程学生">
          <div style="height: 480px">
            <el-table class="memberTable" :data="studentList" height="470px">
              <el-table-column prop="student_ID" label="学号" width="250px">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="250px">
              </el-table-column>
              <el-table-column prop="email" label="邮箱" width="420px">
              </el-table-column>
              <el-table-column width="120px">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  plain
                  @click="open"
                >
                </el-button>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageStudent",
  data() {
    return {
      studentList: [],
      dialogVisible: false,
      addStudentID: "",
    };
  },
  methods: {
    open() {
      this.$confirm("此操作将从课程中删除该学生, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    writeInfo() {
      this.$prompt("请输入添加学生的学号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d\d\d\d\d\d\d$/,
        inputErrorMessage: "学号格式不正确",
      })
        .then(({ value }) => {
          this.add(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加",
          });
        });
    },
    add(data) {
      this.$axios
        .post("/course/addTakeCourse", {
          student_ID: data,
          course_ID: this.$route.params.course_id,
          authority: 0,
        })
        .then((response) => {
          if (response.data === 1) {
            this.$message({
              type: "success",
              message: "添加成功！",
            });
          } else if (response.data === -1) {
            this.$message({
              type: "error",
              message: "添加失败！输入学生不存在！",
            });
          } else if (response.data === -5) {
            this.$message({
              type: "error",
              message: "添加失败！该学生已经在课程中！",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            type: "error",
            message: "添加失败！请重试!",
          });
        });
    },
  },
  mounted() {
    this.$axios
      .get("/course/getListStudentInfoByCourseId", {
        params: {
          course_ID: this.$route.params.course_id,
          authority: 0,
        },
      })
      .then((response) => {
        this.studentList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.studentTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.addStudentBtn {
  position: relative;
  margin-left: 40px;
  margin-right: 20px;
}

.memberTable {
  width: 88%;
  margin-left: 100px;
}
</style>
