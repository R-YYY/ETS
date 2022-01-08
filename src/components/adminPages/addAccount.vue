<template>
  <div class="container">
    <div class="main">
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
              <el-button type="primary" @click="addTeachers('userInfo1')"
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
    </div>
    <div>
      <template>
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="dialogFormVisible = true"
          style="margin-top: 20px"
        >
          批量创建
        </el-button>
        <el-dialog title="批量创建账户" :visible.sync="dialogFormVisible">
          <el-form
            ref="form"
            :model="form"
            :rules="formRules"
            label-width="80px"
          >
            <el-form-item label="身份" prop="role">
              <el-radio-group v-model="form.role">
                <el-radio label="Teacher"></el-radio>
                <el-radio label="Student"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="文件" required>
              <!-- 
                :on-change="changeFile"
               -->
              <el-upload
                class="upload-demo"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                action=""
                :file-list="fileList"
                :http-request="uploadFile"
                :before-upload="BeforeUpload"
                :limit="1"
                :on-exceed="handleExceed"
                drag
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或<em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="tip">
                  支持的文件格式有：xlsx
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')"
                >导入</el-button
              >
              <el-button type="primary" @click="dialogFormVisible = false"
                >取消</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      dialogFormVisible: false,
      newFile: new FormData(),
      fileList: [],
      form: {
        role: "",
      },
      formRules: {
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        // file: [{ required: true, message: "请上传文件", trigger: "blur" }],
      },
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
    onSubmit(form) {
      // let Info = new FormData();
      // Info.append("file", this.newFile);
      // Info.append("role", this.form.role);
      this.$refs[form].validate((valid, wrongstring) => {
        if (valid) {
          console.log("this.form.role:" + this.form.role);
          if (this.form.role == "Teacher") {
            this.$axios({
              //   接口路径
              url: "/teacher/addList",
              method: "post",
              data: this.newFile,
              headers: {
                "Content-Type": "multipart/form-data",
                token: window.sessionStorage.getItem("token"),
              },
            })
              .then((res) => {
                console.log("res:", res);
                (this.dialogFormVisible = false),
                  this.$message({
                    type: "success",
                    message: "提交成功!",
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (this.form.role == "Student") {
            this.$axios({
              //   接口路径
              url: "/student/addList",
              method: "post",
              data: this.newFile,
              headers: {
                "Content-Type": "multipart/form-data",
                token: window.sessionStorage.getItem("token"),
              },
            })
              .then((res) => {
                console.log("res:", res);
                (this.dialogFormVisible = false),
                  this.$message({
                    type: "success",
                    message: "提交成功!",
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            this.$message({
              type: "error",
              message: "请选择添加的角色身份！",
            });
          }
        } else {
          console.log(valid, wrongstring);
          console.log("error submit!!");
          this.$message({
            type: "error",
            message: "请填写完整表单！",
          });
          return false;
        }
      });
    },
    // 上传文件发生改变，文件的验证
    // changeFile(file,fileList){
    //   this.fileList=fileList;
    //   if(fileList.length&&fileList.length>=1){
    //     this.$refs.form.validateField("file",()=>{
    //       this.rules.file=[];
    //       this.$refs["form"].clearValidate();
    //     })
    //   }
    // },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `文件数量限制: 1; 您本次选择了${files.length}个文件，共选择了${
          files.length + fileList.length
        }个文件`
      );
    },

    BeforeUpload(file) {
      // 获取上传文件的后缀名，以.作为分界线
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["xlsx"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message("上传文件只能是xlsx格式", "error");
        return false;
      }
      // if (file) {
      //   this.newFile.append('file', file) //  2. 上传之前，拿到file对象，并将它添加到刚刚定义的FormData对象中
      //   console.log(this.newFile.get('file'))
      // } else {
      //   return false
      // }
    },

    uploadFile(file) {
      this.newFile.append("file", file.file);
    },
  },
};
</script>
<style scoped>
.container {
  margin-top: 50px;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  box-shadow: 5px 5px 5px 5px #f7f7f7;
  border: #f7f7f7;
}

.main {
  width: 70%;
}
</style>

