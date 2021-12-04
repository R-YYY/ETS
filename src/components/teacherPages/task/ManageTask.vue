<template>
  <div>
    <div style="height: 40px"></div>
    <div>
      <el-tabs
        class="taskTab"
        type="border-card"
        @tab-click="handleClick"
        value="task"
      >
        <!--中间的大框框-->
        <el-tab-pane label="发布任务" name="task">
          <el-container style="height: 480px">
            <div class="typeCard">
              <!--发布实验卡片-->
              <el-card
                shadow="hover"
                @click.native="projectDialogVisible = true"
                style="cursor: pointer"
              >
                <i class="el-icon-s-cooperation"></i><br />
                <div class="choice">
                  <p>发布实验项目</p>
                </div>
              </el-card>
            </div>
            <div class="typeCard">
              <!--发布考勤卡片-->
              <el-card
                shadow="hover"
                @click.native="attendanceDialogVisible = true"
                style="cursor: pointer"
              >
                <i class="el-icon-user-solid"></i><br />
                <div class="choice">
                  <p>发布课程考勤</p>
                </div>
              </el-card>
            </div>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="实验项目" anme="project"> </el-tab-pane>
        <el-tab-pane label="课程考勤" name="attendance"> </el-tab-pane>
      </el-tabs>

      <!--填写实验项目信息-->
      <el-dialog
        title="发布实验项目信息"
        :before-close="beforeCloseProject"
        :visible.sync="projectDialogVisible"
        width="680px"
      >
        <!--实验信息表单-->
        <el-form ref="newProject" :model="tmpInfo" label-width="70px">
          <el-form-item label="项目名称" prop="name">
            <el-input
              v-model="tmpInfo.name"
              autocomplete="off"
              style="width: 550px"
              @change="projectDialogChange = true"
            ></el-input>
          </el-form-item>
          <el-form-item label="有效时间" prop="time">
            <!--开始时间-->
            <el-col style="width: 250px">
              <el-date-picker
                v-model="tmpInfo.start_time"
                type="datetime"
                placeholder="选择开始时间"
                default-time="00:00:00"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 210px"
              >
              </el-date-picker>
            </el-col>
            <el-col style="width: 50px; text-align: center">至 </el-col>
            <!--结束时间-->
            <el-col style="width: 250px; text-align: right">
              <el-date-picker
                v-model="tmpInfo.end_time"
                type="datetime"
                placeholder="选择结束时间"
                default-time="23:59:59"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 210px"
                @change="projectDialogChange = true"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="项目描述" prop="description">
            <el-input
              v-model="tmpInfo.description"
              autocomplete="off"
              type="textarea"
              :rows="10"
              style="width: 550px"
              @change="projectDialogChange = true"
            ></el-input>
          </el-form-item>
          <el-form-item label="附加文件" prop="file">
            <!--上传文件区域-->
            <el-upload
              action="#"
              multiple
              :limit="3"
              :auto-upload="false"
              :on-change="handleChange"
              :on-exceed="handleExceed"
              :on-success="fileUploadSuccess"
              :on-error="handleError"
              :http-request="upLoadFile"
            >
              <el-button slot="trigger" size="mini" type="primary"
                >选取文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                最多上传3个文件，且每个文件大小不超过5MB
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="beforeCloseProject">取 消</el-button>
          <el-button type="primary" @click="submitProject">确 定</el-button>
        </div>
      </el-dialog>

      <!--填写考勤信息-->
      <el-dialog
        title="发布考勤信息"
        :visible.sync="attendanceDialogVisible"
        width="520px"
        style="margin-top: 100px"
      >
        <div>
          <!--开始时间到结束时间-->
          <span style="margin-left: 20px; margin-right: 30px">考勤时间</span>
          <el-time-picker
            is-range
            v-model="attendanceTime"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-time-picker>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="attendanceDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitAttendance">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageTask",
  data() {
    return {
      projectDialogVisible: false,
      projectDialogChange: false,
      attendanceDialogVisible: false,
      projectInfo: {
        name: "",
        description: null,
        start_time: null,
        end_time: "",
        path_number: 0,
      },
      tmpInfo: {
        name: "",
        description: null,
        start_time: null,
        end_time: "",
        path_number: 0,
      },
      fileList: [],
      tmpFileList: [],
      attendanceTime: null,
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.index == 0) this.$router.push({ name: "tasks" });
      else if (tab.index == 1) this.$router.push({ name: "projects" });
      else if (tab.index == 2) this.$router.push({ name: "attendances" });
    },

    //调用api提交填写的考勤信息
    submitAttendance() {
      let data = new FormData();
      data.append("course_ID", this.$route.params.course_id);
      data.append("start_time", this.attendanceTime[0]);
      data.append("end_time", this.attendanceTime[1]);
      this.$axios({
        url: "/attend/addAttendance",
        method: "post",
        data: data,
      })
        .then((response) => {
          if (response.data === 1) {
            this.attendanceTime = null;
            this.attendanceDialogVisible = false;
            this.$message({
              type: "success",
              message: "发布成功！",
            });
          } else {
            this.$message({
              type: "error",
              message: "已发布过此考勤！",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "发布失败！请重试！",
          });
        });
    },

    //当填写的实验信息改变，在关闭填写框前的触发事件
    beforeCloseProject() {
      if (this.projectDialogChange) {
        this.$confirm("是否保存已编辑内容?", "提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
          .then(() => {
            this.fileList = JSON.parse(JSON.stringify(this.tmpFileList));
            this.projectInfo = JSON.parse(JSON.stringify(this.tmpInfo));
            this.projectDialogVisible = false;
            this.projectDialogChange = false;
          })
          .catch((action) => {
            if (action === "cancel") {
              //恢复原有内容
              this.tmpFileList = JSON.parse(JSON.stringify(this.fileList));
              this.tmpInfo = JSON.parse(JSON.stringify(this.projectInfo));
              this.projectDialogVisible = false;
              this.projectDialogChange = false;
            }
          });
      } else {
        this.projectDialogVisible = false;
        this.projectDialogChange = false;
      }
    },

    fileUploadSuccess() {
      console.log("???");
    },

    handleError() {
      console.log("!!!");
    },

    upLoadFile() {
      console.log(this.tmpFileList);
      let files = new FormData();
      for (let i = 0; i < this.tmpFileList.length; i++) {
        files.append("file", this.tmpFileList[i].raw);
      }

      if (this.fileList.length === 1) {
        this.$axios({
          url: "/file/upload",
          method: "post",
          data: files,
        })
          .then(() => {
            console.log("成功上传一个文件");
          })
          .catch(() => {
            console.log("上传一个，失败了");
          });
      } else {
        this.$axios({
          url: "/file/multiUpload",
          method: "post",
          data: files,
        })
          .then(() => {
            console.log("成功上传多个文件");
          })
          .catch(() => {
            console.log("上传多个，失败了");
          });
      }
    },

    //文件列表改变
    handleChange(file, fileList) {
      this.tmpFileList = fileList;
      console.log(this.tmpFileList);
    },

    //文件列表移除文件
    handleRemove(file, fileList) {
      this.tmpFileList = fileList;
      console.log(this.tmpFileList);
    },

    //文件超出可选范围
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    uploadForm() {
      let data = new FormData();
      data.append("project_ID", this.$route.params.course_id + "10");
      data.append("course_ID", this.$route.params.course_id);
      data.append("name", this.projectInfo.name);
      data.append("description", this.projectInfo.description);
      data.append("start_time", this.projectInfo.start_time);
      data.append("end_time", this.projectInfo.end_time);
      data.append("path_number", this.projectInfo.path_number);
      data.append("teacher_ID", "10100");
      this.$axios
        .post("/project/add", data)
        .then(() => {
          this.$message({
            type: "success",
            message: "创建成功！",
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "创建失败！",
          });
        });
    },

    //调用api提交填写实验信息，发布实验
    submitProject() {
      this.fileList = JSON.parse(JSON.stringify(this.tmpFileList));
      // this.projectInfo = JSON.parse(JSON.stringify(this.tmpInfo));
      // console.log(this.projectInfo.start_time);
      // console.log(this.projectInfo.end_time);
      // this.projectDialogVisible = false;
      this.upLoadFile();
    },
  },
};
</script>

<style scoped>
.taskTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.el-icon-user-solid,
.el-icon-s-cooperation {
  font-size: 180px;
  margin-left: 40px;
}

.choice {
  font-size: 25px;
  margin-left: 55px;
}

.typeCard {
  width: 300px;
  border-width: 2px;
  margin-top: 90px;
  margin-left: 170px;
  margin-right: 30px;
}
</style>
