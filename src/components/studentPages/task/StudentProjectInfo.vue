<template>
  <div id="projectInfo">

    <div class="title">{{project.name}}</div>
    <div class="backButton">
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>
    <div class="end_time">截止时间 : {{project.end_time}}</div>

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
        <div class="text item" v-for="i in 4">
          文件{{i}}
        </div>
      </el-card>

      <el-card class="description" shadow="never">
        <div slot="header" class="clearfix">
          <span style="font-weight: bolder">实验报告 ： </span>
        </div>
        <el-button type="primary" icon="el-icon-edit" plain size="medium" style="float: right">填写实验报告</el-button>
        <!--        action  必选参数，上传的地址-->
        <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传docx/doc文件，且不超过10Mb</div>
        </el-upload>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentProjectInfo",
  data(){
    return{
      course_ID: this.$route.query.course_ID,
      name: this.$route.query.name,
      project : null,
      fileList:[
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        },
      ]
    };
  },
  methods:{
    handleRemove(file, fileList){
      console.log(file, fileList);
    },
    handlePreview(file){
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning('最多上传1个文件，本次选择了${files.length}个文件，共选择了${files.length + fileList.length}个文件');
    },
    beforeRemove(file, fileList){
      return this.$confirm('确定移除 ${file.name}?');
    },
    goBack(){
      this.$router.go(-1);
    },
  },
  mounted() {
    let _this = this
    this.$axios.get(
        'project/get',{
          params:{
            course_ID: this.course_ID,
            name: this.name,
          },
        })
    .then((response => _this.project = response.data))
  }
}
</script>

<style scoped>
#projectInfo{
  width: 1150px;
  height: 700px;
  overflow: hidden;
  margin-top: 25px;
  margin-left: 220px;
  margin-right: 20px;
  padding:5px 10px;
  /*border: 2px solid rgba(0,0,0,0.5);*/
  border-radius: 5px;
}
.contents{
  width: 1200px;
  height: 600px;
  overflow: auto;
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
.info{
  margin-top: 20px;
  padding-left: 30px;
  font-size: medium;
}
.file{
  margin-top: 20px;
}
.description{
  width: 90%;
  margin: 40px auto;
}
</style>