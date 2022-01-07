<template>
  <div>
    <div>
      <el-input class="inputProject" placeholder="请输入学生姓名"></el-input>
      <el-button>搜索</el-button>
      <el-button>导出成绩</el-button>
      <el-button @click="showGrade" type="primary">设置成绩权重</el-button>
      <el-drawer
          title="设置课程的成绩占比"
          :visible.sync="drawer"
          :direction="direction"
          style="font-size: 25px"
          >
        <div style="padding-left: 50px;font-size: 23px;margin-bottom: 40px;margin-top: 30px">
          考勤占比：
          <el-input
              placeholder="请输入内容"
              suffix-icon="el-icon-edit"
              v-model="attend_percentage"
          style="width: 100px;margin-left: 46px"></el-input>
        </div>
        <div style="padding-left: 50px;font-size: 23px">
          实验项目占比：
          <el-input
              placeholder="请输入内容"
              suffix-icon="el-icon-edit"
              v-model="project_percentage"
              style="width: 100px"></el-input>
        </div>
        <div style="padding-left: 130px;margin-top: 50px">
          <el-button type="primary" style="font-size: 19px;width: 130px"
          @click="setPercentage">确认</el-button>
        </div>
      </el-drawer>
    </div>
    <div>
      <el-tabs
        class="gradeTab"
        active-name="total"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="总成绩" name="total">
          <div style="height: 500px">
            <el-table
              :data="totalGradeList"
              class="totalGradeTable"
              height="500px"
              :row-style="{ height: '50px' }"
              :cell-style="{ padding: '0' }"
            >
              <el-table-column
                prop="student_ID"
                label="学号"
                width="180px"
                sortable
              ></el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="180px"
                sortable
              ></el-table-column>
              <el-table-column
                prop="project_score"
                label="实验成绩"
                width="190px"
                sortable
              ></el-table-column>
              <el-table-column
                prop="attend_score"
                label="考勤成绩"
                width="190px"
                sortable
              ></el-table-column>
              <el-table-column
                prop="total_score"
                label="总成绩"
                width="190px"
                sortable
              ></el-table-column>
              <el-table-column width="140px">
                <template slot-scope="scope">
                  <el-button type="text" @click="scoreInfo(scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="单项成绩" name="part"></el-tab-pane>
        <el-dialog
            :title="stuName + '的成绩详情'"
            :visible.sync="scoreVisible">
          <el-table class="totalTable"
                    :data="stuScore[0]"
                    border
                    show-summary
                    :summary-method="totalScore1">
            <el-table-column label="实验名称" prop="name"></el-table-column>
            <el-table-column label="分数" align="center">
              <template slot-scope="scope"><span>{{scope.row.score === null?'0/100':scope.row.score+'/100'}}</span></template>
            </el-table-column>
          </el-table>
          <el-table class="totalTable"
                    :data="stuScore[1]"
                    border
                    show-summary
                    :summary-method="totalScore2">
            <el-table-column label="考勤时间" prop="name"></el-table-column>
            <el-table-column label="分数" align="center">
              <template slot-scope="scope"><span>{{scope.row.score === null?'0/1':'1/1'}}</span></template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageGrade",
  data() {
    return {
      totalGradeList: [],
      scoreVisible:false,
      stuScore:[{
        name:"",
        score:""
      },{
        name:"",
        score:""
      }],
      stuName:"",
      drawer: false,
      direction: 'ltr',
      attend_percentage:0.1,
      project_percentage:0.9,
    };
  },
  methods: {
    handleClick(tab) {
      if (tab.index == 0) this.$router.push({ name: "totalGrades" });
      else if (tab.index == 1) this.$router.push({ name: "partGrades" });
    },
    showGrade(){
      this.drawer=true
      var id = this.$route.params.course_id
      // console.log(id)
      this.$axios.get(
          '/course/get',{
            params:{
              course_ID:id,
            },
            headers:{
              token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
            }
          }
      ).then((response)=>{
        var course = response.data;
        console.log(course)
        this.attend_percentage=course.attend_percentage
        this.project_percentage=course.project_percentage
      })
    },
    setPercentage(){
      var id = this.$route.params.course_id
      let attend = parseFloat(this.attend_percentage)
      let project = parseFloat(this.project_percentage)
      let sum = attend + project
      if(0 > attend || attend > 1 || project<0 || project>1 || sum!=1){
        this.$message.error('输入的权重有误！请重新设置权重！')
      }
      else{
        this.$axios(
            '/course/setGrade',{
              params:{
                course_ID:id,
                attend_percentage:this.attend_percentage,
                project_percentage:this.project_percentage,
              },
              headers:{
                token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
              },
              method: "post",
            }
        ).then((response)=>{
          if(response.data=='1'){
            this.$message({
              type: "success",
              message: "设置成功！",
            });
            this.drawer=false
          }
          else{
            this.$message({
              type: "error",
              message: "设置失败！",
            });
          }
        }).catch(function (error){
          this.$message({
            type: "error",
            message: "设置失败！",
          });
        })
      }
    },
    totalScore1(param){
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总分';
        }
        else{
          let total = 0
          for (let i = 0; i < this.stuScore[0].length; i++) {
            total += this.stuScore[0][i].score === null?0:parseInt(this.stuScore[0][i].score)
          }
          sums[index] = total
        }
      });
      return sums;
    },

    totalScore2(param){
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总分';
        }
        else{
          let total = 0
          for (let i = 0; i < this.stuScore[1].length; i++) {
            total += this.stuScore[1][i].score === null?0:1
          }
          sums[index] = total
        }
      });
      return sums;
    },

    scoreInfo(row){
      this.stuName = row.name
      this.scoreVisible=true
      this.$axios({
        url:"/score/getStuTotalScore",
        method:"get",
        params:{
          course_ID:this.$route.params.course_id,
          student_ID:row.student_ID
        },
        headers: {
          token:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
        },
      }).then((response)=>{
        console.log(response.data)
        this.stuScore = response.data
      })
    }
  },
  mounted() {
    this.$axios({
      url: "/score/getTotalScoreList",
      method: "get",
      params: {
        course_ID: this.$route.params.course_id,
      },
      headers: {
        token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
      },
    })
      .then((response) => {
        console.log('start')
        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
          this.totalGradeList.push({
            student_ID: response.data[i].student_ID,
            name: response.data[i].name,
            project_score: response.data[i].project_score,
            attend_score: response.data[i].attend_score,
            total_score:
              response.data[i].project_score + response.data[i].attend_score,
          });
        }
      })
      .catch();
  },
};
</script>

<style scoped>
.gradeTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.inputProject {
  width: 300px;
  margin-left: 40px;
}

.totalGradeTable {
  width: 90%;
  margin-left: 70px;
}

.totalTable{
  width: 600px;
  margin-left: 50px;
  margin-bottom: 50px;
}
</style>
