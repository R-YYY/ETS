<template>
  <div>
    <el-button class="btn" type="primary" plain @click="add">
      <span>添加老师</span>
    </el-button>
    <div>
      <el-table class="memberTab" :data="teacherList" height="470px">
        <el-table-column class="id" prop="id" label="工号" width="270px" >
        </el-table-column>
        <el-table-column class="name" prop="name" label="姓名" width="270px">
        </el-table-column>
        <el-table-column class="email" prop="email" label="邮箱" width="400px">
        </el-table-column>
        <el-table-column  width="100px">
          <el-button type="danger" icon="el-icon-delete" circle plain @click="open">
          </el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeacherList",
  data(){
    const item = {
      id: '1111111',
      name: '王小虎',
      email: '1111111@tongji.edu.cn'
    };
    return {
      teacherList:Array(3).fill(item),
      dialogVisible:false,
      addTeacherID:''
    }
  },
  methods:{
    open() {
      this.$confirm('此操作将从课程中删除该老师, 是否继续?', '提示', {
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
      this.$prompt('请输入添加老师的工号', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern:/^\d\d\d\d\d$/,
        inputErrorMessage: '工号格式不正确',
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '添加成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消添加'
        });
      });
    }
  }
}
</script>

<style scoped>
.btn{
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 70px;
}

.memberTab{
  width: 1060px;
  margin-left: 70px;
  margin-top: 0;
}
</style>