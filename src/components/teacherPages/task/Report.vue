<template>
  <div id="report">
    <div class="reportArea" align="center">
      <div class="item">
        <p class="title">实验目的</p>
        <el-input
            name="input"
            type="textarea"
            :autosize="{minRows:3}"
            placeholder=""
            v-model="purpose"
            disabled
            maxlength="1000"
            show-word-limit style="font-size: 19px">
        </el-input>
      </div>
      <div class="item">
        <p class="title">实验原理</p>
        <el-input
            name="input"
            type="textarea"
            :autosize="{minRows:5}"
            placeholder=""
            v-model="principle"
            disabled
            maxlength="1000"
            show-word-limit style="font-size: 19px">
        </el-input>
      </div>
      <div class="item">
        <p class="title">实验设备</p>
        <el-input
            name="input"
            type="textarea"
            :autosize="{minRows:5}"
            placeholder=""
            v-model="device"
            disabled
            maxlength="1000"
            show-word-limit style="font-size: 19px">
        </el-input>
      </div>
      <div class="item">
        <p class="title">实验步骤</p>
        <el-input
            name="input"
            type="textarea"
            :autosize="{minRows:10}"
            placeholder=""
            v-model="steps"
            disabled
            maxlength="1000"
            show-word-limit style="font-size: 19px">
        </el-input>
      </div>
      <div class="item">
        <p class="title">实验结论</p>
        <el-input
            name="input"
            type="textarea"
            :autosize="{minRows:5}"
            placeholder=""
            v-model="conclusion"
            disabled
            maxlength="1000"
            show-word-limit
            style="margin-bottom:80px;font-size: 19px">
        </el-input>
      </div>
    </div>

    <el-card class="studentInfo" >
      <div slot="header" align="center">
        <p class="title"><b>{{project_name}}</b></p>
        <span>截止时间 : {{project.end_time}}</span>
      </div>
      <div style="margin-left: 30px">
        <p>学生学号：{{student_ID}}</p>
        <p>学生姓名：{{student_name}}</p>
        <p>成绩：{{report.score}}</p>
        <el-input placeholder="请输入分数" v-model="newScore" style="width: 110px;margin-right: 20px"></el-input>
        <el-button type="primary" @click="submitIt">评分</el-button>
      </div>
    </el-card>
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
      newScore:"",
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
            this.report = response.data
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
          data.append("score", this.newScore);
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
                  this.report.score = this.newScore
                  this.newScore = ""
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
  width: 100%;
  height: 120%;
}

.studentInfo{
  position: absolute;
  top: 25%;
  right: 7%;
  width: 20%;
  height: 50%;
}

.reportArea{
  height: 100%;
  width: 75%;
}

.title{
  text-align: center;
  font-size: 25px;
  /*font-weight: bold;*/
  margin-top: 10px;
}

a:hover{
  text-decoration: none;
}

.item{
  margin-top: 50px;
  margin-left: 130px;
  margin-right: 130px;
}

</style>