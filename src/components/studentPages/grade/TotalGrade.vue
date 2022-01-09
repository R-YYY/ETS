<template>
  <div id="shape3">

  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "TotalGrade",
  mounted() {
    let id=this.$route.params.course_id;
    let student_id=window.sessionStorage.getItem('account_ID')
    this.$axios.get('/score/getPartScore',{
      params:{
        course_ID:id,
        student_ID:student_id,
      },
      headers:{
        token: window.sessionStorage.getItem('token')
      },
    }).then((response)=>{
      console.log('begin');
      console.log(response.data);
      var t=response.data;
      let a_score=parseFloat(t.attend_score);
      let p_score=parseFloat(t.project_score);
      this.$axios.get(
          '/course/get',{
            params:{
              course_ID:id,
            },
            headers:{
              token: window.sessionStorage.getItem('token')
              // token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.e/yJhdWQiOiIxMjM0NTY3In0.rrlord8uupqmlJXvDW6Ha1sGfp5te8ICtSrlaDe1f6o",
            },
          }
      ).then((response)=>{
        let a_percentage=parseFloat(response.data.attend_percentage);
        a_score=a_score*a_percentage
        let p_percentage=1-a_percentage;
        p_score=p_score*p_percentage
        this.$axios.get('/score/getStuProScoreList',{
          params:{
            course_ID:id,
            student_ID:student_id,
          },
          headers:{
            token: window.sessionStorage.getItem('token')
          },
        }).then((response)=>{
          let project_number = response.data.length
          if(project_number>0){
            p_score=p_score/project_number
          }
          else{
            p_score=0
          }
          let total=a_score+p_score
          let remain=100-(a_score+p_score)
          a_score=a_score.toFixed(2)
          p_score=p_score.toFixed(2)
          // let remain=100-parseFloat(a_score)-parseFloat(p_score);
          remain=remain.toFixed(2)
          // let total= parseFloat(a_score + p_score);
          // let total=a_score.toFixed(2)+p_score.toFixed(2)
          total=total.toFixed(1)
          var data_list=[];
          if(a_score>=0){
            var obj={ value: a_score, name: '考勤分数 '+a_score };
            data_list.push(obj);
          }
          if(p_score>=0){
            var obj={ value: p_score, name: '实验分数 '+p_score };
            data_list.push(obj);
          }
          data_list.push({ value: remain, name: '未得分数 ' });
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('shape3'));
          window.onresize = function() {
            myChart.resize();
          };
          myChart.setOption({
            title: {
              text: '总成绩   ' + total,
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                // name: '比例（%）',
                type: 'pie',
                radius: '50%',
                data: data_list,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ],
            color:[
              'rgba(255, 218, 255, 1)',
              'rgba(195, 255, 255, 1)',
              'rgba(230, 230, 230, 1)',
              // 'rgba(255, 225, 159, 1)',
              // 'rgba(195, 172, 250, 1)',
            ]
          })
        })
      })
    })
  }
}
</script>

<style scoped>
#shape3{
  width: 550px;
  height: 440px;
  /*box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15), 0 6px 15px 0 rgba(0, 0, 0, 0.14);*/
  border-radius: 10px;
  margin:5px auto;
  padding-top: 10px;
}
</style>