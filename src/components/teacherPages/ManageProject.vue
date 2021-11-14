<template>
  <div>
    <el-tabs class="projectTab" type="border-card">
      <el-tab-pane class="optionPage" label="发布任务">
        <div>
          <el-container class="projectContainer">
            <el-aside>
              <el-card class="typeCard" shadow="hover">
                <i class="el-icon-s-cooperation"></i><br>
                <p class="type1">发布实验项目</p>
              </el-card>
            </el-aside>
            <el-aside style="position: relative;left: 100px">
              <el-card class="typeCard" shadow="hover">
                <i class="el-icon-user-solid"></i><br>
                <p class="type2">发布课程考勤</p>
              </el-card>
            </el-aside>
          </el-container>
        </div>
      </el-tab-pane>

      <el-tab-pane class="optionPage" label="实验项目">
        <div class="searchProjectArea">
          <el-input class="input" v-model="input" placeholder="请输入查找项目名称"></el-input>
          <el-button type="primary">搜索</el-button>
        </div>
        <div>
          <el-row style="position: relative;left:30px;top: 50px">
            <el-col :span="8" v-for="(o, index) in 3">
              <el-card class="projectCard">
                <div slot="header">
                  <span>项目名称:？？</span>
                </div>
                <div class="projectCardInfo">
                  <span>发布时间:？？</span>
                  <p>截至时间:？？</p>
                  <p>发布人:？？</p><br>
                </div>
                <div>
                  <el-button class="checkBtn">查看</el-button>
                  <el-button class="delBtn" type="danger" plain>删除</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>

      <el-tab-pane class="optionPage" label="课程考勤">
        <div class="attendTable">
        <el-table :data="attendList" height="340px">
          <el-table-column prop="id" label="考勤编号" width="300px"></el-table-column>
          <el-table-column prop="time" label="考勤时间" sortable></el-table-column>
          <el-table-column width="150px">
            <el-button @click="drawer = true" plain>查看</el-button>
          </el-table-column>
        </el-table>
        </div>
        <div>
        <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :direction="direction">
          <span>我来啦!</span>
        </el-drawer>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ManageProject",
  data() {
    const item = {
      id: '1111111',
      time: '0000-00-00 00:00:00',
      input: ''
    };
    return {
      drawer: false,
      direction: 'ltr',
      attendList:Array(15).fill(item),
    };
  }
}
</script>

<style scoped>
.projectTab{
  height:480px;
  width: 1150px;
  position: relative;
  left: 70px;
  top:45px;
}

.optionPage{
  height: 450px;
}

.projectContainer{
  height: 450px;
  width: 800px;
  position: relative;
  left: 220px;
  top:50px
}

.el-icon-s-cooperation{
  font-size: 180px;
  position: relative;
  left: 30px;
}

.el-icon-user-solid{
  font-size: 180px;
  position: relative;
  left: 30px;
}

.type1{
  font-size: 25px;
  position: relative;
  left: 50px;
}

.type2{
  font-size: 25px;
  position: relative;
  left: 50px;
}

.typeCard{
  border-width: 2px;
}

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

.attendTable{
  position: relative;
  left: 80px;
  top:25px;
  width: 960px;
}
</style>