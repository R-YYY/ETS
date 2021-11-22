<template>
  <div>
    <div>
      <el-button class="btn" @click="writerInfo">
        <span>添加助教</span>
      </el-button>
    </div>
    <div>
      <el-tabs
        class="taTab"
        v-model="activeIndex"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="课程设置"> </el-tab-pane>
        <el-tab-pane label="教师团队"> </el-tab-pane>
        <el-tab-pane label="助教团队">
          <div>
            <el-table class="memberTab" :data="taList" height="480px">
              <el-table-column prop="student_ID" label="学号" width="270px">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="270px">
              </el-table-column>
              <el-table-column prop="email" label="邮箱" width="400px">
              </el-table-column>
              <el-table-column width="100px">
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
  name: "TAList",
  data() {
    return {
      activeIndex: "2",
      taList: [],
      dialogVisible: false,
      addTaID: "",
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index == 0)
        this.$router.push({
          name: "info",
          params: {
            course_id: 42024401,
          },
        });
      else if (tab.index == 1)
        this.$router.push({
          name: "teachers",
          params: {
            course_id: 42024401,
          },
        });
      else if (tab.index == 2)
        this.$router.push({
          name: "tas",
          params: {
            course_id: 42024401,
          },
        });
    },
    open() {
      this.$confirm("此操作将从课程中删除该助教, 是否继续?", "提示", {
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
    writerInfo() {
      this.$prompt("请输入添加助教的学号", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\d\d\d\d\d\d\d$/,
        inputErrorMessage: "学号格式不正确",
      })
        .then(({ value }) => {
          this.add(value)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加",
          });
        });
    },
    add(data){
      this.$axios.post(
          '/course/addTakeCourse',{
            student_ID:data,
            course_ID:this.$route.params.course_id,
            authority:1
          }).then((response)=>{
        if(response.data === 1){
          this.$message({
            type: "success",
            message: "添加成功！",
          })
        }
        else if(response.data === -2){
          this.$message({
            type: "error",
            message: "添加失败！输入助教不存在！",
          });
        }
        else if(response.data === -4){
          this.$message({
            type: "error",
            message: "添加失败！该助教已经在课程中！",
          });
        }
      }).catch(()=>{
        this.$message({
          type: "error",
          message: "添加失败！请重试!",
        });
      })
    }
  },
  mounted() {
    this.$axios
        .get("/course/getListStudentInfoByCourseId", {
          params: {
            course_ID: this.$route.params.course_id,
            authority: 1
          },
        })
        .then((response) => {
          this.taList=response.data
        }).catch((error)=>{
      console.log(error)
    })
  },
};
</script>

<style scoped>
.taTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.btn {
  margin-left: 40px;
  margin-right: 20px;
}

.memberTab {
  width: 1060px;
  margin-left: 70px;
  margin-top: 0;
}
</style>
