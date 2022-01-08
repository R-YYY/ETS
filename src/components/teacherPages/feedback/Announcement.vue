<template>
  <div>
    <div>
      <el-input
          class="inputAnnouncementName"
          v-model="input"
          placeholder="请输入公告名称"
      >
      </el-input>
      <el-button type="primary" plain>搜索</el-button>
    </div>
    <div>
      <el-tabs class="announcementTab" active-name="announcement" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="课程公告" name="announcement">
          <el-empty description="没有公告" style="height: 500px"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="课程反馈" name="feedback">
          <el-empty description="没有反馈" style="height: 500px"></el-empty>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Announcement",
  data(){
    return{

    }
  },
  methods:{
    handleClick(tab) {
      if (tab.index == 0) this.$router.push({ name: "announcements" });
      else if (tab.index == 1) this.$router.push({ name: "feedbacks" });
    },
  }
}
</script>

<style scoped>
.announcementTab{
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.inputAnnouncementName {
  width: 300px;
  margin-left: 40px;
}
</style>