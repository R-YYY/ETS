<template>
  <div id="StudentList">
    <el-table
        :data="student_list"
        stripe style="width: 100%;font-size: 16px">
      <el-table-column
          prop="student_ID"
          label="学号"
          width="200">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="200">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "NormalStudent",
  data(){
    return{
      student_list:[],
    }
  },
  mounted() {
    let that=this
    let id = this.$route.params.course_id;
    // window.alert(id);
    this.$axios.get(
        '/course/getStudentInfoList',{
          params: {
            course_ID: id,
            is_student: 1,
          },
          headers:{
            token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
          },
        })
        .then((response)=>{
          that.student_list=response.data
        })
  }
}
</script>

<style scoped>
#StudentList{
  height: 100%;
  margin-left: 30px;
  margin-right: 20px;
  background-color: white;
}
</style>