<template>
  <div id="feedback">
    <div>
      <el-container>
        <div>
          <el-input
              class="writeArea"
              type="textarea"
              :rows="5"
              resize="none"
              placeholder="请输入反馈内容"
              v-model="myFeedback">
          </el-input>
        </div>
        <div class="inputArea">
        <el-button type="primary" class="feedbackButton" @click="sendFeedback">发表反馈</el-button>
      </div>
      </el-container>
      <el-divider></el-divider>
    </div>
    <el-empty v-if="is_empty" description="没有反馈" style="height: 325px"></el-empty>
    <div v-if="!is_empty" class="feedbackArea">
      <div class="feedbackText">
        <div v-for="item in feedback_list">
          <el-card class="feedback">
            <div slot="header">
              <span class="feedbackInfo"><b>反馈人：</b>{{ item.name }}</span>
              <span class="feedbackInfo"><b>学号：</b>{{ item.student_ID }}</span>
              <span class="feedbackInfo"><b>时间：</b>{{ item.submit_time }}</span>
            </div>
            <div style="margin-left: 20px">
              <p><b>反馈内容：</b>{{item.content}}</p>
            </div>
          </el-card>
<!--          <div style="font-size: 19px;margin-bottom: 7px;padding-left: 40px"-->
<!--          >{{item.name}} {{item.student_ID}}</div>-->
<!--          <div style="margin-bottom: 15px;font-size: 17px;padding-left: 40px"-->
<!--          >{{item.submit_time}}</div>-->
<!--          <div class="feedback-content">{{item.content}}</div>-->
          <el-divider></el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Feedback",
  data(){
    return{
      myFeedback: '',
      feedback_list:[],
      course_ID: this.$route.params.course_id,
      student_ID:window.sessionStorage.getItem('account_ID'),
      is_empty:true,
    }
  },
  methods:{
    handleClick(){

    },
    getDateYYYYMMddHHMMSS() {
      const date = new Date();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const strDate = date.getDate().toString().padStart(2, "0");
      const starHours = date.getHours().toString().padStart(2, "0");
      const starMinutes = date.getMinutes().toString().padStart(2, "0");
      const starSeconds = date.getSeconds().toString().padStart(2, "0");
      return `${date.getFullYear()}-${month}-${strDate} ${starHours}:${starMinutes}:${starSeconds}`;
    },
    sendFeedback(){
      let data = new FormData();
      data.append("course_ID", this.course_ID);
      data.append("student_ID", this.student_ID);
      data.append("submit_time", this.getDateYYYYMMddHHMMSS());
      data.append("content",this.myFeedback);
      this.$axios({
        url: "feedback/addFeedback",
        method: "post",
        data: data,
        headers:{
          token: this.token
        }
      }).then((response) => {
        console.log('/add:'+response.data);
        if (response.data == 1) {
          this.$message({
            type: "success",
            message: "发布成功！",
          });
          location.reload();
        }
        else {
          this.$message({
            type: "error",
            message: "发布失败！请重试！",
          });
        }
      })
          .catch(() => {
            this.$message({
              type: "error",
              message: "发布失败！请重试！",
            });
          });
    }
  },
  mounted(){
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
      if(noNameList.length>0){
        this.is_empty=false;
      }
      for(let i=0; i<noNameList.length; i++){
        this.$axios.get('/student/get',{
          params:{
            student_ID:noNameList[i].student_ID,
          },
          headers:{
            token: window.sessionStorage.getItem('token')
          },
        }).then((response)=>{
          console.log('student:');
          console.log(response.data);
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
}
</script>

<style scoped>
#feedback{
  /*height: 630px;*/
  padding: 0px 38px;
  /*border: 1px solid red;*/
}
.feedbackButton{
  margin-left: 30px;
  font-size: 19px;
  margin-bottom: 10px;
}
.writeArea{
  margin-top: 10px;
  width: 500px;
  margin-left: 50px;
  font-size: 18px;
}
.feedbackArea{
  width: 818px;
  height: 600px;
  /*border:1px solid rgba(0,0,0,1);*/
  border-radius: 8px;
  margin:0;
  overflow: hidden;
}
.feedbackText{
  width: 800px;
  height: 580px;
  /*margin-left: 20px;*/
  margin-top: 10px;
  overflow: auto;
  padding-right: 70px;
}
.feedback-content{
  /*border: 1px solid rgba(220,220,220,1);*/
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 50px;
  margin-right: 50px;
  font-size: 18px;
}

.feedbackInfo{
  margin-left: 20px;
  margin-right: 60px;
}

.feedback{
  background-color: rgba(239, 248, 246, 0.27);
  margin: 0 50px 0 40px;
}

.inputArea{
  width: 200px;
  margin-top: 60px;
  margin-left: 10px;
}
</style>