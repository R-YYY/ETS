<template>
  <div>
    <div class="attendTable">
      <el-table :data="attendList" height="340px">
        <el-table-column prop="id" label="考勤编号" width="300px"></el-table-column>
        <el-table-column prop="time" label="考勤时间" sortable></el-table-column>
        <el-table-column width="150px">
          <el-button @click="drawer = true" plain>查看</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-drawer
          title="我是标题"
          :visible.sync="drawer"
          :direction="direction">
        <span>我来啦!</span>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttendanceList",
  data() {
    const item = {
      id: '1111111',
      time: '0000-00-00 00:00:00',
    };
    return {
      drawer: false,
      direction: 'ltr',
      attendList:Array(15).fill(item),
    };
  }
}
</script>

<style scoped>
.attendTable{
  position: relative;
  left: 80px;
  top:25px;
  width: 960px;
}
</style>