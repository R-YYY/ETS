<template>
  <div class="container">
    <el-card class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="添加老师" name="first">
          <el-form :model="userInfo1" ref="userInfo1" :rules="userInfo1Rules">
            <el-form-item prop="id" label="工号">
              <el-input v-model="userInfo1.id" type="text"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="姓名">
              <el-input v-model="userInfo1.name" type="text"></el-input>
            </el-form-item>
            <el-form-item prop="ID_number" label="身份证号码">
              <el-input v-model="userInfo1.ID_number" type="text"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="reset('userInfo1')">重置</el-button>
              <el-button type="primary" @click="addTeacher('userInfo1')"
                >创建</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="添加学生" name="second">
                      <el-form :model="userInfo2" ref="userInfo2" :rules="userInfo2Rules">
            <el-form-item prop="id" label="学号">
              <el-input v-model="userInfo2.id" type="text"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="姓名">
              <el-input v-model="userInfo2.name" type="text"></el-input>
            </el-form-item>
            <el-form-item prop="ID_number" label="身份证号码">
              <el-input v-model="userInfo2.ID_number" type="text"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="reset('userInfo2')">重置</el-button>
              <el-button type="primary" @click="addStudent('userInfo2')"
                >创建</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      userInfo1: {
        id: "",
        name: "",
        ID_number: "",
      },
      userInfo2: {
        id: "",
        name: "",
        ID_number: "",
      },
      userInfo1Rules: {
        //   账号格式：5位数字
        id: [
          {
            required: true,
            message: "请输入老师工号",
            trigger: "blur",
          },
          {
            min: 5,
            max: 5,
            message: "长度为5个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //   数字
              if (/^[0-9]*$/.test(value) == false) {
                callback(new Error("请输入数字"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
              if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //验证身份证号是否合法
        ID_number: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            min: 15,
            max: 18,
            message: "长度 15 或者 18 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验身份证的正则：(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)
              if (
                /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) == false
              ) {
                callback(new Error("请输入正确的身份证号"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      userInfo2Rules: {
        //   账号格式：7位数字
        id: [
          {
            required: true,
            message: "请输入学生学号",
            trigger: "blur",
          },
          {
            min: 7,
            max: 7,
            message: "长度为7个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //   数字
              if (/^[0-9]*$/.test(value) == false) {
                callback(new Error("请输入数字"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 5,
            message: "长度在 2 到 5 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验中文的正则：/^[\u4e00-\u9fa5]{0,}$/
              if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
                callback(new Error("请输入中文"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //验证身份证号是否合法
        ID_number: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          {
            min: 15,
            max: 18,
            message: "长度 15 或者 18 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验身份证的正则：(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)
              if (
                /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) == false
              ) {
                callback(new Error("请输入正确的身份证号"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 重置表单
    reset(userInfo) {
      this.$refs[userInfo].resetFields();
    },
    // 创建老师账号
    addTeacher(userInfo1) {
      this.$refs[userInfo1].validate((valid, wrongstring) => {
        if (valid) {
          let Info = new FormData();
          Info.append("teacher_ID", this.userInfo1.id);
          Info.append("name", this.userInfo1.name);
          Info.append("ID_number", this.userInfo1.ID_number);
          this.$axios({
            url: "/teacher/add",
            method: "post",
            data: Info,
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
          })
            .then((res) => {
              console.log("addTeacher.res.data:" + res.data);
              if (res.data !== -1) {
                this.$message({
                  type: "success",
                  message: "添加成功！",
                });
                this.reset(userInfo1);
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败！请重试",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              this.$message({
                type: "error",
                message: "访问错误！",
              });
            });

          this.dialogFormVisible = false;
        } else {
          console.log(valid, wrongstring);
          console.log("error submit!!");
          this.$message({
            showClose: true,
            message: `请输入正确的信息！`,
            type: "warning",
            duration: 3000,
          });
          // this.dialogFormVisible = false;
          return false;
        }
      });
    },
    // 创建学生账号
    addStudent(userInfo2) {
      this.$refs[userInfo2].validate((valid, wrongstring) => {
        if (valid) {
          let Info = new FormData();
          Info.append("student_ID", this.userInfo2.id);
          Info.append("name", this.userInfo2.name);
          Info.append("ID_number", this.userInfo2.ID_number);
          this.$axios({
            url: "/student/add",
            method: "post",
            data: Info,
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
          })
            .then((res) => {
              console.log("addStudent.res.data:" + res.data);
              if (res.data !== -1) {
                this.$message({
                  type: "success",
                  message: "添加成功！",
                });
                this.reset(userInfo2);
              } else {
                this.$message({
                  type: "error",
                  message: "添加失败！请重试",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              this.$message({
                type: "error",
                message: "访问错误！",
              });
            });

          this.dialogFormVisible = false;
        } else {
          console.log(valid, wrongstring);
          console.log("error submit!!");
          this.$message({
            showClose: true,
            message: `请输入正确的信息！`,
            type: "warning",
            duration: 3000,
          });
          // this.dialogFormVisible = false;
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.container {
  margin-top: 50px;
  position: relative;
  display: flex;
  justify-content: center;
}

.main {
  width: 70%;
}
</style>

