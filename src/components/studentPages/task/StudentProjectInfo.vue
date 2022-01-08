<template>
  <div id="projectInfo">
    <div>
      <div class="top" style="padding-right: 200px">
        <div class="title">{{project_name}}</div>
        <!--      <div class="backButton"></div>-->
        <div class="end_time">截止时间 : {{project.end_time}}</div>
        <div v-if="is_corrected" class="score">得分：{{report.score}}</div>
      </div>

      <div v-if="!is_file" class="model-report">
        <div class="model-text">
          <div class="item">
            <div class="item-title">实验目的：</div>
            <!--          <textarea rows="5" cols="108" id="purpose" name="message"></textarea>-->
            <el-input
                name="input"
                type="textarea"
                :autosize="{minRows:5}"
                v-model="purpose"
                :disabled="is_expired?true:false"
                maxlength="1000"
                show-word-limit style="font-size: 19px">
            </el-input>
          </div>
          <div class="item">
            <div class="item-title">实验原理：</div>
            <!--        <textarea rows="5" cols="108" id="principle" name="message"></textarea>-->
            <el-input
                name="input"
                type="textarea"
                :autosize="{minRows:5}"
                v-model="principle"
                :disabled="is_expired?true:false"
                maxlength="1000"
                show-word-limit style="font-size: 19px">
            </el-input>
          </div>
          <div class="item">
            <div class="item-title">实验设备：</div>
            <!--        <textarea rows="5" cols="108" id="device" name="message"></textarea>-->
            <el-input
                name="input"
                type="textarea"
                :autosize="{minRows:5}"
                v-model="device"
                :disabled="is_expired?true:false"
                maxlength="1000"
                show-word-limit style="font-size: 19px">
            </el-input>
          </div>
          <div class="item">
            <div class="item-title">实验步骤：</div>
            <!--        <textarea rows="5" cols="108" id="content" name="message"></textarea>-->
            <el-input
                name="input"
                type="textarea"
                :autosize="{minRows:5}"
                v-model="steps"
                :disabled="is_expired?true:false"
                maxlength="3000"
                show-word-limit style="font-size: 19px">
            </el-input>
          </div>
          <div class="item">
            <div class="item-title">实验结论：</div>
            <!--        <textarea rows="5" cols="108" id="summary" name="message"></textarea>-->
            <el-input
                name="input"
                type="textarea"
                :autosize="{minRows:5}"
                v-model="conclusion"
                :disabled="is_expired?true:false"
                maxlength="1000"
                show-word-limit style="font-size: 19px">
            </el-input>
          </div>
          <div class="button-area">
            <el-button type="primary" class="submit-button" style="font-size: 18px"
                       :disabled="is_expired?true:false"
                       @click="saveIt">暂时保存</el-button>
            <el-button type="primary" class="submit-button" style="font-size: 18px"
                       :disabled="is_expired?true:false"
                       @click="submitIt">确认提交</el-button>
          </div>
        </div>
      </div>
      <div v-if="is_file" class="contents">
        <el-card class="description" shadow="never">
          <div slot="header" class="clearfix">
            <span style="font-weight: bolder">实验项目说明 ：</span>
          </div>
          <div class="text-item">
            {{project.description}}
          </div>
        </el-card>

        <el-card class="description" shadow="never">
          <div slot="header" class="clearfix">
            <span style="font-weight: bolder">文件 ： </span>
          </div>
          <div v-for="file in files" class="fileName" @click="handleDownload(file.file_name)">
            {{file.file_name}}
          </div>
        </el-card>

        <el-card class="description" shadow="never">
          <div slot="header" class="clearfix">
            <span style="font-weight: bolder">实验报告 ： </span>
          </div>

          <el-upload
              action="#"
              multiple
              ref="projectUploadFile"
              :http-request="handleUpload"
              :show-file-list="false"
          >
            <el-button slot="trigger" size="medium" type="primary"
                       id="button_selectFile"
                       style="margin-bottom: 15px;"
            >
              <span style="font-size: 16px;display: block">上传实验报告</span>
            </el-button>

            <div class="el-upload__tip"  id="label_fileLimits">
              只能上传docx/doc/pdf文件，且不超过10Mb
            </div>
            <div v-if="has_submitted" style="margin-top: 20px">
              <el-tag type="success" style="font-size: 16px">已提交</el-tag>:
              <span class="fileName" @click="downloadReport">{{this.report.report_name}}</span>
            </div>
          </el-upload>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentProjectInfo",
  data(){
    return{
      course_ID: this.$route.query.course_ID,
      student_ID: this.$route.query.student_ID,
      project_name: this.$route.query.name,
      token:this.$route.query.token,
      project : {},
      files:[],
      has_submitted:false,
      is_corrected:false,
      is_file: true,
      is_expired:false,
      purpose:'',
      principle:'',
      device:'',
      steps:'',
      conclusion:'',
      report:{},
    };
  },
  methods:{
    getTemplateReport(){

    },
    autoSubmitTemplate(){
      var is_submit = '1'
      let data = new FormData();
      data.append("course_ID", this.course_ID);
      data.append("student_ID", this.student_ID);
      data.append("project_name", this.project.name);
      data.append("purpose",this.purpose);
      data.append("principle",this.principle);
      data.append("device",this.device);
      data.append("steps",this.steps);
      data.append("conclusion",this.conclusion);
      data.append("isSubmit", is_submit);
      this.$axios({
        url: "report/add",
        method: "post",
        data: data,
        headers:{
          token: this.token
          // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        }
      }).then((response) => {
        console.log('report/add:'+response.data);
      })
          .catch(() => {

          });
    },
    addReport(is_submit){
      let data = new FormData();
      data.append("course_ID", this.course_ID);
      data.append("student_ID", this.student_ID);
      data.append("project_name", this.project.name);
      data.append("purpose",this.purpose);
      data.append("principle",this.principle);
      data.append("device",this.device);
      data.append("steps",this.steps);
      data.append("conclusion",this.conclusion);
      data.append("isSubmit", is_submit);
      this.$axios({
        url: "report/add",
        method: "post",
        data: data,
        headers:{
          token: this.token
          // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        }
      }).then((response) => {
        console.log('report/add:'+response.data);
        if (response.data == 1) {
          if(is_submit=='1'){
            this.$message({
              type: "success",
              message: "提交成功！",
            });
            // location.reload();
          }
          else{
            this.$message({
              type: "success",
              message: "保存成功！",
            });
          }
        }
        else {
          this.$message({
            type: "error",
            message: "操作失败！请重试！",
          });
        }
      })
          .catch(() => {
            this.$message({
              type: "error",
              message: "操作失败！请重试！",
            });
          });
    },
    saveIt(){
      this.addReport('0')
    },
    submitIt(){
      this.addReport('1')
    },
    submit(){
      this.$refs["projectUploadFile"].submit();
    },
    handleUpload(file) {
      let data = new FormData();
      data.append("course_ID", this.course_ID);
      // console.log(this.course_ID)
      data.append("student_ID", this.student_ID);
      // console.log(this.student_ID)
      data.append("project_name", this.project.name);
      // console.log(this.project_name)
      data.append("file", file.file);
      // console.log(file)
      this.$axios({
        url: "report/upload",
        method: "post",
        data: data,
        headers:{
          token: this.token
          // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        }
      }).then((response) => {
        console.log(response.data);
        if (response.data === 1) {
          this.$message({
            type: "success",
            message: file.file.name + " 上传成功！",
          });
          location.reload();
        }
        else {
          this.$message({
            type: "error",
            message: "上传失败！请重试！",
          });
        }
      })
          .catch(() => {
            this.$message({
              type: "error",
              message: "上传失败！请重试！",
            });
          });
    },
    getDateYYYYMMddHHMMSS() {
      const date = new Date();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const strDate = date.getDate().toString().padStart(2, "0");
      const starHours = date.getHours().toString().padStart(2, "0");
      const starMinutes = date.getMinutes().toString().padStart(2, "0");
      const starSeconds = date.getSeconds().toString().padStart(2, "0");
      return `${date.getFullYear()}-${month}-${strDate} ${starHours}:${starMinutes}:${starSeconds}`;
    },
    handleDownload(fileName) {
      var folderName=this.project_name;
      var id=this.course_ID;
      var path='/实验资料/'+folderName;
      let data = new FormData();
      data.append("course_ID", id);
      data.append("path", path);
      data.append("file_name", fileName);
      this.downloadFile(data);
    },
    downloadFile(data) {
      this.$axios({
        url: "/file/downloadFile",
        method: "post",
        data: data,
        headers:{
          token: this.token
          // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        },
        responseType: "blob",
      }).then((response) => {
        // console.log(response);
        let blob = new Blob([response.data]);
        // console.log(blob);
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
      });
    },
    downloadReport() {
      var id=this.course_ID;
      console.log('begin')
      console.log(id)
      let data = new FormData();
      data.append("course_ID", this.course_ID);
      data.append("project_name", this.project_name);
      data.append("report_name", this.report.report_name);
      this.$axios({
        url: "/file/downloadReport",
        method: "post",
        data: data,
        headers:{
          token: this.token
          // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        },
        responseType: "blob",
      }).then((response) => {
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
      });
    },
  },
  mounted() {
    // 根据课程ID和实验名称获取实验项目
    this.$axios.get(
        'project/get',{
          params:{
            course_ID: this.course_ID,
            name: this.project_name,
          },
          headers:{
            token: this.token
            // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
          }
        })
    .then((response)=>{
      this.project = response.data;
      if(this.project.is_file=="0"){
        this.is_file=false;
      }
      else{
        this.is_file=true;
      }
      if(this.project.description==''||this.project.description==null){
        this.project.description='暂无实验项目介绍';
      }
      if(this.project.end_time<this.getDateYYYYMMddHHMMSS()){
        this.$message({
          showClose: true,
          message: '已过截止时间，你只能查看实验，不能提交实验报告！',
          type: 'error'
        });
        this.is_expired=true
      }
    });

    // 获取实验报告
    this.$axios.get(
        '/report/get',{
          params:{
            course_ID: this.course_ID,
            project_name: this.project_name,
            student_ID: this.student_ID,
          },
          headers:{
            token: this.token
            // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
          }
        })
        .then((response)=>{
          console.log('report/get')
          console.log(response.data);
          this.report=response.data
          // 没提交，返回-1
          if(this.report == null){
          }
          else{
            this.report_name=this.report.report_name
            this.has_submitted=true;
            if(this.report.correct_time!=null){
              this.is_corrected = true
            }
          }
        });
    this.getTemplateReport()
    // 获取模板实验报告内容
    let data = new FormData();
    data.append("course_ID", this.course_ID);
    data.append("student_ID", this.student_ID);
    data.append("project_name", this.project_name);
    console.log(this.project_name)
    // 获取模板实验报告
    this.$axios({
      url: "report/getContent",
      method: "post",
      data: data,
      headers:{
        token: this.token
        // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
      }
    })
        .then((response)=>{
          console.log('report/getContent')
          console.log(response.data);
          var content=response.data
          this.purpose=content.purpose
          this.principle=content.principle
          this.device=content.device
          this.steps=content.steps
          this.conclusion=content.conclusion
        });


    if(this.is_file=true){

    }
    else{
      if(this.has_submitted==false && this.is_expired==true){
        this.autoSubmitTemplate();
      }
    }

    //获取实验的FileInfoList
    this.$axios.get(
        '/file/getFileList',{
          params:{
            course_ID: this.course_ID,
            path: '/实验资料/'+this.project_name,
          },
          headers:{
            token: this.token
            // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
          }
        })
        .then((response)=>{
          // console.log(response.data);
          this.files=response.data;
        });

  },
  // updated() {
  //   if(this.is_expired){
  //     var htmls = document.getElementsByName('input')
  //     for(var i=0 ;i<htmls.length; i++){
  //       htmls[i].disabled=true
  //       // console.log('updated'+htmls[i].disabled)
  //     }
  //   }
  // }
}
</script>

<style scoped>
#projectInfo{
  width: 1350px;
  /*height: 1300px;*/
  overflow: hidden;
  margin-top: 25px;
  margin-left: 210px;
  margin-right: 20px;
  padding:5px 10px;
  /*border: 2px solid rgba(0,0,200,0.5);*/
  border-radius: 5px;
}
.contents{
  width: 1200px;
  height: 600px;
  overflow: auto;
  padding-right: 200px;
}
.title{
  text-align: center;
  font-size: 27px;
  font-weight: bold;
  margin-top: 10px;
}
.end_time{
  float: right;
  margin-right: 75px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
  font-family: "Microsoft YaHei UI Light";
}
.score{
  margin-left: 75px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 25px;
  display: block;
  color: #f60b0b;
}
.description{
  width: 90%;
  margin: 40px auto;
}
.fileName{
  margin-bottom: 10px;
  margin-left: 30px;
  color: rgba(11,159,250,1);
  cursor: context-menu;
}
.fileName:hover{
  color: rgba(0,0,250,0.6);
}
a:hover{
  text-decoration: none;
}
.model-report{
  /*border: 1px solid red;*/
  width: 1300px;
  height: 500px;
  padding-bottom: 100px;
  overflow: hidden;
}
.model-text{
  width: 1200px;
  height: 600px;
  padding-right: 300px;
  /*border: 1px solid pink;*/
  overflow: auto;
}
.item{
  margin: 20px 0 0px 0;
}
.item-title{
  font-size: 25px;
  margin-bottom: 10px;
}
.submit-button{
  width: 110px;
  height: 40px;
  background-color: #18cfc9;
  border-radius: 5px;
  border: none;
  margin-left: 10px;
  margin-right: 50px;
}
.button-area{
  padding: 20px 400px 20px 420px;
}

</style>