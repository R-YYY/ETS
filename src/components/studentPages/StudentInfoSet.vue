<template>
  <!-- <el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        姓名：{{name}}
        性别：{{gender}}
      </el-tab-pane>
      <el-tab-pane label="账号管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </el-card> -->
    <el-card>
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
          <el-form :model="userInfo" ref="userInfo" :rules="userInfoRules">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input
                v-model="userInfo.name"
                prefix-icon="el-icon-user"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio-group v-model="userInfo.gender" disabled>
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="身份证号" :label-width="formLabelWidth">
              <el-input
                v-model="userInfo.idNum"
                prefix-icon="el-icon-postcard"
                autocomplete="off"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="height"
              label="身高/cm"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="userInfo.height"
                prefix-icon="el-icon-notebook-2"
                autocomplete="off"
                placeholder="请输入身高"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="weight"
              label="体重/kg"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="userInfo.weight"
                prefix-icon="el-icon-notebook-2"
                autocomplete="off"
                placeholder="请输入体重"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="heartRate"
              label="心率 /次/分"
              :label-width="formLabelWidth"
            >
              <el-input
                v-model="userInfo.heartRate"
                prefix-icon="el-icon-notebook-2"
                autocomplete="off"
                placeholder="请输入心率"
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
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateInfo('userInfo')"
              >保 存</el-button
            >
          </div>
        </el-dialog>
      </template>
      <!-- 个人信息显示 -->
      <el-descriptions-item label="姓名">{{
        userInfo.name
      }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        {{ userInfo.gender }}</el-descriptions-item
      >
      <el-descriptions-item label="身份证号码">
        {{ userInfo.idNum }}</el-descriptions-item
      >
      <el-descriptions-item label="出生日期">{{
        userInfo.bornDate | formatDate
      }}</el-descriptions-item>
    </el-descriptions>
    <hr />
    <!-- 健康信息显示 -->
    <el-descriptions class="margin-top" title="健康信息" :column="3">
      <el-descriptions-item label="身高"
        >{{ userInfo.height }}cm</el-descriptions-item
      >
      <el-descriptions-item label="体重"
        >{{ userInfo.weight }}kg</el-descriptions-item
      >
      <el-descriptions-item label="心率"
        >{{ userInfo.heartRate }}次/分</el-descriptions-item
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
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      name:'lbh',
      gender:'male',

    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>