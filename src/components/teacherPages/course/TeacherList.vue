<template>
  <div>
    <el-button class="addMember" type="primary" plain>添加老师</el-button>

    <el-dialog :visible.sync="dislogVisuable">

    </el-dialog>

    <div>
      <el-table class="memberTab" :data="teacherList" height="340px">
        <el-table-column class="id" prop="id" label="工号" width="250px"></el-table-column>
        <el-table-column class="name" prop="name" label="姓名" width="200px"></el-table-column>
        <el-table-column class="email" prop="email" label="邮箱" width="400px"></el-table-column>
        <el-table-column  width="100px">
          <el-button type="danger" icon="el-icon-delete" circle plain></el-button>
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
      dialogVisuable:'false'
    }
  },
  methods:{
  }
}
</script>

<style scoped>
.addMember{
  position: relative;
  left: 930px;
  top:5px;
}

.memberTab{
  left: 90px;
  width: 960px ;
  top: 5px;
}
</style>