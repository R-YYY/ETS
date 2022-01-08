<template>
  <div id="report">
    <div>
      <div class="top" style="padding-right: 200px">
        <div class="title">{{project_name}}</div>
        <div class="end_time">截止时间 : {{project.end_time}}</div>
        <div v-if="is_corrected" class="score" style="color: #f60b0b">得分：{{report.score}}</div>
        <div class="score">学生学号：{{student_ID}}</div>
        <div class="score">学生姓名：{{student_name}}</div>
      </div>

      <div class="model-report">
        <div class="model-text">
          <div class="item">
            <div class="item-title">实验目的：</div>
            <!--          <textarea rows="5" cols="108" id="purpose" name="message"></textarea>-->
            <el-input
                name="input"
                type="textarea"
                :autosize="{minRows:5}"
                placeholder=""
                v-model="purpose"
                disabled
                maxlength="1000"
                show-word-limit style="font-size: 19px">
            </el-input>
          </div>
          <div class="item">
            <div class="item-title">实验原理：</div>
            <!--        <textarea rows="5" cols="108" id="principle" name="message"></textarea>-->
            <el-input
                name="input"
                disabled
                type="textarea"
                :autosize="{minRows:5}"
                placeholder=""
                v-model="principle"
                maxlength="1000"
                show-word-limit style="font-size: 19px">
            </el-input>
          </div>
          <div class="item">
            <div class="item-title">实验设备：</div>
            <!--        <textarea rows="5" cols="108" id="device" name="message"></textarea>-->
            <el-input
                name="input"
                disabled
                type="textarea"
                :autosize="{minRows:5}"
                placeholder=""
                v-model="device"
                maxlength="1000"
                show-word-limit style="font-size: 19px">
            </el-input>
          </div>
          <div class="item">
            <div class="item-title">实验步骤：</div>
            <!--        <textarea rows="5" cols="108" id="content" name="message"></textarea>-->
            <el-input
                name="input"
                type="textarea"
                disabled
                :autosize="{minRows:5}"
                placeholder=""
                v-model="steps"
                maxlength="3000"
                show-word-limit style="font-size: 19px">
            </el-input>
          </div>
          <div class="item">
            <div class="item-title">实验结论：</div>
            <!--        <textarea rows="5" cols="108" id="summary" name="message"></textarea>-->
            <el-input
                name="input"
                type="textarea"
                disabled
                :autosize="{minRows:5}"
                placeholder=""
                v-model="conclusion"
                maxlength="1000"
                show-word-limit style="font-size: 19px">
            </el-input>
          </div>
          <div class="button-area">
            分数：
            <el-input
                name="input"
                placeholder="请输入分数"
                v-model="report.score"
                :disabled="is_expired?false:true"
                style="font-size: 15px;width: 115px;">
            </el-input>
            <el-button type="primary" class="submit-button" style="font-size: 18px;margin-left: 50px"
                       :disabled="is_expired?false:true"
                       @click="submitIt"
            >确认提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Report",
  data(){
    return{
      course_ID: this.$route.query.course_ID,
      student_ID: this.$route.query.student_ID,
      student_name: this.$route.query.student_name,
      project_name: this.$route.query.name,
      token:this.$route.query.token,
      project : {},
      is_corrected:false,
      is_expired:true,
      purpose:'',
      principle:'',
      device:'',
      steps:'',
      conclusion:'',
      report:{},
    };
  },
  methods:{
    getReport(){
      // 获取实验报告
      this.$axios.get(
          '/report/get',{
            params:{
              course_ID: this.course_ID,
              project_name: this.project_name,
              student_ID: this.student_ID,
            },
            headers:{
              token: this.token
            }
          })
          .then((response)=>{
            this.report=response.data
            // 没提交，返回-1
            if(this.report == null){
            }
            else{
              if(this.report.correct_time!=null){
                this.is_corrected = true
              }
            }
          });
    },
    submitIt(){
      if(this.is_expired){
        let grade = parseInt(this.report.score)
        if(grade < 0 || grade > 100){
          this.$message({
            type: "error",
            message: "输入的分数不合理！请重新输入！",
          });
        }
        else{
          // window.alert(grade)
          let data = new FormData();
          data.append("course_ID", this.course_ID);
          data.append("project_name", this.project.name);
          data.append("student_ID", this.student_ID);
          data.append("score", this.report.score);
          this.$axios({
            url: "/report/correct",
            method: "post",
            data: data,
            headers: {
              token: this.token
            },
          })
              .then((response) => {
                console.log(response.data)
                if (response.data == 1) {
                  this.$message({
                    type: "success",
                    message: "批改成功！",
                  });
                  this.is_corrected = true;
                } else {
                  this.$message({
                    type: "error",
                    message: "批改失败！请重试！",
                  });
                }
              })
              .catch(() => {
                this.$message({
                  type: "error",
                  message: "批改失败！请重试！",
                });
              });
        }
      }
      else{
        window.alert('not ddl')
      }
    },
    submitAnswer(){
      let data = new FormData();
      data.append("course_ID", this.course_ID);
      data.append("student_ID", this.student_ID);
      data.append("project_name", this.project.name);
      data.append("purpose",this.purpose);
      data.append("principle",this.principle);
      data.append("device",this.device);
      data.append("steps",this.steps);
      data.append("conclusion",this.conclusion);
      this.$axios({
        url: "report/upload",
        method: "post",
        data: data,
        headers:{
          token: this.token
        }
      }).then((response) => {
        console.log(response.data);
        if (response.data === 1) {
          this.$message({
            type: "success",
            message: "批改成功！",
          });
          location.reload();
        }
        else {
          this.$message({
            type: "error",
            message: "操作失败！请重试！",
          });
        }
      })
          .catch(() => {
            this.$message({
              type: "error",
              message: "操作失败！请重试！",
            });
          });
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
  },
  mounted() {
    // 根据课程ID和实验名称获取实验项目
    this.$axios.get(
        'project/get',{
          params:{
            course_ID: this.course_ID,
            name: this.project_name,
          },
          headers:{
            token: this.token
          }
        })
        .then((response)=>{
          this.project = response.data;
          if(this.project.correct_time!=null){
            this.is_corrected=true
          }
          if(this.project.end_time>this.getDateYYYYMMddHHMMSS()){
            this.$message({
              showClose: true,
              message: '未到截止时间，您暂时不能批改实验报告！',
              type: 'error'
            });
            this.is_expired=false
          }
          console.log('start'+this.is_expired)
        });
    this.getReport()
    // 获取模板实验报告内容
    let data = new FormData();
    data.append("course_ID", this.course_ID);
    data.append("student_ID", this.student_ID);
    data.append("project_name", this.project_name);
    console.log(this.project_name)
    // 获取实验报告
    this.$axios({
      url: "report/getContent",
      method: "post",
      data: data,
      headers:{
        token: this.token
      }
    })
        .then((response)=>{
          console.log('report/getContent')
          console.log(response.data);
          var content=response.data
          console.log(content.isSubmit)
          if(content.isSubmit=='1'){
            this.purpose=content.purpose
            this.principle=content.principle
            this.device=content.device
            this.steps=content.steps
            this.conclusion=content.conclusion
          }
          else{
            //要删的！！！！！！！
          }
        });
  },
}
</script>

