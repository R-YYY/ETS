<template>
  <div>
    <el-tabs class="studentTab" type="border-card">
      <el-tab-pane label="课程学生">
        <el-button class="addStudent" type="primary" plain @click="add">
          <span>添加学生</span>
        </el-button>
        <el-button type="primary" plain>
          <span>导出名单</span>
        </el-button>
        <div>
          <el-table class="memberTable" :data="list" height="470px">
            <el-table-column prop="id" label="学号" width="250px">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="250px">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="420px">
            </el-table-column>
            <el-table-column width="120px">
              <el-button type="danger" icon="el-icon-delete" circle plain @click="open">
              </el-button>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane class="optionPage" label="待审核">
        <div>
          <el-table class="memberTable" :data="waitList" height="530px">
            <el-table-column prop="id" label="学号" width="240px">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="240px">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="380px">
            </el-table-column>
            <el-table-column  width="90px">
              <el-button type="success" icon="el-icon-check" circle plain>
              </el-button>
            </el-table-column>
            <el-table-column width="90px">
              <el-button type="danger" icon="el-icon-close" circle plain>
              </el-button>
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
      waitList:Array(12).fill(item),
      dialogVisible:false,
      addStudentID:''
    }
  },
  methods:{
    open() {
      this.$confirm('此操作将从课程中删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    add() {
      this.$prompt('请输入添加学生的学号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:'',
        inputErrorMessage: '学号格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的邮箱是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    }
  }
}
</script>

<style scoped>

.studentTab{
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color:white;
}

.addStudent{
  position: relative;
  margin-top: 10px;
  margin-left: 70px;
  margin-right: 50px;
}

.memberTable{
  width: 1060px;
  margin-left: 70px;
  margin-top: 10px;
}

</style>