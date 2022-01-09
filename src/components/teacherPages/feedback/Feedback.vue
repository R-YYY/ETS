<template>
  <div>
    <div>
      <el-input
          class="inputFeedbackName"
          v-model="input"
          placeholder="请输入反馈人姓名"
      >
      </el-input>
      <el-button>搜索</el-button>
    </div>
    <div>
      <el-tabs class="feedbackTab" active-name="feedback" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="课程公告" name="announcement">
        </el-tab-pane>
        <el-tab-pane label="课程反馈" name="feedback">
          <el-empty v-if="is_empty" description="没有反馈" style="height: 500px" v-loading="loading"></el-empty>
          <div v-if="!is_empty" class="feedbackArea" >
            <div v-for="item in feedback_list" class="feedback-item" v-loading="loading">
              <el-card class="feedback">
                <div slot="header" style="margin-left: 30px">
                  <span class="feedbackInfo"><b>反馈人：</b>{{ item.name }}</span>
                  <span class="feedbackInfo"><b>学号：</b>{{ item.student_ID }}</span>
                  <span class="feedbackInfo"><b>时间：</b>{{ item.submit_time }}</span>
                  <el-button type="danger" plain @click="openDelete(item)" v-if="isRes()">删除</el-button>
                </div>
                <div class="feedbackContent">
                  <p><b>反馈内容：</b>{{item.content}}</p>
                </div>
              </el-card>
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
      loading:true,
      input:'',
      feedback_list:[],
      course_ID: this.$route.params.course_id,
      teacher_ID:window.sessionStorage.getItem('account_ID'),
      is_empty:true,
    }
  },
  methods:{
    isAct(){
      return window.sessionStorage.getItem("is_active") === "1"
    },

    isRes(){
      let resTeacher_ID = window.sessionStorage.getItem("resTeacher_ID")
      let account_ID = window.sessionStorage.getItem("account_ID")
      return resTeacher_ID === account_ID
    },

    isTea(){
      let account_ID = window.sessionStorage.getItem("account_ID")
      return account_ID.length===5
    },

    openDelete(item){
      this.$confirm("此操作将从课程中删除该反馈, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteFeedback(item);
      }).catch();
    },

    deleteFeedback(item){
      let data = new FormData()
      data.append("course_ID",this.$route.params.course_id)
      data.append("student_ID",item.student_ID)
      data.append("submit_time",item.submit_time)
      data.append("content","")
      this.$axios({
        url:"/feedback/deleteFeedback",
        method:"post",
        data:data,
        headers:{
          token: window.sessionStorage.getItem('token')
        },
      }).then((response)=>{
        console.log(response.data)
        if(response.data === 1){
          this.feedback_list.splice(item,1)
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
        else{
          this.$message({
            type: "error",
            message: "删除失败，请重试！",
          });
        }
      }).catch(()=>{
        this.$message({
          type: "error",
          message: "删除失败，请重试！",
        });
      })
    },

    handleClick(tab) {
      if (tab.index == 0) this.$router.push({ name: "announcements" });
      else if (tab.index == 1) this.$router.push({ name: "feedbacks" });
    },
  },
  async mounted() {
    this.feedback_list.splice(0)
    var id=this.course_ID;
    // 获得所有的feedback
    await this.$axios.get('/feedback/getAll',{
      params:{
        course_ID:id,
      },
      headers:{
        token: window.sessionStorage.getItem('token')
      },
    }).then((response)=>{
      var noNameList = response.data
      if(noNameList.length>0){
        this.is_empty=false
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
          var student_name=response.data.name
          var obj={
            student_ID:noNameList[i].student_ID,
            name:student_name,
            submit_time:noNameList[i].submit_time,
            content:noNameList[i].content,
          }
          this.feedback_list.push(obj)
        }).catch(() => {});
      }
    }).catch();
    this.loading=false
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

.inputFeedbackName {
  width: 300px;
  margin-left: 40px;
}

.feedback{
  background-color: rgba(239, 248, 246, 0.27);
  margin: 30px 100px 50px 80px;
}

.feedbackInfo{
  margin-right: 120px;
}

.feedbackArea{
  height: 500px;
  overflow: auto;
}

.feedbackContent{
  margin-left: 30px;
}
</style>
