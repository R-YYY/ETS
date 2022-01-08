<template>
  <div>
    <div>
      <el-input
        class="searchProject"
        v-model="input"
        placeholder="请输入项目名称"
        @input="searchProject"
      >
      </el-input>
      <el-button type="primary" @click="searchProject">
        <span>搜索</span>
      </el-button>
      <el-button @click="input='';tmpList = projectList">
        <span>重置</span>
      </el-button>
    </div>
    <div>
      <el-tabs
        class="projectTab"
        type="border-card"
        @tab-click="handleClick"
        value="project"
      >
        <el-tab-pane label="发布任务" name="task"> </el-tab-pane>
        <el-tab-pane label="实验项目" name="project">
          <!--实验信息卡片列表-->
          <div class="projectArea">
            <el-row>
              <el-col
                :span="7.5"
                v-for="item in tmpList"
                :key="item.project_ID"
                :offest="1"
              >
                <div class="eachProject">
                  <el-card class="projectCard">
                    <div slot="header" class="projectName">
                      <span><b>实验名称</b>：{{ item.name }}</span>
                    </div>
                    <div class="projectDes">
                      <span class="des"><b>实验说明</b>：{{ item.description }}</span>
                      <p><b>发布教师</b>：{{ item.teacher_name }}</p>
                      <span class="time"><b>开始时间</b>：{{ item.start_time }}</span>
                      <span class="time"><b>截至时间</b>：{{ item.end_time }}</span>
                    </div>
                    <div>
                      <el-button class="btn" @click="checkProjectInfo(item.name)">
                        <span>实验信息</span>
                      </el-button>
                      <el-button class="btn" @click="checkReportList(item)">
                        <span>提交情况</span>
                      </el-button>
                    </div>
                  </el-card>
                </div>
              </el-col>
            </el-row>
          </div>

          <el-dialog
              title="实验项目信息"
              :visible.sync="projectDialogVisible"
              width="680px"
          >
            <!--实验信息表单-->
            <el-form
                ref="ProjectInfo"
                :rules="projectRules"
                :model="projectInfo"
                label-width="80px"
            >
              <el-form-item label="项目名称" prop="name">
                <el-input
                    :disabled="true"
                    v-model="projectInfo.name"
                    autocomplete="off"
                    style="width: 550px"
                ></el-input>
              </el-form-item>
              <el-form-item label="有效时间" required prop="time">
                <el-date-picker
                    :disabled="!isEdit"
                    v-model="projectInfo.time"
                    type="datetimerange"
                    align="right"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 550px"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="项目描述" prop="description">
                <el-input
                    :disabled="!isEdit"
                    v-model="projectInfo.description"
                    autocomplete="off"
                    type="textarea"
                    :rows="6"
                    style="width: 550px"
                ></el-input>
              </el-form-item>
              <el-form-item label="实验类型" prop="is_file">
                <el-radio v-model="projectInfo.is_file" label="0" :disabled="true" border>固定模板</el-radio>
                <el-radio v-model="projectInfo.is_file" label="1" :disabled="true" border>文件模板</el-radio>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button class="btn_dialog" v-if="!isEdit" @click="isEdit=true">编辑</el-button>
              <el-button class="btn_dialog" v-if="isEdit" type="primary" @click="saveProject">保存</el-button>
              <el-button class="btn_dialog" type="danger" @click="openDelete">删除</el-button>
            </div>
          </el-dialog>

          <!--实验提交情况-->
          <el-drawer
            :visible.sync="reportDialogVisible"
            :direction="direction"
            :with-header="false"
            size="55%"
          >
            <div>
              <el-input
                class="searchReport"
                v-model="input"
                placeholder="请输入学生学号或姓名或报告名称"
              >
              </el-input>
              <el-button type="primary">
                <span>搜索</span>
              </el-button>
            </div>
            <el-table
              class="reportTable"
              :data="reportList"
              :row-style="{ height: '50px' }"
              :cell-style="{ padding: '0' }"
            >
              <el-table-column
                label="学号"
                prop="student_ID"
                width="100px"
                sortable
              ></el-table-column>
              <el-table-column
                label="姓名"
                prop="name"
                width="120px"
                sortable
              ></el-table-column>
              <el-table-column
                label="提交状态"
                prop="submit_state"
                align="center"
                width="90px"
                :filters="[
                  { text: '已提交', value: '已提交' },
                  { text: '未提交', value: '未提交' },
                ]"
                :filter-method="filterSubmit"
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="
                      scope.row.submit_state === '已提交' ? 'success' : 'danger'
                    "
                    disable-transitions
                    >{{ scope.row.submit_state }}</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column label="提交报告" sortable width="230px" align="center"
                ><template slot-scope="scope">
                  <el-tooltip :content="is_file==='1'?'点击下载':'新窗口中打开'" placement="top">
                    <router-link class="reportSrc" @click="openReport(scope.row)"
                                 :to="{path:`/report`,
              query:{
                                   course_ID: course_id,
                                   name: projectName,
                                   student_ID:scope.row.student_ID,
                                   student_name:scope.row.name,
                                   token:token}}"
                                 target="_blank">
                      {{ scope.row.report_name }}</router-link>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column
                label="批改状态"
                prop="correct_state"
                align="center"
                width="90px"
                :filters="[
                  { text: '已批改', value: '已批改' },
                  { text: '未批改', value: '未批改' },
                ]"
                :filter-method="filterCorrect"
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="
                      scope.row.correct_state === '已批改'
                        ? 'success'
                        : 'danger'
                    "
                    v-if="scope.row.submit_state === '已提交'"
                    disable-transitions
                    >{{ scope.row.correct_state }}</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column label="评分" width="85px" align="center">
                <template slot-scope="scope">
                  <span
                    v-if="
                      scope.row.is_correct === false
                    "
                    >{{ scope.row.score + " / 100" }}</span>
                  <input
                      v-model="inputScore"
                      class="inputScore"
                      v-if="scope.row.is_correct === true">
                  </input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="70px" align="right">
                <template
                  slot-scope="scope"
                >
                  <el-button
                    class="checkReport"
                    type="text"
                    v-if="scope.row.is_correct === false"
                    @click="scope.row.is_correct = true"
                    >评分
                  </el-button>
                  <el-button
                    class="checkReport"
                    type="text"
                    v-if="scope.row.is_correct === true"
                    @click="correctReport(scope.row)"
                    >确定
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-drawer>
        </el-tab-pane>
        <el-tab-pane label="课程考勤" name="attendance"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  data() {
    return {
      token: window.sessionStorage.getItem('token'),
      input: "",
      projectList: [],
      tmpList: [],
      reportList: [],
      projectInfo:{
        name:"",
        time:[],
        description:"",
        is_file:"",
      },
      projectName: "",
      is_file:"",
      direction: "ltr",
      inputScore: "",
      projectDialogVisible:false,
      isEdit:false,
      reportDialogVisible: false,
      infoDialogVisible: false,
      projectRules: {
        //实验项目表单验证规则
        name: [{ required: true, message: "请填写项目名称", trigger: "blur" }],
        time: [
          { required: true, message: "请选择项目有效时间", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请填写项目描述", trigger: "blur" },
        ],
      },
      course_id:this.$route.params.course_id,
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index == 0) this.$router.push({ name: "tasks" });
      else if (tab.index == 1) this.$router.push({ name: "projects" });
      else if (tab.index == 2) this.$router.push({ name: "attendances" });
    },

    //根据输入名称在卡片列表中搜索
    searchProject() {
      if (this.input === "") this.tmpList = this.projectList;
      else {
        this.tmpList = [];
        for (let t in this.projectList) {
          if (this.projectList[t].name.indexOf(this.input) !== -1) {
            this.tmpList.push(this.projectList[t]);
          }
        }
      }
    },

    updateCard(data){
      for (let i = 0; i < this.projectList.length; i++) {
        if(this.projectList[i].name === data.get("name")){
          this.projectList[i].description=data.get("description")
          this.projectList[i].start_time=data.get("start_time")
          this.projectList[i].end_time=data.get("end_time")
          break
        }
      }
      for (let i = 0; i < this.tmpList.length; i++) {
        if(this.tmpList[i].name === data.get("name")){
          this.tmpList[i].description=data.get("description")
          this.tmpList[i].start_time=data.get("start_time")
          this.tmpList[i].end_time=data.get("end_time")
          return
        }
      }
    },

    deleteCard(data){
      for (let i = 0; i < this.projectList.length; i++) {
        if(this.projectList[i].name === data.get("name")){
          this.projectList.splice(this.projectList[i],1)
          break
        }
      }
      for (let i = 0; i < this.tmpList.length; i++) {
        if(this.tmpList[i].name === data.get("name")){
          this.tmpList.splice(this.tmpList[i],1)
          return
        }
      }
    },

    async saveProject(){
      let data = new FormData()
      data.append("course_ID",this.$route.params.course_id)
      data.append("name",this.projectInfo.name)
      data.append("description",this.projectInfo.description)
      data.append("start_time",this.projectInfo.time[0])
      data.append("end_time",this.projectInfo.time[1])
      await this.$axios({
        url:"/project/update",
        method:"post",
        data:data,
        headers: {
          token: window.sessionStorage.getItem('token')
          // token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        },
      }).then((response)=>{
        console.log(response.data)
        if(response.data===1){
          this.isEdit=false
          this.$message({
            type: "success",
            message: "修改成功！",
          });
          this.updateCard(data)
        }
        else{
          this.$message({
            type: "error",
            message: "修改失败，请重试！",
          });
        }
      }).catch(()=>{
        this.$message({
          type: "error",
          message: "修改失败，请重试！",
        });
      })
    },

    openDelete(){
      this.$confirm("此操作将从课程中删除该实验及相关实验报告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteProject()
      }).catch();
    },

    deleteProject(){
      let data = new FormData()
      data.append("course_ID",this.$route.params.course_id)
      data.append("name",this.projectInfo.name)
      this.$axios({
        url:"/project/delete",
        method:"post",
        data:data,
        headers: {
          token: window.sessionStorage.getItem('token')
          // token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        },
      }).then((response)=>{
        if(response.data === 1){
          this.$message({
            type: "success",
            message: "删除成功！",
          });
          this.deleteCard(data)
          this.projectDialogVisible=false
        }
        else{
          this.$message({
            type: "error",
            message: "删除失败，请重试！",
          });
        }
      }).catch(()=>{
        this.$message({
          type: "error",
          message: "删除失败，请重试！",
        });
      })
    },

    checkProjectInfo(name){
      this.isEdit=false
      this.projectDialogVisible = true
      this.projectInfo.name=""
      this.projectInfo.description=""
      this.$axios({
        url:"/project/get",
        method:"get",
        params:{
          course_ID:this.$route.params.course_id,
          name:name
        },
        headers: {
          token: window.sessionStorage.getItem('token')
          // token:
          //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        },
      }).then((response)=>{
        console.log(response.data)
        this.projectInfo.name=response.data.name
        this.projectInfo.description=response.data.description
        this.projectInfo.time=[response.data.start_time,response.data.end_time]
        this.projectInfo.is_file=response.data.is_file
      }).catch()
    },

    //查看实验报告
    checkReportList(data) {
      this.projectName = data.name;
      this.is_file = data.is_file
      this.reportList = [];
      this.$axios({
        url: "/report/getTotalReport",
        method: "get",
        params: {
          course_ID: this.$route.params.course_id,
          project_name: data.name,
        },
        headers: {
          token: window.sessionStorage.getItem('token')
          // token:
          //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        },
      })
        .then((response) => {
          console.log('report-list')
          console.log(response.data);
          for (let i = 0; i < response.data.length; i++) {
            this.reportList.push({
              student_ID: response.data[i].student_ID,
              name: response.data[i].name,
              submit_state:
                response.data[i].submit_time === null ? "未提交" : "已提交",
              report_name: response.data[i].report_name,
              correct_state:
                response.data[i].correct_time === null ? "未批改" : "已批改",
              score:
                response.data[i].score === null ? 0 : response.data[i].score,
              is_correct: false,
            });
          }
        })
        .catch();
      this.reportDialogVisible = true;
    },

    filterCorrect(value, row) {
      return row.correct_state === value;
    },

    filterSubmit(value, row) {
      return row.submit_state === value;
    },

    async correctReport(row) {
      if (
          this.inputScore < 0 ||
          this.inputScore > 100 ||
          this.inputScore.split(".").length > 1
      ) {
        this.$message({
          type: "error",
          message: "请输入0-100以内的整数",
        });
        return;
      }
      if(row.submit_state==null){
        // 实验报告没有提交
        if(this.is_file=='1'){
          // 文件实验

        }
        else{
          // 模板实验

        }




      }
      else{
        let data = new FormData();
        data.append("course_ID", this.$route.params.course_id);
        data.append("project_name", this.projectName);
        data.append("student_ID", row.student_ID);
        data.append("score", this.inputScore);
        await this.$axios({
          url: "/report/correct",
          method: "post",
          data: data,
          headers: {
            token: window.sessionStorage.getItem('token')
          },
        })
            .then((response) => {
              console.log('report/correct:'+response.data)
              if (response.data === 1) {
                row.score = this.inputScore;
                this.inputScore = "";
                this.$message({
                  type: "success",
                  message: "批改成功！",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "批改失败！请重试！",
                });
              }
            })
            .catch(() => {
              this.$message({
                type: "error",
                message: "批改失败！请重试！",
              });
            });
        row.is_correct = false;
      }

    },

    openReport(row){
      if(this.is_file === "1"){
        this.downloadReport(row)
      }else{
        //TODO 打开新窗口显示实验报告
      }
    },

    downloadReport(row){
      let data = new FormData()
      data.append("course_ID",this.$route.params.course_id)
      data.append("project_name",this.projectName)
      data.append("report_name",row.report_name)
      this.$axios({
        url:"/file/downloadReport",
        method:"post",
        data:data,
        headers: {
          token: window.sessionStorage.getItem('token')
          // token:
          //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        },
      }).then((response)=>{
        let blob = new Blob([response.data]);
        const disposition = response.headers["content-disposition"];
        //获得文件名
        let fileName = disposition.substring(
            disposition.indexOf("filename=") + 9,
            disposition.length
        );
        //解码
        fileName = decodeURI(fileName);
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName);
        } else {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      }).catch(()=>{
        this.$message({
          type: "error",
          message: "下载失败！请重试！",
        });
      })
    }
  },

  mounted() {
    //调用api加载实验列表
    this.$axios({
      url: "/project/getProjectInfoListByCourseId",
      method: "get",
      params: {
        course_ID: this.$route.params.course_id,
      },
      headers: {
        token: window.sessionStorage.getItem('token')
        // token://
        //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
      },
    })
      .then((response) => {
        console.log(response.data)
        this.projectList = response.data;
        this.tmpList = this.projectList;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.projectTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.searchProject {
  width: 300px;
  margin-left: 40px;
}

.projectCard {
  height: 330px;
  width: 460px;
}

.btn {
  margin-top: 25px;
  margin-left: 60px;
  margin-right: 60px;
}

.projectArea {
  height: 500px;
  overflow: auto;
}

.eachProject {
  margin: 30px 30px 20px 70px;
}

.projectDes {
  margin-left: 10px;
  margin-right: 10px;
}

.projectName {
  margin-left: 10px;
  font-size: 18px;
}

.searchReport {
  width: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 30px;
}

.reportTable {
  margin-left: 20px;
  width: 800px;
}

.reportSrc {
  text-decoration: underline;
  cursor: pointer;
}

.checkReport {
  margin-left: 20px;
}

.inputScore {
  height: 25px;
  width: 60px;
}

.des{
  height: 85px;
  line-height: 30px;
  overflow: hidden;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.time{
  font-size: 13px;
  margin-right: 10px;
}

.projectInfo{
  /*margin-left: 50px;*/
}
</style>
