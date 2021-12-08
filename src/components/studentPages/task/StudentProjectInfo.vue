<template>
  <div id="projectInfo">
    <div class="title">
      {{project.name}}
      <span class="end_time">截止时间 : {{project.end_time}}</span>
    </div>
    <el-divider></el-divider>
    <div class="info">
      <div class="description">
        实验项目说明 ：
        <el-divider></el-divider>
        {{project.description}}
      </div>
      <div class="file">
        <div class="description">
          <p>文件 ： </p>
          <el-button type="primary" icon="el-icon-edit" plain size="medium">填写实验报告</el-button>

          <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传docx/doc文件，且不超过10Mb</div>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentProjectInfo",
  data(){
    return{
      project : null,
      fileList:[
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        }
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
    }
  },
  mounted() {
    let _this = this
    this.$axios.get(
        'project/get',{
          params:{
            course_ID: this.$route.params.course_ID,
            name: this.$route.params.name,
          },
        })
    .then((response => _this.project = response.data))
  }
}
</script>

<style scoped>
#projectInfo{
  height: 100%;
  margin-top: 30px;
  margin-left: 220px;
  margin-right: 20px;
  background-color: white;
  padding:5px 10px;
}
.title{
  height:28px;
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
  padding-top: 13px;
  /*border:1px solid rgba(24,207,201,1);*/
  /*border-radius: 5px;*/
  /*background-image: linear-gradient(to bottom right, rgba(24,207,201,0.5), rgba(255,255,255,1));*/
}
.info{
  margin-top: 20px;
  padding-left: 30px;
  font-size: medium;
}
.file{
  margin-top: 20px;
}
.end_time{
  padding: 5px;
  border: 1px solid rgba(255,0,0,0.2);
  border-radius: 5px;
  background: rgba(255,0,0,0.1);
  color: rgba(240,0,0,1);
  margin-right: 50px;
  float: right;
  font-size: medium;
  font-weight: normal;
}
.description{
  width: 90%;
  border:1px solid rgba(24,207,201,0.5);
  border-radius: 5px;
  padding:10px;
  font-weight: bolder;
}
</style>