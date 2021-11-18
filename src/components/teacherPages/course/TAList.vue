<template>
  <div>
    <el-button class="addMember" type="primary" plain>添加助教</el-button>
    <div>
      <el-table class="memberTab" :data="taList" height="340px">
        <el-table-column prop="id" label="学号" width="250px"></el-table-column>
        <el-table-column prop="name" label="姓名" width="200px"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="400px"></el-table-column>
        <el-table-column  width="100px">
          <el-button type="danger" icon="el-icon-delete" circle plain></el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TAList",
  data(){
    const item = {
      id: '1111111',
      name: '王小虎',
      email: '1111111@tongji.edu.cn'
    };
    return {
      taList:Array(3).fill(item),
    }
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