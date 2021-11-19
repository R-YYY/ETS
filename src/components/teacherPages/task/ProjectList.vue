<template>
  <div style="height: 530px;overflow-y: scroll;overflow-x: hidden">
    <div>
      <el-input class="searchProject" v-model="input" placeholder="请输入查找项目名称" @input="search">
      </el-input>
      <el-button type="primary" @click="search">
        <span>搜索</span>
      </el-button>
    </div>
    <div>
      <el-row>
        <el-col :span="7.5" v-for="item in tmpList" :key="item.project_ID" :offest="1">
          <div style="margin-top:30px;margin-left: 70px">
            <el-card class="projectCard">
              <div slot="header">
                <span>项目名称：{{item.name}}</span>
              </div>
              <div class="projectCardInfo">
                <span>发布时间：{{ item.release_time }}</span>
                <p>截至时间：{{item.deadline}}</p>
                <p>发布人：{{item.teacher_ID}}</p><br>
              </div>
              <div>
                <el-button class="btn" @click="checkProject">
                  <span>查看</span>
                </el-button>
                <el-button class="btn" type="danger" plain @click='deleteProject'>
                  <span>删除</span>
                </el-button>
              </div>
            </el-card>
          </div>
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
      input:'',
      projectList: [
        {
          project_ID:'4202440101',
          name:'实验一',
          release_time:'2020-10-1',
          deadline:'2021-10-1',
          teacher_ID:'10100'
        },
        {
          project_ID:'4202440101',
          name:'实验二',
          release_time:'2020-10-1',
          deadline:'2021-10-1',
          teacher_ID:'10100'
        },
        {
          project_ID:'4202440101',
          name:'实验三',
          release_time:'2020-10-1',
          deadline:'2021-10-1',
          teacher_ID:'10100'
        },
        {
          project_ID:'4202440101',
          name:'实验四',
          release_time:'2020-10-1',
          deadline:'2021-10-1',
          teacher_ID:'10100'
        },
        {
          project_ID:'4202440101',
          name:'实验五',
          release_time:'2020-10-1',
          deadline:'2021-10-1',
          teacher_ID:'10100'
        }
      ],
      tmpList:[]
    };
  },
  methods:{
    search(){
      if(this.input === '')
        this.tmpList = this.projectList
      else{
        this.tmpList = []
        for(let t in this.projectList){
          if(this.projectList[t].name.indexOf(this.input) !== -1){
            this.tmpList.push(this.projectList[t])
          }
        }
      }
    },
    checkProject(){

    },
    deleteProject(){

    }
  },
  mounted() {
    this.tmpList = this.projectList
  }
}
</script>

<style scoped>
.searchProject{
  width: 250px;
  margin-left: 70px;
  margin-top: 10px;
}

.projectCard{
  height:280px;
  width: 300px;
}

.projectCardInfo{
  position: relative;
  top: 10px;
}

.btn{
  margin-top: 5px;
  margin-left: 30px;
  margin-right: 35px;
}
</style>