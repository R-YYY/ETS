<template>
  <div style="height: 400px;width: 1100px;overflow-y: scroll;overflow-x: hidden">
    <div class="searchProjectArea">
      <el-input class="input" v-model="input" placeholder="请输入查找项目名称"></el-input>
      <el-button type="primary">搜索</el-button>
    </div>
    <div style="position: relative;left:30px;top: 20px">
      <el-row>
        <el-col :span="8" v-for="item in projectList" :key="item.project_ID" :offest="1" >
          <div style="margin-top:25px">
            <el-card class="projectCard">
              <div slot="header">
                <span>项目名称:{{item.name}}</span>
              </div>
              <div class="projectCardInfo">
                <span>发布时间:{{ item.release_time }}</span>
                <p>截至时间:{{item.deadline}}</p>
                <p>发布人:{{item.teacher_ID}}</p><br>
              </div>
              <div>
                <el-button class="checkBtn">查看</el-button>
                <el-button class="delBtn" type="danger" plain>删除</el-button>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  data() {
    const project = {
      project_ID:'4202440101',
      name:'实验一',
      release_time:'2020-10-1',
      deadline:'2021-10-1',
      teacher_ID:'10100'
    };
    return {
      input:'',
      projectList: Array(7).fill(project)
    };
  }
}
</script>

<style scoped>
.searchProjectArea{
  position: relative;
  left: 30px;
  top: 15px;
}

.input{
  width: 250px;
}

.projectCard{
  height:280px;
  width: 300px;
}

.projectCardInfo{
  position: relative;
  top: 10px;
}

.checkBtn{
  position: relative;
  left: 30px;
}

.delBtn{
  position: relative;
  left: 60px;
}
</style>