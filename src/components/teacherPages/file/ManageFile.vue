<template>
  <div>
    <div>
      <el-input
        class="inputFileName"
        v-model="input"
        placeholder="请输入查找文件名称"
      >
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
                <el-breadcrumb
                  class="filePath"
                  separator-class="el-icon-arrow-right"
                >
                  <el-breadcrumb-item :to="{ name: 'files' }">
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
                <!--文件树区域-->
                <el-card class="fileTree" shadow="never">
                  <el-tree
                    :data="totalFiles"
                    default-expand-all
                    :expand-on-click-node="false"
                    @node-click="showFiles"
                  >
                    <!--树节点-->
                    <span class="treeNode" slot-scope="{ node, data }">
                      <span class="fileName"
                        ><i class="el-icon-folder-opened"></i
                        >{{ node.label }}</span
                      >
                    </span>
                  </el-tree>
                </el-card>
              </div>
            </div>
            <div class="fileList">
              <el-table
                :data="fileList"
                height="450px"
                :row-style="{ height: '50px' }"
                :cell-style="{ padding: '0' }"
              >
                <el-table-column prop="file_name" label="文件名" width="250px">
                </el-table-column>
                <el-table-column prop="submit_time" label="上传时间" width="200px">
                </el-table-column>
                <el-table-column width="250px" label="操作" align="center">
                  <el-button icon="el-icon-download" size="small" circle style="margin-right: 20px">
                  </el-button>
                  <el-button icon="el-icon-delete" size="small" circle type="danger" plain>
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
    return {
      input: "",
      fileList: [],
      totalFiles: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },

    showFiles(data, node) {
      console.log(node)
      let route = [];
      while (node.parent !== null){
        route.push(node.label)
        node = node.parent
      }
      let path = ""
      for (let i = route.length - 1; i >= 0 ; i--) {
        path = path + "/" + route[i]
      }
      console.log(path)
      this.$axios({
        url:'/file/getFileList',
        method:'get',
        params:{
          course_ID:this.$route.params.course_id,
          path:path,
        }
      }).then((response)=>{
        console.log(response.data)
        this.fileList = response.data
      })
    },

    childrenFiles(data) {
      let result = [];
      for (let i = 0; i < data.length; i++) {
        result.push({
          label: data[i],
        });
      }
      return result;
    },
  },
  mounted() {
    //加载所有二级文件
    //暂定资料库分为三级，course（projects）-> ×××（实验项目名）文件夹 -> ×××.×××
    this.$axios({
      url: "/file/getTotalFiles",
      method: "get",
      params: {
        course_ID: this.$route.params.course_id,
      },
    })
      .then((response) => {
        this.totalFiles.push(
          {
            label: "课程资料",
            children: this.childrenFiles(response.data[0]),
          },
          {
            label: "实验资料",
            children: this.childrenFiles(response.data[1]),
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });
    //默认选中节点
    this.$axios({
      url:'/file/getFileList',
      method:'get',
      params:{
        course_ID:this.$route.params.course_id,
        path:"/课程资料",
      }
    }).then((response)=>{
      console.log(response.data)
      this.fileList = response.data
    })
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

.treeNode {
  font-size: 15px;
}
</style>
