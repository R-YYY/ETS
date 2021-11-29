<template>
  <div>
    <div class="attendanceCard" v-for="attendance in attendance_list">
      <b class="time">{{attendance.start_time}}</b>
      <span :class="[{'success':(attendance.state == '出勤')},{'danger':(attendance.state == '缺勤')}]">{{attendance.state}}</span>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentAttendance",
  data(){
    return {
      attendance_list:[
        {
          number: '01',
          start_time: '2021-11-01 14:40:00',
          state: '出勤',
        },
        {
          number: '02',
          start_time: '2021-11-02 14:40:00',
          state: '缺勤',
        },
      ]
    }
  }
}
</script>

<style scoped>
.attendanceCard{
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;
  cursor: pointer;
}

.time{
  margin-left: 70px;
}

.success{
  margin-left: 400px;
  font-size: medium;
  color: rgba(50,180,0,0.9);
  border: 1px solid rgba(0,255,0,0.1);
  border-radius: 5px;
  padding: 6px 8px;
  background: rgba(0,200,0,0.08);
}

.danger{
  margin-left: 400px;
  font-size: medium;
  color: red;
  border: 1px solid rgba(255,0,0,0.1);
  border-radius: 5px;
  padding: 6px 8px;
  background: rgba(255,0,0,0.06);
}

</style>