<template>
  <div>
    <el-empty v-if="is_empty" description="暂无实验项目成绩" style="height: 805px"></el-empty>
    <div id="shape2"></div>

    <el-table
        v-if="!is_empty"
        :data="project_scores"
        border
        style="width: 810px;margin: 10px auto;height: 330px;overflow: auto;font-size: 18px">
      <el-table-column
          prop="name"
          label="实验名称"
          width="400">
      </el-table-column>
      <el-table-column
          prop="score"
          label="分数"
          width="400">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ProjectGrade",
  data(){
    return{
      is_empty:true,
      project_scores:[],
    }
  },
  mounted() {
    let id=this.$route.params.course_id;
    let student_id=window.sessionStorage.getItem('account_ID')
    this.$axios.get('/score/getStuProScoreList',{
      params:{
        course_ID:id,
        student_ID:student_id,
      },
      headers:{
        token: window.sessionStorage.getItem('token')
      },
    }).then((response)=>{
      console.log('score/getStuProScoreList:');
      console.log(response.data);
      this.project_scores=response.data
      var list=response.data;
      if(list.length>0){
        this.is_empty=false
        var name_list=[];
        var score_list=[];
        for(var i=0; i<list.length; i++){
          name_list.push(list[i].name);
          score_list.push(list[i].score);
        }
        // console.log(name_list);
        console.log(score_list);
        // 基于准备好的dom，初始化echarts实例
        var projectChart = echarts.init(document.getElementById('shape2'),
            'infographic',{
          width: 870,
          height: 400
        });
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
            data: name_list,
            axisTick: {
              alignWithLabel: true
            },
            style:{
              fontSize:20
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: score_list,
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
    })
  }
}
</script>

<style scoped>
body{
  overflow: hidden;
}
#shape2{
  /*width: 550px;*/
  /*height: 440px;*/
  /*border: 1px solid black;*/
  /*box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.15), 0 6px 15px 0 rgba(0, 0, 0, 0.14);*/
  border-radius: 10px;
  margin:5px auto;
}
</style>