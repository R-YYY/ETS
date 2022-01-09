<template>
  <div>
    <div>
      <el-input
          class="inputFeedbackName"
          v-model="input"
          placeholder="请输入反馈人姓名"
      >
      </el-input>
      <el-button type="primary" plain>搜索</el-button>
    </div>
    <div>
      <el-tabs class="feedbackTab" active-name="feedback" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="课程公告" name="announcement">
          <el-empty description="没有公告" style="height: 500px"></el-empty>
        </el-tab-pane>
        <el-tab-pane label="课程反馈" name="feedback">
<!--          <el-empty description="没有反馈" style="height: 500px"></el-empty>-->
          <div class="feedbackArea">
            <div class="feedbackText">
              <div v-for="item in feedback_list" class="feedback-item">
                <div style="width: 300px;float: left">
                  <div class="name"
                  >{{item.name}} {{item.student_ID}}</div>
                  <div class="number"
                  >{{item.submit_time}}</div>
                </div>

                <div class="feedback-content">{{item.content}}</div>
                <el-divider></el-divider>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Feedback",
  data(){
    return {
      input:'',
      feedback_list:[],
      course_ID: this.$route.params.course_id,
      teacher_ID:window.sessionStorage.getItem('account_ID'),

    }
  },
  methods:{
    handleClick(tab) {
      if (tab.index == 0) this.$router.push({ name: "announcements" });
      else if (tab.index == 1) this.$router.push({ name: "feedbacks" });
    },
  },
  mounted() {
    this.feedback_list.splice(0)
    var id=this.course_ID;
    // 获得所有的feedback
    this.$axios.get('/feedback/getAll',{
      params:{
        course_ID:id,
      },
      headers:{
        token: window.sessionStorage.getItem('token')
      },
    }).then((response)=>{
      console.log('feedback_list:');
      console.log(response.data);
      var noNameList = response.data
      for(let i=0; i<noNameList.length; i++){
        this.$axios.get('/student/get',{
          params:{
            student_ID:noNameList[i].student_ID,
          },
          headers:{
            token: window.sessionStorage.getItem('token')
          },
        }).then((response)=>{
          // console.log('student:');
          // console.log(response.data);
          var student_name=response.data.name
          var obj={
            student_ID:noNameList[i].student_ID,
            name:student_name,
            submit_time:noNameList[i].submit_time,
            content:noNameList[i].content,
          }
          this.feedback_list.push(obj)
        })
            .catch(() => {
              console.log('error')
            });
      }
    })
        .catch(() => {
        });
  }
};
</script>

<style scoped>
.feedbackTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.searchArea {
  position: relative;
  left: 50px;
  top: 20px;
  height: 60px;
}

.inputFeedbackName {
  width: 300px;
  margin-left: 40px;
}
.feedbackArea{
  width: 1250px;
  height: 500px;
  /*border:1px solid rgba(0,0,0,1);*/
  border-radius: 8px;
  margin:0;
  overflow: hidden;
}
.feedbackText{
  width: 1250px;
  height: 500px;
  margin-top: 20px;
  overflow: auto;
  padding-right: 70px;
}
.name{
  font-size: 19px;
  margin-bottom: 7px;
  padding-left: 40px;
  /*border: 1px solid #f60b0b;*/
}
.number{
  font-size: 17px;
  margin-bottom: 15px;
  padding-left: 40px;
  /*border: 1px solid #f60b0b;*/
}
.feedback-item{
  /*margin-bottom: 20px;*/
}
.feedback-content{
  width: 800px;
  /*float: left;*/
  /*border: 1px solid rgba(0,0,220,1);*/
  border-radius: 5px;
  padding: 15px 10px;
  margin-left: 300px;
  margin-right: 50px;
  font-size: 18px;
}
</style>
