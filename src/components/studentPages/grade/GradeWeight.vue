<template>
  <div id="TotalGrade">
    <div id="shape">
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "GradeWeight",
  data(){
    return{

    }
  },
  mounted() {
    let id=this.$route.params.course_id;
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
      var a_percentage=100*response.data.attend_percentage;
      let p_percentage=100-a_percentage;
      // console.log(p_percentage);
      var myChart = echarts.init(document.getElementById('shape'));
      window.onresize = function() {
        myChart.resize();
      };
      myChart.setOption({
        title: {
          text: '课程成绩比例',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '比例（%）',
            type: 'pie',
            radius: '50%',
            data: [
              { value: a_percentage, name: '考勤',},
              { value: p_percentage, name: '实验' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              }
            }
          }
        ],
        color:[
          'rgba(255, 218, 255, 1)',
          'rgba(195, 255, 255, 1)',
          'rgba(255, 225, 159, 1)',
          'rgba(195, 172, 250, 1)',
        ]
      })
    });
  },
  methods:{
  }
}
</script>

<style scoped>
#TotalGrade{
  height: 100%;
  margin-left: 30px;
  margin-right: 20px;
  background-color: white;
}
#shape{
  width: 550px;
  height: 440px;
  /*border: 1px solid black;*/
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 15px 0 rgba(0, 0, 0, 0.14);*/
  border-radius: 10px;
  margin:5px auto;
  padding-top: 10px;
}
</style>