<template>
  <div class="login_container">
    <div class="background">
      <img src="../assets/tj1.jpg" width="100%" height="100%" alt="" />
    </div>
    <div class="login_box">
      <div class="Title">
        <h3>实验教学管理系统</h3>
      </div>
      <!-- 登录表单 -->
      <div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginFormRules"
          label-width="60px"
          class="login_form"
        >
          <el-form-item label="账号" prop="id" class="white_Item">
            <el-input
              v-model="loginForm.id"
              placeholder="请输入学号/工号"
              prefix-icon="iconfont icon-user"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" class="white_Item">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
              prefix-icon="iconfont icon-3702mima"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="buttons">
            <el-button type="primary" @click="login" class="button1"
              >登录</el-button
            >
            <el-button type="info" @click="resetLoginForm">重置</el-button>
            <el-button type="register" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      res: null,
      loginForm: {
        id: "111111",
        password: "111111",
      },
      // 表单验证
      loginFormRules: {
        id: [
          { required: true, message: "请输入学号/工号", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 表单重置按钮
    resetLoginForm() {
      // console.log(this)
      // resetFields：element-ui提供的表单方法
      this.$refs.loginFormRef.resetFields();
    },
    register() {
      this.$router.push("/register");
    },
    async login() {
      // 表单预验证
      // valid：bool类型
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return false;
        else this.getloginInfo();
      });
    },
    getloginInfo() {
      let data = new FormData();
      data.append("account_ID", this.loginForm.id);
      data.append("password", this.loginForm.password);
      console.log("传入的" + data);
      this.$axios({
        url: "/account/login",
        method: "post",
        data: data,
      })
        .then((response) => {
          console.log("传出的" + response.data);
          console.log(response.data);
          // 若验证失败则后端返回空对象{}，判断是否为空对象↓
          if (Object.keys(response.data).length !== 0)
            this.$message({
              type: "success",
              message: "登录成功",
            });
          else
            this.$message({
              type: "error",
              message: "用户名或密码错误",
            });
          window.sessionStorage.setItem("account_ID", response.data[0]);
          window.sessionStorage.setItem("token", response.data[1]);
          if (window.sessionStorage.getItem("account_ID").length == 5)
            this.$router.push("/teacherhome");
          else if (window.sessionStorage.getItem("account_ID").length == 7)
            this.$router.push("/studenthome");
          else if (window.sessionStorage.getItem("account_ID").length == 6)
            this.$router.push("/adminhome");
        })
        .catch((error)=>{
          console.log(error)
          this.$message({
            type: "error",
            message: "网络错误",
          });
        });
    },
  },
};
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
}

.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}

.login_box {
  width: 450px;
  height: 360px;
  opacity: 0.9;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  border: 1px solid #d8d2d2;
  box-shadow: 5px 5px 5px #000000;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  background-color: #414749;
}

.Title {
  height: 130px;
  text-align: center;
  line-height: 65px;
  font-size: 30px;
  font-family: SimSun;
  color: white;
}

.login_form {
  position: absolute;
  bottom: 60px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: right;
}
.white_Item .el-form-item__label {
  color: white;
}
</style>
