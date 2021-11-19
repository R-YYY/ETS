<template>
  <div>
    <el-tabs class="projectTab" type="border-card" @tab-click="handleClick">
      <el-tab-pane class="optionPage" label="发布任务">
        <div>
          <el-container>
            <el-aside width="530px">
              <el-card class="typeCard" shadow="hover" @click.native="addProject">
                <i class="el-icon-s-cooperation"></i><br>
                <p class="choice">发布实验项目</p>
              </el-card>
              <el-dialog title="发布实验项目信息" :before-close="beforeCloseProject"
                         :visible.sync="projectDialogVisible" width="680px">
                <el-form :model="projectInfo" label-width="70px">
                  <el-form-item label="项目名称">
                    <el-input v-model="projectInfo.name" autocomplete="off"
                              style="width: 550px" @change="projectDialogChange = true"></el-input>
                  </el-form-item>
                  <el-form-item label="有效时间">
                    <el-col style="width: 250px">
                      <el-date-picker
                          v-model="projectInfo.release_time"
                          type="datetime"
                          placeholder="选择开始时间"
                          default-time="00:00:00"
                          style="width: 210px">
                      </el-date-picker>
                    </el-col>
                    <el-col style="width: 50px;text-align: center">至
                    </el-col>
                    <el-col style="width: 250px;text-align: right">
                      <el-date-picker
                          v-model="projectInfo.deadline"
                          type="datetime"
                          placeholder="选择结束时间"
                          default-time="23:59:59"
                          style="width: 210px">
                      </el-date-picker>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="项目描述">
                    <el-input v-model="projectInfo.description"
                              autocomplete="off"
                              type="textarea"
                              :rows="10"
                              style="width: 550px"
                              @change="projectDialogChange = true"></el-input>
                  </el-form-item>
                  <el-form-item label="附加文件">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                        :auto-upload="false">
                      <el-button size="mini" type="primary">选取文件</el-button>
                      <div slot="tip" class="el-upload__tip">最多上传*个文件，且每个文件大小不超过***</div>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="beforeCloseProject">取 消</el-button>
                  <el-button type="primary" @click="submitProject">确 定</el-button>
                </div>
              </el-dialog>
            </el-aside>

            <el-aside width="530px">
              <el-card class="typeCard" shadow="hover" @click.native="attendanceDialogVisible = true">
                <i class="el-icon-user-solid"></i><br>
                <p class="choice">发布课程考勤</p>
              </el-card>
              <el-dialog title="发布考勤信息" :visible.sync="attendanceDialogVisible"
                         width="500px" :destroy-on-close="true">
                <div>
                  <span style="margin-right: 30px">考勤时间</span>
                  <el-time-picker
                      is-range
                      v-model="attendanceTime"
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围">
                  </el-time-picker>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="attendanceDialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitAttendance">确 定</el-button>
                </div>
              </el-dialog>
            </el-aside>
          </el-container>
        </div>
      </el-tab-pane>

      <el-tab-pane class="optionPage" label="实验项目">
        <router-view name="projectList"></router-view>
      </el-tab-pane>

      <el-tab-pane class="optionPage" label="课程考勤">
        <router-view name="attendanceList"></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ManageTask",
  data() {
    return {
      projectDialogVisible:false,
      projectDialogChange:false,
      attendanceDialogVisible:false,
      attendanceDialogChange:false,
      attendanceTime:null,
      projectInfo:{
        name:'',
        description:null,
        release_time:null,
        deadline:'',
        path_number:0,
      },
      attendanceInfo:{
        start_time:null,
        end_time:null,
      },
      fileList:[
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    };
  },
  methods:{
    handleClick(tab,event){
      if(tab.index == 0)
        this.$router.push({
          name:'tasks',
          params: {
            course_id:42024401
          }
        })
      else if(tab.index == 1)
        this.$router.push({
          name:'projects',
          params: {
            course_id:42024401
          }
        })
      else if(tab.index == 2)
        this.$router.push({
          name:'attendances',
          params:{
            course_id:42024401
          }
        })
    },

    addProject(){
      this.projectDialogVisible = true;
    },

    beforeCloseProject(){
      if(this.projectDialogChange){
        this.$confirm('是否保存已编辑内容?', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(()=>{
          this.projectDialogVisible = false
          this.projectDialogChange = false
        }).catch( action => {
          if(action === 'cancel') {
            //  重置发布项目表单内容
            this.projectDialogVisible = false
            this.projectDialogChange = false
          }
        });
      }
      else {
        this.projectDialogVisible = false
        this.projectDialogChange = false
      }
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePreview(file) {
      console.log(file);
    },

    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    submitProject(){
      this.projectDialogVisible = false;
    },

    submitAttendance(){
      this.attendanceDialogVisible = false;
    },
  }
}
</script>

<style scoped>
.projectTab{
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 30px;
  background-color:white;
}

.el-icon-user-solid, .el-icon-s-cooperation{
  font-size: 180px;
  position: relative;
  margin-left: 30px;
}

.choice{
  font-size: 25px;
  position: relative;
  margin-left: 50px;
}

.typeCard{
  border-width: 2px;
  margin-top: 110px;
  margin-left: 190px;
  margin-right: 50px;
  cursor:pointer;
}
</style>