<template>
  <div>
    <div class="projectCard" v-for="item in project_list">
      <div>{{item.name}}</div>
      <div>{{item.percentage}}</div>
<!--      <el-descriptions :title="project.name" :column="1">-->
<!--        <template slot="extra">-->
<!--          <el-button type="primary" icon="el-icon-edit" plain id="checkButton" size="medium">去完成</el-button>-->
<!--        </template>-->
<!--        <el-descriptions-item label="总分数">100分</el-descriptions-item>-->
<!--        <el-descriptions-item label="占课程成绩比重">{{project.percentage}}</el-descriptions-item>-->
<!--        <el-descriptions-item label="实验成绩">{{project.score}}</el-descriptions-item>-->
<!--      </el-descriptions>-->
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectGrade",
  props:{
    course_id:{
      type: String,
      default: '',
    },
  },
  data(){
    return{
      project_list:[
        {
          name:'实验一',
          percentage:0.1,
          score:99,
        }
      ],
    }
  },
}
</script>

<style scoped>
.projectCard{
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;
  cursor: context-menu;
}

#redEndTime{
  color: tomato;
}
</style>