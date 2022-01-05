<template>
  <div id="projectInfo">
    <div v-if="!is_file">

    </div>
    <div v-if="is_file">
      <div class="top" style="padding-right: 200px">
        <div class="title">{{project_name}}</div>
        <!--      <div class="backButton"></div>-->
        <div class="end_time">截止时间 : {{project.end_time}}</div>
      </div>

      <div class="contents">
        <el-card class="description" shadow="never">
          <div slot="header" class="clearfix">
            <span style="font-weight: bolder">实验项目说明 ：</span>
          </div>
          <div class="text item">
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
            <el-button slot="trigger" size="medium" type="primary" id="button_selectFile" style="margin-bottom: 15px;">
              <span style="font-size: 16px;display: block">上传实验报告</span>
            </el-button>
<!--            <el-button type="primary" icon="el-icon-upload2"-->
<!--                       plain size="medium" style="margin-left: 700px;margin-bottom: 10px"-->
<!--                       @click="submit" id="button_uploadFile">-->
<!--              <span style="font-size: 17px">确认上传</span>-->
<!--            </el-button>-->
            <div class="el-upload__tip"  id="label_fileLimits">
              只能上传docx/doc/pdf文件，且不超过10Mb
            </div>
            <div v-if="has_submitted" style="margin-top: 20px">
              <el-tag type="success" style="font-size: 16px">已提交</el-tag>:
              <span class="fileName" @click="downloadReport">{{this.report_name}}</span>
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
      project : {},
      files:[],
      // files为实验资料列表
      has_submitted:false,
      report_name:'',
      is_file:true,
    };
  },
  methods:{
    submit(){
      this.$refs["projectUploadFile"].submit();
    },
    handleUpload(file) {
      let data = new FormData();
      data.append("course_ID", this.course_ID);
      console.log(this.course_ID)
      data.append("student_ID", this.student_ID);
      console.log(this.student_ID)
      data.append("project_name", this.project.name);
      console.log(this.project_name)
      data.append("file", file.file);
      console.log(file)
      console.log(data)
      this.$axios({
        url: "report/upload",
        method: "post",
        data: data,
        headers:{
          token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
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
          token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
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
      data.append("report_name", this.report_name);
      this.$axios({
        url: "/file/downloadReport",
        method: "post",
        data: data,
        headers:{
          token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
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
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
          }
        })
    .then((response)=>{
      this.project = response.data;
      if(this.project.description==''||this.project.description==null){
        this.project.description='暂无实验项目介绍';
      }
      if(this.project.end_time<this.getDateYYYYMMddHHMMSS()){
        this.$message({
          showClose: true,
          message: '已过截止时间，你只能查看实验，不能提交实验报告！',
          type: 'error'
        });
        document.getElementById('button_selectFile').style.display='none';
        document.getElementById('button_uploadFile').style.display='none';
        document.getElementById('label_fileLimits').style.display='none';
      }
    });

    // console.log(this.student_ID)
    // 获取实验报告的名字
    this.$axios.get(
        '/report/getName',{
          params:{
            course_ID: this.course_ID,
            project_name: this.project_name,
            student_ID: this.student_ID,
          },
          headers:{
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
          }
        })
        .then((response)=>{
          // console.log(response.data);
          // 没提交，返回-1
          if(response.data==-1||response.data=='-1'){
          }
          else{
            this.report_name=response.data;
            this.has_submitted=true;
          }
        });

    //获取实验的FileInfoList
    this.$axios.get(
        '/file/getFileList',{
          params:{
            course_ID: this.course_ID,
            path: '/实验资料/'+this.project_name,
          },
          headers:{
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
          }
        })
        .then((response)=>{
          // console.log(response.data);
          this.files=response.data;
        });

  }
}
</script>

<style scoped>
#projectInfo{
  width: 1350px;
  /*height: 700px;*/
  overflow: hidden;
  margin-top: 25px;
  margin-left: 210px;
  margin-right: 20px;
  padding:5px 10px;
  /*border: 2px solid rgba(0,0,0,0.5);*/
  border-radius: 5px;
}
.contents{
  width: 1200px;
  height: 600px;
  overflow: auto;
  padding-right: 200px;
}
.backButton{
  margin-left: 60px;
  margin-top: 15px;
  float: left;
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
.description{
  width: 90%;
  margin: 40px auto;
}
.fileName{
  margin-top: 15px;
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
</style>