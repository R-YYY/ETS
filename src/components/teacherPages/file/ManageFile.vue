<template>
  <div>
    <div>
      <el-input
          class="inputFileName"
          v-model="input"
          placeholder="请输入查找项目名称">
      </el-input>
      <el-button>搜索</el-button>
      <el-button>上传文件</el-button>
    </div>
    <div>
      <el-tabs class="fileTab" type="border-card">
        <el-tab-pane label="课程资料">
          <el-container style="height: 480px">
            <div>
              <div class="pathArea">
                <el-breadcrumb class="filePath" separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ name:'files' }">
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
              <div>
                <el-card class="fileTree"></el-card>
              </div>
            </div>
            <div class="fileList">
              <el-table
                  :data="fileList"
                  height="450px"
                  :row-style="{ height: '35px' }"
                  :cell-style="{ padding: '0' }">
                <el-table-column prop="name" label="文件名" width="300px">
                </el-table-column>
                <el-table-column prop="time" label="创建时间" width="250px">
                </el-table-column>
                <el-table-column width="50px">
                  <el-button icon="el-icon-view" size="mini" circle> </el-button>
                </el-table-column>
                <el-table-column width="50px">
                  <el-button icon="el-icon-download" size="mini" circle>
                  </el-button>
                </el-table-column>
                <el-table-column width="50px">
                  <el-button icon="el-icon-delete" size="mini" circle>
                  </el-button>
                </el-table-column>
              </el-table>
            </div>
          </el-container>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageFile",
  data() {
    const item = {
      name: "11111",
      time: "0000-00-00 00:00:00",
    };
    return {
      input:'',
      fileList: Array(3).fill(item),
    };
  },
};
</script>

<style scoped>
.fileTab {
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color: white;
}

.pathArea {
  margin-left: 30px;
}

.filePath {
  font-size: 17px;
}

.inputFileName {
  margin-left: 40px;
  width: 300px;
}

.fileTree {
  margin-top: 30px;
  margin-left: 25px;
  margin-right: 50px;
  width: 400px;
  height: 420px;
}

.fileList {
  margin-top: 30px;
  height: 430px;
}
</style>
