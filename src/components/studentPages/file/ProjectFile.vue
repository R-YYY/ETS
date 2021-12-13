<template>
  <div>
    <div class="FileCard" v-for="info in project_files">
      <div class="projectName">【{{info.folderName}}】</div>
      <div v-for="file in info.fileName">
        {{file}}
      </div>
<!--      <p class="projectName">{{file.project_name}}</p>-->
<!--      <a :href="file.path" target="_blank" class="path">-->
<!--        <i class="el-icon-document"></i>-->
<!--        {{file.name}}-->
<!--      </a>-->
<!--      <b class="time">发布时间： {{file.submit_time}}</b>-->
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectFile",
  props:{
    course_id:{
      type: String,
      default: '',
    },
  },
  data(){
    return{
      project_files: [
        // {
        //   name: '实验要求',
        //   path: 'https://www.w3school.com.cn',
        //   submit_time: '2021-11-28 22:14:00',
        //   project_name: '实验一'
        // },
        // {
        //   name: '项目提交说明',
        //   path: "https://www.w3school.com.cn",
        //   submit_time: '2021-11-28 22:16:00',
        //   project_name: '实验二'
        // }
      ]
    }
  },
  mounted() {
    var id=this.course_id;
    this.$axios.get('/file/getDirectoryFiles',{
      params:{
        course_ID:id,
        isProject:1,
      }
    }).then((response)=>{
      this.project_files=response.data;
    })
  }
}
</script>

<style scoped>
.FileCard{
  margin-top: 15px;
  margin-left: 50px;
  margin-right: 50px;
  cursor: pointer;
}

.path{
  color: rgba(11,159,250,1);
  text-decoration: none;
  margin-left: 5px;
}

a:hover{
  color: rgba(0,0,250,0.6);
  text-decoration: none;
}

.time{
  margin-right: 50px;
  font-size: smaller;
  font-weight: bolder;
  float: right;
}

.projectName{
  font-weight: bolder;
}
</style>