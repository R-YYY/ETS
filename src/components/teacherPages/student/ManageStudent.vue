<template>
  <div>
    <el-tabs class="studentTab" type="border-card">
      <el-tab-pane class="optionPage" label="课程学生">
        <el-button class="addStudent" type="primary" plain>添加学生</el-button>
        <el-button class="addStudents" type="primary" plain>导出名单</el-button>
        <div>
          <el-table class="memberTable" :data="list" height="350px">
            <el-table-column prop="id" label="学号" width="200px"></el-table-column>
            <el-table-column prop="name" label="姓名" width="200px"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="350px"></el-table-column>
            <el-table-column width="100px">
              <el-button type="danger" icon="el-icon-delete" circle plain></el-button>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane class="optionPage" label="待审核">
        <div>
          <el-table class="memberTable" :data="waitList" height="390px">
            <el-table-column prop="id" label="学号" width="200px"></el-table-column>
            <el-table-column prop="name" label="姓名" width="150px"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="300px"></el-table-column>
            <el-table-column  width="100px">
              <el-button type="success" icon="el-icon-check" circle plain></el-button>
            </el-table-column>
            <el-table-column width="100px">
              <el-button type="danger" icon="el-icon-close" circle plain></el-button>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ManageStudent",
  data(){
    const item = {
      id: '1111111',
      name: '王小虎',
      email: '1111111@tongji.edu.cn'
    };
    return {
      list:Array(15).fill(item),
      waitList:Array(2).fill(item)
    }
  }
}
</script>

<style scoped>

.studentTab{
  height:480px;
  width: 1150px;
  position: relative;
  left: 70px;
  top:45px;
}

.optionPage{
  height: 450px;
}

.addStudent{
  position: relative;
  left: 770px;
  top:5px
}

.addStudents{
  position: relative;
  left: 790px;
  top:5px;
}

.memberTable{
  left: 90px;
  width: 960px ;
  top: 5px;
}

</style>