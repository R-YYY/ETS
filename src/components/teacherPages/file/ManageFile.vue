<template>
  <div>
    <el-tabs class="fileTab" type="border-card">
      <el-container>
        <el-header>
          <div class="pathArea">
            <el-breadcrumb class="filePath" separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">
                <span>课程名？？</span>
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                <span>？？？？</span>
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                <span>？？？？</span>
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                <span>？？？？</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="searchArea">
            <el-input class="input" v-model="input" placeholder="请输入查找项目名称">
            </el-input>
            <el-button type="primary">搜索</el-button>
            <el-button type="primary">上传文件</el-button>
          </div>
        </el-header>
        <el-container>
          <el-aside class="fileTree">
            <p>文件树区域</p>
          </el-aside>
          <el-main class="fileList">
            <el-table :data="fileList" height="445px"
                      :row-style="{height: '35px'}" :cell-style="{padding: '0'}" >
              <el-table-column prop="name" label="文件名" width="300px">
              </el-table-column>
              <el-table-column prop="time" label="创建时间" width="250px">
              </el-table-column>
              <el-table-column width="50px">
                <el-button icon="el-icon-view" size="mini" circle>
                </el-button>
              </el-table-column>
              <el-table-column  width="50px">
                <el-button icon="el-icon-download" size="mini" circle >
                </el-button>
              </el-table-column>
              <el-table-column width="50px">
                <el-button icon="el-icon-delete" size="mini" circle>
                </el-button>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-container>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ManageFile",
  data(){
    const item = {
      name:'11111',
      time:'0000-00-00 00:00:00'
    };
    return {
      fileList:Array(3).fill(item)
    }
  }
}
</script>

<style scoped>
.fileTab{
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color:white;
}

.pathArea{
  position:relative;
  top: 20px;
}

.filePath{
  font-size: 17px;
}

.searchArea{
  position:relative;
  top: 40px;
}

.input{
  width: 300px;
}

.fileTree{
  position: relative;
  left:30px;
  top:50px;
}

.fileList{
  margin-top: 30px;
  margin-left: 130px;
}
</style>