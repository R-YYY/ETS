<template class="homeMain">
  <div id="feedback">
    <div>
      <el-input
          class="writeArea"
          type="textarea"
          :rows="2"
          placeholder="写反馈"
          v-model="textarea">
      </el-input>
      <el-button type="primary" class="feedbackButton">发表反馈</el-button>
      <el-divider></el-divider>
    </div>

    <div class="feedbackArea">

    </div>
  </div>
<!--  <el-tabs class="stuFeedbackTab"  v-model="activeName" @tab-click="handleClick">-->
<!--    <el-tab-pane label="全部" name="total" style="width: 200px">-->
<!--    </el-tab-pane>-->
<!--  </el-tabs>-->
</template>

<script>
export default {
  name: "StudentFeedback",
  data(){
    return{
      activeName:'total',
      textarea: '',
      feedback_list:[
        {
          student_ID:'1951014',
          name:'阿鸡',
          submit_time:'2021-12-13 22:10:14',
          content:'老师昨天布置的作业是什么呀？',
        }
      ],
    }
  },
  methods:{
    handleClick(){

    }
  }
}
</script>

<style scoped>
#feedback{
  height: 100%;
  margin-top: 30px;
  margin-left: 170px;
  margin-right: 20px;
  background-color: white;
  padding: 0px 38px;
}
.stuFeedbackTab{
  height: 100%;
  margin-top: 30px;
  margin-left: 170px;
  margin-right: 20px;
  background-color: white;
}
.writeArea{
  margin-top: 30px;
  width: 500px;
  margin-left: 20px;
  font-size: 18px;
  /*border-color: turquoise;*/
  /*font-family: "Microsoft Yi Baiti";*/
}
.feedbackButton{
  margin-left: 33px;
  height: 64px;
  font-size: 20px;
}
</style>