<style scoped>
#report{
  width: 1350px;
  height: 1300px;
  /*overflow: hidden;*/
  margin-top: 25px;
  margin-left: 210px;
  margin-right: 20px;
  padding:5px 10px;
  /*border: 2px solid rgba(0,0,200,0.5);*/
  border-radius: 5px;
}
.contents{
  width: 1200px;
  height: 600px;
  overflow: auto;
  padding-right: 200px;
}
.backButton{
  margin-left: 60px;
  margin-top: 15px;
  float: left;
}
.title{
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
}
.end_time{
  float: right;
  margin-right: 75px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
  font-family: "Microsoft YaHei UI Light";
}
.score{
  margin-left: 75px;
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 21px;
  display: block;
}
.description{
  width: 90%;
  margin: 40px auto;
}
.fileName{
  margin-bottom: 10px;
  margin-left: 30px;
  color: rgba(11,159,250,1);
  cursor: context-menu;
}
.fileName:hover{
  color: rgba(0,0,250,0.6);
}
a:hover{
  text-decoration: none;
}
.model-report{
  /*border: 1px solid red;*/
  width: 1300px;
  height: 500px;
  padding-bottom: 140px;
  overflow: hidden;
}
.model-text{
  width: 1200px;
  height: 600px;
  padding-right: 300px;
  /*border: 1px solid pink;*/
  overflow: auto;
}
.item{
  margin: 20px 0 0px 0;
}
.item-title{
  font-size: 23px;
  margin-bottom: 10px;
}
.submit-button{
  width: 110px;
  height: 41px;
  background-color: #18cfc9;
  border-radius: 5px;
  border: none;
  margin-left: 10px;
  margin-right: 50px;
}
.button-area{
  padding: 40px 200px 120px 399px;
  font-size: 20px;
}

</style>