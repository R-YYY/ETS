<template>
  <div>
    <div>
      <el-input
          class="inputAnnouncementName"
          v-model="input"
          placeholder="请输入公告名称"
      >
      </el-input>
      <el-button type="primary" plain>搜索</el-button>
    </div>
    <div>
      <el-tabs class="announcementTab" active-name="announcement" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="课程公告" name="announcement">
          <div>
            <el-input
                class="writeArea"
                placeholder="公告名称"
                style="width: 500px"
                v-model="announcementName">
            </el-input>
            <el-input
                class="writeArea"
                type="textarea"
                :rows="2"
                placeholder="公告内容"
                v-model="myAnnouncement">
            </el-input>
            <el-button type="primary" class="feedbackButton" @click="sendAnnounce">发布公告</el-button>
            <el-divider></el-divider>
          </div>
          <el-empty v-if="is_empty" description="没有公告" style="height: 325px"></el-empty>
          <div v-if="!is_empty" class="feedbackArea">
            <div class="feedbackText">
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
        </el-tab-pane>
        <el-tab-pane label="课程反馈" name="feedback">
          <el-empty description="没有反馈" style="height: 500px"></el-empty>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "Announcement",
  data(){
    return{
      input:'',
      announcementName:'',
      myAnnouncement:'',
      announcement_list:[],
      course_ID: this.$route.params.course_id,
      teacher_ID:window.sessionStorage.getItem('account_ID'),
      is_empty:true,
    }
  },
  methods:{
    handleClick(tab) {
      if (tab.index == 0) this.$router.push({ name: "announcements" });
      else if (tab.index == 1) this.$router.push({ name: "feedbacks" });
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
    sendAnnounce(){
      if(this.announcementName==''){
        this.$message({
          type: "error",
          message: "公告名称不能为空！",
        });
        return
      }
      if(this.myAnnouncement==''){
        this.$message({
          type: "error",
          message: "公告内容不能为空！",
        });
        return
      }
      let data = new FormData();
      data.append("course_ID", this.course_ID);
      data.append("name",this.announcementName);
      data.append("content",this.myAnnouncement);
      data.append("teacher_ID", this.teacher_ID);
      data.append("release_time", this.getDateYYYYMMddHHMMSS());

      this.$axios({
        url: "announcement/addAnnouncement",
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
.announcementTab{
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}
.inputAnnouncementName {
  width: 300px;
  margin-left: 40px;
}
.feedbackButton{
  margin-left: 30px;
  font-size: 19px;
  margin-bottom: 10px;
}
.writeArea{
  margin-top: 10px;
  width: 900px;
  margin-left: 50px;
  font-size: 18px;
}
.feedbackArea{
  width: 1250px;
  height: 325px;
  /*border:1px solid rgba(0,0,0,1);*/
  border-radius: 8px;
  margin:0;
  overflow: hidden;
}
.feedbackText{
  width: 1250px;
  height: 325px;
  margin-top: 20px;
  overflow: auto;
  padding-right: 70px;
}
.header{
  font-size: 20px;
  margin-left: 90px;
  /*border: 1px solid red;*/
}
.name{
  font-size: 19px;
  margin-bottom: 5px;
  margin-left: 900px;
  /*border: 1px solid #f60b0b;*/
}
.number{
  font-size: 17px;
  margin-left: 20px;
  /*border: 1px solid #f60b0b;*/
}
.feedback-content{
  width: 950px;
  /*border: 1px solid rgba(0,0,220,1);*/
  border-radius: 5px;
  padding: 10px 10px;
  margin-left: 140px;
  /*margin-right: 50px;*/
  font-size: 18px;
}
</style>