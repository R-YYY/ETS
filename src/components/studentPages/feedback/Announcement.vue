<template>
<div id="announce">
  <el-empty v-if="is_empty" description="没有公告" style="height: 325px"></el-empty>
  <div v-if="!is_empty" class="feedbackArea">
    <div class="feedbackText">
      <el-divider></el-divider>
      <div v-for="item in announcement_list" class="feedback-item">
        <div>
          <div class="header">
            {{item.name}}<span class="number">{{item.release_time}}</span>
          </div>
          <div class="feedback-content">{{item.content}}</div>
          <div class="name">—— {{item.teacher_name}}</div>
        </div>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Announcement",
  data(){
    return{
      announcement_list:[],
      course_ID: this.$route.params.course_id,
      student_ID:window.sessionStorage.getItem('account_ID'),
      is_empty:true,
    }
  },
  mounted() {
    this.announcement_list.splice(0)
    var id=this.course_ID;
    // 获得所有的announcement
    this.$axios.get('/announcement/getAll',{
      params:{
        course_ID:id,
      },
      headers:{
        token: window.sessionStorage.getItem('token')
      },
    }).then((response)=>{
      console.log('announce_list:');
      console.log(response.data);
      var noNameList = response.data
      if(noNameList.length>0){
        this.is_empty=false
      }
      for(let i=0; i<noNameList.length; i++){
        this.$axios.get('/teacher/get',{
          params:{
            teacher_ID:noNameList[i].teacher_ID,
          },
          headers:{
            token: window.sessionStorage.getItem('token')
          },
        }).then((response)=>{
          console.log('teacher:');
          console.log(response.data);
          var teacher_name=response.data.name
          var obj={
            teacher_ID:noNameList[i].teacher_ID,
            teacher_name:teacher_name,
            release_time:noNameList[i].release_time,
            content:noNameList[i].content,
            name:noNameList[i].name,
          }
          this.announcement_list.push(obj)
        })
            .catch(() => {
              console.log('error')
            });
      }
    })
        .catch(() => {
        });
  }
}
</script>

<style scoped>
#announce{
  /*height: 630px;*/
  padding: 0px 38px;
  /*border: 1px solid red;*/
}
.feedbackArea{
  width: 818px;
  height: 750px;
  /*border:1px solid rgba(0,0,0,1);*/
  border-radius: 8px;
  margin:0;
  overflow: hidden;
}
.feedbackText{
  width: 800px;
  height: 730px;
  margin-top: 0;
  overflow: auto;
  padding-right: 70px;
}
.header{
  font-size: 20px;
  margin-left: 50px;
  /*border: 1px solid red;*/
}
.name{
  font-size: 19px;
  margin-bottom: 5px;
  margin-left: 600px;
  /*border: 1px solid #f60b0b;*/
}
.number{
  font-size: 17px;
  margin-left: 20px;
  /*border: 1px solid #f60b0b;*/
}
.feedback-content{
  width: 600px;
  /*border: 1px solid rgba(0,0,220,1);*/
  border-radius: 5px;
  padding: 10px 10px;
  margin-left: 100px;
  /*margin-right: 50px;*/
  font-size: 18px;
}
</style>