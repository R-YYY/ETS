<template>
  <div>
    <div>
      <el-input
          class="inputAnnouncementName"
          v-model="input"
          placeholder="请输入公告名称"
      >
      </el-input>
      <el-button>搜索</el-button>
    </div>
    <div>
      <el-tabs class="announcementTab" active-name="announcement" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="课程公告" name="announcement">
          <el-container>
            <div class="inputArea">
              <div class="input">
                <p><b>公告名称：</b></p>
                <el-input
                    placeholder="请输入公告名称"
                    v-model="announcementName">
                </el-input>
              </div>
              <div class="input">
                <p><b>公告内容：</b></p>
                <el-input
                    resize="none"
                    type="textarea"
                    :rows="10"
                    placeholder="请输入公告内容"
                    v-model="myAnnouncement">
                </el-input>
              </div>
              <el-button class="inputBtn" type="primary" @click="sendAnnounce">发布公告</el-button>
            </div>
            <el-empty v-if="is_empty"
                      description="没有公告"
                      style="width:55%;height: 500px"
                      v-loading="loading">
            </el-empty>
            <div v-if="!is_empty" class="announcementArea">
              <h2 style="margin-left: 30px">历史公告</h2>
              <div v-for="item in announcement_list" v-loading="loading">
                <el-card class="announcement">
                  <div slot="header" style="margin-left: 10px">
                    <span class="title"><b>公告名称：</b>{{ item.name }}</span>
                    <el-button
                        type="danger"
                        style="margin-left: 250px"
                        size="small" plain
                        @click="openDelete(item)" v-if="isRes()">删除</el-button>
                    <br><br>
                    <span class="info"><b>发布时间：</b>{{ item.release_time }}</span>
                    <span class="info"><b>发布教师：</b>{{ item.teacher_name }}</span>
                  </div>
                  <div class="announcementContent">
                    <p><b>公告内容：</b>{{item.content}}</p>
                  </div>
                </el-card>
              </div>
            </div>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="课程反馈" name="feedback">
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
      loading:true,
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
      this.$confirm("此操作将从课程中删除该公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteAnnouncement(item);
      }).catch();
    },

    deleteAnnouncement(item){
      let data = new FormData()
      data.append("course_ID",this.$route.params.course_id)
      data.append("name",item.name)
      data.append("teacher_ID",item.teacher_ID)
      data.append("content","")
      data.append("release_time",item.release_time)
      this.$axios({
        url:"announcement/delete",
        method:"post",
        data:data,
        headers:{
          token: window.sessionStorage.getItem('token')
        },
      }).then((response)=>{
        console.log(response.data)
        if(response.data === 1){
          this.announcement_list.splice(item,1)
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
      data.append("teacher_ID", this.teacher_ID);
      data.append("content",this.myAnnouncement);
      data.append("release_time", this.getDateYYYYMMddHHMMSS());
      console.log(this.course_ID)
      console.log(this.announcementName)
      console.log(this.teacher_ID)
      console.log(this.myAnnouncement)
      console.log(this.getDateYYYYMMddHHMMSS())
      console.log(window.sessionStorage.getItem('token'))
      this.$axios({
        url: "announcement/addAnnouncement",
        method: "post",
        data: data,
        headers:{
          token: window.sessionStorage.getItem('token')
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
  async mounted() {
    this.announcement_list.splice(0)
    var id=this.course_ID;
    // 获得所有的announcement
    await this.$axios.get('/announcement/getAll',{
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
        }).catch(() => {
          console.log('error')
        });
      }
    }).catch();
    this.loading=false
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

.announcementContent{
  margin-left: 10px;
}

.title{
  font-size: 21px;
}

.info{
  font-size: 14px;
  margin-right: 50px;
}

.announcement{
  background-color: rgba(239, 248, 246, 0.27);
  margin: 20px 70px 40px 30px;
}

.announcementArea{
  height: 500px;
  width: 55%;
  overflow: auto;
}

.input{
  margin-left: 10%;
  margin-top: 30px;
  margin-bottom: 40px;
  width:80%;
}

.inputBtn{
  margin-left: 40%;
}

.inputArea{
  width: 45%;
}
</style>