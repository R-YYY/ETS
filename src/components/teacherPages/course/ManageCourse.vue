<template>
  <div>
    <el-tabs class="courseTab" v-model="activeIndex" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="课程设置">
        <el-container>
          <el-aside class="courseAside">
            <div>
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false">
                <img class="courseImg" src="../../../assets/course.jpg" alt="加载失败">
              </el-upload>
              <div class="tips">
                <span>仅支持*******格式图片</span><br><br>
                <span>建议最佳尺寸*****，不超过***</span>
              </div>
            </div>
          </el-aside>
          <el-main class="courseMain">
            <router-view name="courseInfo"></router-view>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="教师团队">
        <router-view name="teacherList"></router-view>
      </el-tab-pane>
      <el-tab-pane label="助教团队">
        <router-view name="taList"></router-view>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ManageCourse",
  data(){
    const item = {
      id: '1111111',
      name: '王小虎',
      email: '1111111@tongji.edu.cn'
    };
    return {
      activeIndex:'0',
      courseID:null,
      teacherList:Array(3).fill(item),
      taList:Array(4).fill(item),
      courseInfo:{
        course_ID: '00000000',
        name: '暂无课程名称',
        description: '暂无课程介绍'
      }
    }
  },
  methods:{
    handleClick(tab,event){
      if(tab.index == 0)
        this.$router.push({
          name:'info',
          params: {
            course_id:42024401
          }
        })
      else if(tab.index == 1)
        this.$router.push({
          name:'teachers',
          params: {
            course_id:42024401
          }
        })
      else if(tab.index == 2)
        this.$router.push({
          name:'tas',
          params:{
            course_id:42024401
          }
        })
    }
  },
}
</script>

<style scoped>
.courseTab{
  height: 100%;
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 40px;
  background-color:white;
}

.courseAside{
  margin-left: 150px;
  margin-top: 90px;
}

.tips{
  font-size: 13px;
  position: relative;
  margin-top: 40px;
}

.courseMain{
  text-align: left;
  position: relative;
  margin-left: 140px;
  margin-top: 30px;
}

.courseImg{
  width: 260px;
}

</style>