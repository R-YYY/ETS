<template>
  <div class="stuProject">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadCrumb">
<!--      <el-breadcrumb-item :to="{ path: '/' }">课程</el-breadcrumb-item>-->
      <el-breadcrumb-item>课程</el-breadcrumb-item>
      <el-breadcrumb-item>学习任务</el-breadcrumb-item>
      <el-breadcrumb-item >实验项目</el-breadcrumb-item>
      <el-breadcrumb-item>
        <label class="projectName">
          {{project.name}}
        </label>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="info">
      <b class="item">实验项目 ： {{project.name}}</b>
      <span class="item">发布老师 ： {{project.teacher_ID}}???</span>
      <p id="end_time" class="item">截止时间 : {{project.end_time}}</p>
      <p>实验项目说明 ： </p>
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
            project_ID: this.$route.params.project_ID,
          },
        })
    .then((response => _this.project = response.data))
  }
}
</script>

<style scoped>
.stuProject{
  height: 100%;
  margin-top: 30px;
  margin-left: 170px;
  margin-right: 20px;
  background-color: white;
}

.breadCrumb{
  margin-top: 30px;
  padding-top: 20px;
  padding-left: 20px;
  font-size: large;
}

.info{
  padding-left: 30px;
  font-size: medium;
}

.item{
  margin-right: 40px;
}

.projectName{
  color: turquoise;
}

#end_time{
  color: red;
}
</style>