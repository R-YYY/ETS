<template>
  <div>
    <div>
      <el-input
          class="inputFeedbackName"
          v-model="search_keyword"
          placeholder="请输入反馈人姓名"
      >
      </el-input>
      <el-button type="primary" plain>搜索</el-button>
    </div>
    <div>
      <el-tabs class="feedbackTab" type="border-card">
        <el-tab-pane label="课程反馈">

          <el-empty v-if="is_empty"
              description="没有反馈" style="height: 500px"></el-empty>
          <div v-if="!is_empty">
            haha
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
    return{
      is_empty:true,
      search_keyword:'',
      feedback_list:[],
      course_ID: this.$route.params.course_id,

    }
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
</style>
