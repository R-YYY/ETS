<template>
  <div>
    <div class="headStu">
      <div
        class="headDiv"
        style="color: white; font-size: 30px; font-family: 宋体"
      >
        <div class="headLeft">
          <!-- 头像部分 -->
          <div>
            <el-menu
              class="port_box"
              mode="horizontal"
              @select="handleSelect"
              :router="true"
            >
              <el-submenu index="1">
                <template slot="title" class="subtitle">
                  <img src="@/assets/port.png" />
                </template>
                <el-menu-item index="/teainfoset">
                  <el-button icon="el-icon-s-tools" type="text"> 账号设置 </el-button>
                </el-menu-item>
                <el-menu-item>
                  <el-button
                    type="text"
                    icon="el-icon-switch-button"
                    @click="logout()"
                  >
                    安全退出
                  </el-button>
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          <!-- 信息 -->
          <div>Hi!{{ name }}老师</div>
        </div>
        <div class="headRight">
          <div class="headbox1">
            <div style="font-size: 60px">
              {{ courseData.length }}
            </div>
            <div style="font-size: 20px">实验课程/门</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mainStu">
      <div class="mainDiv">
        <el-card class="mainLeft">
          <div class="ing">
            <div class="title">
              <h2>进行中的课程</h2>
              <template>
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  circle
                  style="margin-right: 50px"
                  title="新建课程"
                  @click="dialogFormVisible = true"
                ></el-button>
                <el-dialog title="新建课程" :visible.sync="dialogFormVisible">
                  <el-form
                    :model="courseInfo"
                    ref="courseInfo"
                    :rules="courseInfoRules"
                  >
                    <el-form-item
                      prop="courseName"
                      label="课程名"
                      :label-width="formLabelWidth"
                    >
                      <el-input
                        v-model="courseInfo.courseName"
                        prefix-icon="el-icon-notebook-2"
                        autocomplete="off"
                        placeholder="请输入课程名"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer">
                    <el-button @click="dialogFormVisible = false"
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="addCourse('courseInfo')"
                      >保 存</el-button
                    >
                  </div>
                </el-dialog>
              </template>
            </div>
            <div class="content">
              <cardList ref="listItem" :dataList="courseData"> </cardList>
            </div>
          </div>
          <div class="finish">
            <h2>已完成的课程</h2>
            <div class="content">
              <cardList ref="listItem" :dataList="endCourseData"> </cardList>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import cardList from "@/components/teaCardList.vue";
export default {
  components: {
    cardList,
  },
  data() {
    return {
      account_ID: window.sessionStorage.getItem("account_ID"),
      name: "",
      count: "0",
      currentPage: 1,
      pagesize: 4,
      store: {
        id: "",
      },
      courseData: [],
      endCourseData: [],
      dialogFormVisible: false,
      courseInfo: {
        courseName: "",
      },
      courseInfoRules: {
        //验证课程名称是否合法
        courseName: [
          { required: true, message: "请输入课程名", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    getName() {
      this.store.id = window.sessionStorage.getItem("account_ID");
      console.log("id:" + this.store.id);
      console.log("token:" + window.sessionStorage.getItem("token"));
      let _this = this;
      this.$axios({
        url: "/teacher/get",
        method: "get",
        params: {
          teacher_ID: this.store.id,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then(function (res) {
          console.log(res.data);
          _this.name = res.data.name;
        })
        .catch(function (error) {
          console.log("Get Nothing!" + error);
        });
    },
    getCourse() {
      this.store.id = window.sessionStorage.getItem("account_ID");
      let _this = this;
      console.log("token:" + window.sessionStorage.getItem("token"));
      this.$axios({
        url: "/course/getTotalCourse",
        method: "get",
        params: {
          account_ID: this.store.id,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then(function (res) {
          console.log("getCourse.res.data:");
          console.log(res.data);
          _this.courseData = res.data;
        })
        .catch(function (error) {
          console.log("Get Nothing!" + error);
        });
    },
    getEndCourse() {
      this.store.id = window.sessionStorage.getItem("account_ID");
      let _this = this;
      this.$axios({
        url: "/course/getTotalEndCourse",
        method: "get",
        params: {
          account_ID: this.store.id,
        },
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then(function (res) {
          console.log("getEndCourse.res.data:");
          console.log(res.data);
          _this.endCourseData = res.data;
        })
        .catch(function (error) {
          console.log("Get Nothing!" + error);
        });
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
      location.reload();
    },
    addCourse(courseInfo) {
      console.log("courseInfo.courseName:" + this.courseInfo.courseName);
      this.$refs[courseInfo].validate((valid, wrongstring) => {
        if (valid) {
          let info = new FormData();
          info.append(
            "teacher_ID",
            window.sessionStorage.getItem("account_ID")
          );
          info.append("name", this.courseInfo.courseName);
          this.$axios({
            url: "/course/add",
            method: "post",
            data: info,
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
          })
            .then((res) => {
              console.log("addcourse.res.data:");
              console.log(res.data);
              if (res.data !== -1)
                this.$message({
                  type: "success",
                  message: "新建成功",
                });
              else
                this.$message({
                  type: "error",
                  message: "新建失败！请重试",
                });
            })
            .catch((err) => {
              this.$notify({
                title: "提示",
                message: "用户访问错误",
                type: "error",
                duration: 0,
              });
              console.log(err);
            });
          this.dialogFormVisible = false;
          this.$router.push({
            path: "/teacherhomeempty",
          });
        } else {
          console.log(valid, wrongstring);
          console.log("error submit!!");
          this.$message({
            showClose: true,
            message: `请输入正确的信息！`,
            type: "warning",
            duration: 3000,
          });
          return false;
        }
      });
    },
  },
  created() {
    this.getName();
    this.getCourse();
    this.getEndCourse();
  },
  mounted() {},
};
</script>

<style scoped>
/* 新建课程 */
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.headStu {
  height: 260px;
  background-color: #369575;
  display: flex;
  justify-content: center;
  align-items: center;
}
.headDiv {
  width: 80%;
  display: flex;
  justify-content: space-between;
}
.headLeft {
  display: flex;
  align-items: center;
}
.port_box {
  height: 100px;
  width: 150px;
  position: relative;
  background-color: transparent;
}
.port_box.el-menu--horizontal.el-menu {
  /* 去下划线 */
  border-bottom: none;
}
.el-menu--horizontal > .el-submenu /deep/ .el-submenu__title {
  /* 去子菜单标题颜色 */
  height: 100px;
  display: flex;
  align-items: center;
  background-color: transparent !important;
}
.port_box img {
  height: 90px;
  width: 90px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: relative;
}
.headRight {
  display: flex;
  align-items: center;
}
.headbox1 {
  text-align: center;
}

.mainStu {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 200px;
  /* height: 600px; */
  width: 100%;
  /* z-index: 2; */
}
.mainDiv {
  width: 80%;
  display: flex;
  justify-content: center;
}
/* 卡片滚动条
.el-card{
  overflow-y:auto
} */
.mainLeft {
  min-height: 100%;
  height: 100%;
}
.mainLeft >>> .el-card__body {
  height: 100%;
}
.content {
  width: 1000px;
}
.block {
  margin: 80px;
}
</style>
