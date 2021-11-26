<template>
  <div>
    <div>
      <el-button class="btn" @click="saveEdit">
        <span>保存</span>
      </el-button>
      <el-button class="btn" type="danger" @click="cancelEdit" plain>
        <span>取消</span>
      </el-button>
    </div>
    <div>
      <el-tabs
        class="editTab"
        v-model="activeIndex"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="课程设置">
          <el-container style="height: 480px">
            <div class="uploadArea">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
              >
                <img
                  src="../../../assets/course.png"
                  alt="加载失败"
                  style="width: 260px"
                />
              </el-upload>
              <div class="tips">
                <br /><br /><span>仅支持*******格式图片</span><br />
                <span>建议最佳尺寸*****，不超过***</span>
              </div>
            </div>
            <div class="editArea">
              <h2>课程信息</h2>
              <el-form>
                <el-form-item label="课程编号">
                  <el-input
                    class="inputInfo"
                    v-model="this.$route.params.course_id"
                    :disabled="true"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="责任教师">
                  <el-input
                    v-model="this.$route.params.course_teacher_ID"
                    :disabled="true"
                    class="inputInfo"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="课程名称">
                  <el-input
                    v-model="tmpName"
                    style="width: 400px"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="课程介绍">
                  <el-input
                    v-model="tmpDes"
                    :rows="4"
                    type="textarea"
                    resize="none"
                    style="width: 400px"
                  >
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="教师团队"> </el-tab-pane>
        <el-tab-pane label="助教团队"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCourseInfo",
  data() {
    return {
      activeIndex: "0",
      tmpName: "",
      tmpDes: "",
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.index == 0)
        this.$router.push({name: "info",});
      else if (tab.index == 1)
        this.$router.push({name: "teachers"});
      else if (tab.index == 2)
        this.$router.push({name: "tas",});
    },
    //更新课程资料
    saveEdit() {
      console.log("success!");
      this.$router.push({ name: "info" });
    },
    cancelEdit() {
      this.$router.push({ name: "info" });
    },
  },
  mounted() {
    let _this =this
    _this.tmpName=this.$route.params.course_name
    _this.tmpDes=this.$route.params.course_des
  },
};
</script>

<style scoped>
.editTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.uploadArea {
  margin-left: 170px;
  margin-top: 70px;
  margin-right: 100px;
  font-size: 12px;
  text-align: center;
}

.editArea {
  margin-top: 10px;
  margin-left: 100px;
  line-height: 90px;
  width: 600px;
}

.btn {
  margin-left: 40px;
  margin-right: 20px;
}

.inputInfo {
  width: 150px;
  font-size: 17px;
}
</style>
