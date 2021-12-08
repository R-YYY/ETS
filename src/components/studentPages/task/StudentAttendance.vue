<template>
  <div id="stuAttendance">
    <div class="attendanceCard" v-for="attendance in attendance_list">
      <span class="time">{{attendance.start_time}}</span>
      <div :class="[{'success':(attendance.attend_type == '出勤')},
          {'danger':(attendance.attend_type == '缺勤')},
          {'normal':(attendance.attend_type == '待考勤')}
          ]"
      @click="btnClick(attendance.attend_type,attendance.start_time)"
      >
        {{attendance.attend_type}}
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
      attendance_list:[],
    }
  },
  mounted(){
    let that=this;
    let id=that.course_id;
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
    btnClick(type,start_time) {
      if(type=='出勤'||type=='缺勤'){

      }
      else{
        this.$alert('考勤成功！', '', {
          confirmButtonText: '确定',
          type: 'success'
        });
        let data = new FormData();
        let id=this.course_id;
        let student_id='1951014';
        data.append("course_ID",id);
        data.append("start_time",start_time);
        data.append("student_ID",student_id);
        this.$axios({
          url:'',
          method:"POST",
          data:data,
        })
      }
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