<template>
  <div id="app">
    <router-view></router-view>
<!--    <el-button @click="kk">测试</el-button>-->
  </div>
</template>

<script>
export default {
  methods:{
    hh(){
      this.$axios.post(
          '/student/add',
          this.$qs.stringify({
            student_ID:1234567,
            name:11
          })
      ).then(res => {console.log(res)}
      ).catch(err =>{console.log(err)})
    },
    gg(){
      this.$axios.post(
          '/account/idMatchPassword',
          this.$qs.stringify({
            account_ID:111111,
            password:11
          })
      ).then((res)=>{console.log(res)}
      ).catch((err)=>{console.log(err)})
    },
    kk(){
      this.$axios
          .get("/course/getListTeacherInfoByCourseId", {
            params: {
              course_ID: this.$route.params.course_id,
            },
          })
          .then((response) => {
            console.log(response.data);
          }).catch(err =>{console.log(err)})
    }
  }

}
</script>

<style>
html,body,#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

body{
  margin: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
