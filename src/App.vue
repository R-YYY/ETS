<template>
  <div id="app">
    <router-view></router-view>
    <el-button @click="hh" :style="{display:isShow}">老师课程主页</el-button>
  </div>
</template>

<script>
export default {
  name:"APP",
  data(){
    return{
      isShow: ''
    }
  },
  methods:{
    hh(){
      this.isShow='none'
      this.$router.push({
        name:'info',
        params:{
          course_id:42024401
        }
      })
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
