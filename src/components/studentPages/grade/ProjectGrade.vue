<template>
  <div>
    <div id="shape2">

    </div>
<!--    <div class="projectCard" v-for="item in project_list">-->
<!--      <div>{{item.name}}</div>-->
<!--      <div>{{item.percentage}}</div>-->
<!--      <el-divider></el-divider>-->
<!--    </div>-->
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ProjectGrade",
  props:{
    course_id:{
      type: String,
      default: '',
    },
  },
  data(){
    return{
      project_list:[
        {
          name:'实验一',
          percentage:0.1,
          score:99,
        },
        {
          name:'实验二',
          percentage:0.1,
          score:85,
        }
      ],
    }
  },
  mounted() {
    var projects=['实验一', '实验二', '实验三', '实验四', '实验五', '实验六', '实验七'];
    var scores=[60, 98, 90, 86, 100, 89, 92];
    // 基于准备好的dom，初始化echarts实例
    var projectChart = echarts.init(document.getElementById('shape2'),'infographic');
    window.onresize = function() {
      projectChart.resize();
    };
    projectChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: projects,
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: scores,
          name: '分数',
          type: 'bar',
          barWidth: '60%',
          itemStyle:{
            color:'rgba(195, 172, 250, 1)',
          }
        }
      ],
    })
  }
}
</script>

<style scoped>
#shape2{
  width: 550px;
  height: 440px;
  /*border: 1px solid black;*/
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15), 0 6px 15px 0 rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  margin:5px auto;
}
</style>