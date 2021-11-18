<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  data() {
    return {

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