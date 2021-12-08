<template>
  <div id="stuAttendance">
    <div class="attendanceCard" v-for="attendance in attendance_list">
      <span class="time">{{attendance.start_time}}</span>
      {{attendance.attend_type=='出勤'}}

      <div :class="[{'success':(attendance.attend_type == '出勤')},
          {'danger':(attendance.attend_type === '缺勤')},
          {'normal':(attendance.attend_type === '待考勤')}
          ]">{{attendance.state}}
      </div>
    </div>
    
    <div class="attendanceCard" v-for="attendance in history_attendance">
      <span class="time">{{attendance.start_time}}</span>
      <div :class="[{'success':(attendance.state == 1)},
          {'danger':(attendance.state == 2)},
          {'normal':(attendance.state == 3)}
          ]" @click="btnClick(attendance.state)">
        {{attendance.state}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentAttendance",
  props:{
    course_id:{
      type: String,
      default: '',
    },
  },
  data(){
    return {
      attendance_list:[

      ],
      history_attendance:[
        {
          start_time:'2021-11-01 14:40:00',
          state:1,
        },
        {
          start_time:'2021-12-01 14:40:00',
          state:2,
        },
        {
          start_time:'2021-12-08 14:40:00',
          state:3,
        },
      ]
    }
  },
  mounted(){
    let that=this;
    let id=that.course_id;
    this.$axios.get('attend/getOnGoingAttendanceListByCourseId',
        {
          params:{
            course_ID:id,
          }
        }
    ).then(
        (response)=>{
          that.attendance_list=response.data;
        }
    );
    let student_id='1951014';
    this.$axios.get('attend/getAttendInfoList',
        {
          params:{
            course_ID:id,
            student_ID:student_id,
          }
        }
    ).then(
        (response)=>{
          that.attendance_list=response.data;
        }
    )
  },
  methods:{
    btnClick(state) {
      window.alert(state);
    }
  }
}
</script>

<style scoped>
#stuAttendance{
  width: 90%;
  margin: 25px 10px;
}
.attendanceCard{
  width:100%;
  height: 55px;
  border-bottom: 2px solid rgba(0,0,0,0.2);
  padding-top: 30px;
  cursor: pointer;
}
.time{
  height: 40px;
  margin-left: 70px;
  margin-top: 8px;
  font-size: 18px;
  /*float: left;*/
}
.success{
  float: right;
  margin-right: 30px;
  font-size: 17px;
  color: rgba(50,180,0,0.9);
  border: 1px solid rgba(0,255,0,0.1);
  border-radius: 5px;
  padding: 6px 8px;
  background: rgba(0,200,0,0.08);
}

.danger{
  float: right;
  margin-right: 30px;
  font-size: 17px;
  color: red;
  border: 1px solid rgba(255,0,0,0.1);
  border-radius: 5px;
  padding: 6px 8px;
  background: rgba(255,0,0,0.06);
}
.normal{
  float: right;
  margin-right: 30px;
  font-size: 17px;
  color: rgba(24,207,201,1);
  border: 1px solid rgba(24,207,201,0.1);
  border-radius: 5px;
  padding: 6px 8px;
  background: rgba(24,207,201,0.06);
}

</style>