<template>
  <div id="TotalGrade">
    <div id="shape">
      
    </div>


  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "TotalGrade",
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('shape'));
    window.onresize = function() {
      myChart.resize();
    };
    myChart.setOption({
      title: {
        text: '课程成绩比例',
        // subtext: 'Fake Data',
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
          name: '比例（%）',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 10, name: '考勤' },
            { value: 90, name: '实验' },
          ],
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
        'rgba(255, 225, 159, 1)',
        'rgba(195, 172, 250, 1)',
      ]
    })
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
  width: 520px;
  height: 430px;
  /*border: 1px solid black;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 15px 0 rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  margin:5px auto;
  padding-top: 10px;
}
</style>