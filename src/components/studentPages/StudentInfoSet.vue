<template>
  <div>
    <div class="nav">
      <div class="left" @click="toHome()">
        <img
          src="@/assets/course2.png"
          alt=""
          style="height: 80px; width: 80px; margin-right: 20px"
        />
        <h2>实验教学管理系统</h2>
      </div>
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
            <el-menu-item index="/studenthome">
              <el-button icon="el-icon-back" type="text"> 返回主页 </el-button>
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
    </div>

    <div class="container">
      <el-card class="main">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <el-descriptions title="用户信息">
              <!-- 编辑个人信息的按钮 -->
              <template slot="extra">
                <el-button
                  type="primary"
                  size="small"
                  @click="dialogFormVisible = true"
                >
                  编辑</el-button
                >
                <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
                  <el-form
                    :model="userInfo"
                    ref="userInfo"
                    :rules="userInfoRules"
                  >
                    <el-form-item label="学号" :label-width="formLabelWidth">
                      <el-input
                        v-model="userInfo.account_ID"
                        prefix-icon="el-icon-user"
                        autocomplete="off"
                        disabled
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                      <el-input
                        v-model="userInfo.name"
                        prefix-icon="el-icon-user"
                        autocomplete="off"
                        disabled
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="身份证号"
                      :label-width="formLabelWidth"
                    >
                      <el-input
                        v-model="userInfo.id_number"
                        prefix-icon="el-icon-postcard"
                        autocomplete="off"
                        disabled
                      ></el-input>
                    </el-form-item>

                    <el-form-item
                      prop="email"
                      label="邮箱"
                      :label-width="formLabelWidth"
                    >
                      <el-input
                        v-model="userInfo.email"
                        prefix-icon="el-icon-message"
                        autocomplete="off"
                        placeholder="请输入邮箱"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="updateInfo('userInfo')"
                      >保 存</el-button
                    >
                  </div>
                </el-dialog>
              </template>
              <!-- 个人信息显示 -->
              <el-descriptions-item label="学号">{{
                userInfo.account_ID
              }}</el-descriptions-item>
              <el-descriptions-item label="姓名">{{
                userInfo.name
              }}</el-descriptions-item>
              <el-descriptions-item label="身份证号码">
                {{ userInfo.id_number }}</el-descriptions-item
              >
            </el-descriptions>
            <hr />
            <!-- 联系方式显示 -->
            <el-descriptions class="margin-top" title="联系方式" :column="3">
              <el-descriptions-item label="邮箱">{{
                userInfo.email
              }}</el-descriptions-item>
              >
            </el-descriptions>
          </el-tab-pane>
          <el-tab-pane label="账号管理" name="second">
            <el-descriptions title="修改密码">
              <template slot="extra">
                <el-button
                  type="primary"
                  size="small"
                  @click="dialogForm2Visible = true"
                >
                  修改</el-button
                >
                <el-dialog title="修改密码" :visible.sync="dialogForm2Visible">
                  <el-form
                    :model="userInfo"
                    ref="userInfo"
                    :rules="userInfoRules"
                  >
                    <el-form-item
                      prop="password"
                      label="新密码"
                      :label-width="formLabelWidth"
                    >
                      <el-input
                        v-model="userInfo.password"
                        prefix-icon="el-icon-notebook-2"
                        autocomplete="off"
                        placeholder="请输入新密码"
                        type="password"
                        show-password
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      prop="rePassword"
                      label="确认新密码"
                      :label-width="formLabelWidth"
                    >
                      <el-input
                        v-model="userInfo.rePassword"
                        prefix-icon="el-icon-notebook-2"
                        autocomplete="off"
                        placeholder="请再次输入新密码"
                        type="password"
                        show-password
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogForm2Visible = false"
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="updatePsd('userInfo')"
                      >保 存</el-button
                    >
                  </div>
                </el-dialog>
              </template>
              <el-descriptions-item label="温馨提示"
                >设置复杂密码更能保护您的账号安全</el-descriptions-item
              >
            </el-descriptions>
            <div style="height: 50px"></div>
            <el-button type="primary" size="small" @click="logout"
              >退出当前帐号</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (value !== this.userInfo.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      userInfo: {
        account_ID: "",
        name: "",
        id_number: "",
        email: "",
        password: "",
        rePassword: "",
      },
      dialogFormVisible: false,
      dialogForm2Visible: false,
      formLabelWidth: "120px",
      userInfoRules: {
        //验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
          {
            validator: function (rule, value, callback) {
              //校验密码的正则: ^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$
              if (
                /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(value) ==
                false
              ) {
                callback(
                  new Error("请输入包含字母和数字的组合，不能使用特殊字符")
                );
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        //确认密码是否正确
        rePassword: [
          { required: true, message: "请再次确认密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
          { validator: validatePass1, trigger: "blur" },
        ],
      },
    };
  },
  created(){
    this.getUserInfo();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
      location.reload();
    },
    toHome() {
      this.$router.push("/studenthome");
    },
    getUserInfo() {
      let info = new FormData();
      info.append("account_ID", window.sessionStorage.getItem("account_ID"));
      let _this = this;
      this.$axios({
        url: "/account/getPrivacy",
        method: "post",
        data: info,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then((res) => {
          console.log("getUserInfo传出的：" + res.data);
          _this.userInfo=res.data;
          // _this.userInfo.account_ID = res.data.account_ID;
          // _this.userInfo.name = res.data.name;
          // _this.userInfo.email = res.data.email;
          // _this.userInfo.id_number = res.data.id_number;
          console.log("this.userInfo:" + _this.userInfo);
        })
        .catch(function (error) {
          console.log("Get Nothing!" + error);
        });
    },
  },
};
</script>
<style scoped>
.nav {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  box-shadow: 5px 5px 5px #f7f7f7;
}
.left {
  display: flex;
}
.container {
  margin-top: 100px;
  position: relative;
  display: flex;
  justify-content: center;
}

.main {
  width: 70%;
}

.headLeft {
  display: flex;
  align-items: center;
}
.port_box {
  height: 80px;
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
  height: 80px;
  display: flex;
  align-items: center;
  background-color: transparent !important;
}
.port_box img {
  height: 80px;
  width: 80px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  position: relative;
}
</style>