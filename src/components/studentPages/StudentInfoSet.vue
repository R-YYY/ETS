<template>
  <div>
    <div class="nav">
      <div class="left" @click="toHome();">
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
              <el-button icon="el-icon-back" type="text">
                返回主页
              </el-button>
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
                        v-model="userInfo.id"
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
                        v-model="userInfo.idNum"
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
                userInfo.id
              }}</el-descriptions-item>
              <el-descriptions-item label="姓名">{{
                userInfo.name
              }}</el-descriptions-item>
              <el-descriptions-item label="身份证号码">
                {{ userInfo.idNum }}</el-descriptions-item
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
    return {
      activeName: "first",
      name: "lbh",
      gender: "male",
      userInfo: {
        id: "1952336",
        name: "lb",
        idNum: "500233",
        email: "29454@qq.com",
        password: "",
        rePassword: "",
      },
      dialogFormVisible: false,
      dialogForm2Visible: false,
      formLabelWidth: 200,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    logout() {
      sessionStorage.clear();
      this.$router.push("/login");
      location.reload();
    },
    toHome(){
      this.$router.push('/studenthome')
    }
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