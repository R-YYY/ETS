<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$axios
        .get('/selectAll')
        .then(response => (console.log(response.data)))
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
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

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
