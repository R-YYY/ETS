<template>
  <div>
    <div class="attendTable">
      <el-table :data="attendList" height="530px">
        <el-table-column prop="id" label="考勤编号" width="330px">
        </el-table-column>
        <el-table-column prop="time" label="考勤时间" width="500px" sortable>
        </el-table-column>
        <el-table-column width="200px">
          <el-button @click="drawer = true" plain>查看</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-drawer title="考勤详情" :visible.sync="drawer" :direction="direction">

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
  width: 1050px;
  margin-left: 80px;
  margin-top: 0;
}
</style>