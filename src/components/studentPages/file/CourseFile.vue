<template>
  <div id="CourseFile">
    <div class="FileCard" v-for="file in course_files">
<!--      <a :href="file.path" :download="file.name">-->
<!--        <img :src="file.path" :alt="file.name">-->
<!--      </a>-->

      <a :href="file.path" target="_blank" class="path">
        <i class="el-icon-document"></i>
        {{file.name}}
      </a>
      <span class="time">发布时间： {{file.submit_time}}</span>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>

export default {
  name: "CourseFile",
  props:{
    course_id:{
      type: String,
      default: '',
    },
  },
  data(){
    return{
      course_files: [
        {
          name: '实验指南（中文版）',
          // path: "src/assets/ga.jpg",
          path: 'https://www.w3school.com.cn',
          submit_time: '2021-11-28 22:14:00'
        },
        {
          name: '实验指南（英文版）',
          path: "https://www.w3school.com.cn",
          submit_time: '2021-11-28 22:16:00'
        }
      ]
    }
  }
}
</script>

<style scoped>
.FileCard{
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;
  cursor: pointer;
}

.path{
  color: rgba(11,159,250,1);
  text-decoration: none;
}

a:hover{
  color: rgba(0,0,250,0.6);
  text-decoration: none;
}

.time{
  margin-right: 50px;
  font-size: smaller;
  float: right;
}
</style>