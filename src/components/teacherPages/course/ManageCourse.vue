<template>
  <div>
    <el-tabs class="courseTab" v-model="activeIndex" type="border-card" @tab-click="handleClick">
      <el-tab-pane class="optionPage" label="课程设置">
        <el-container>
          <el-aside class="courseAside">
            <div>
              <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false">
                <img class="courseImg" src="../../../assets/course.jpg" alt="加载失败">
              </el-upload>
            </div>
            <div class="tips">
              <br><br><span>仅支持*******格式图片</span><br>
              <span>建议最佳尺寸*****，不超过***</span>
            </div>
          </el-aside>
          <el-main class="courseMain">
            <router-view name="courseInfo"></router-view>
          </el-main>
        </el-container>
      </el-tab-pane>
      <el-tab-pane class="optionPage" label="教师团队">
        <router-view name="teacherList"></router-view>
      </el-tab-pane>
      <el-tab-pane class="optionPage" label="助教团队">
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
  height:480px;
  width: 1150px;
  position: relative;
  left: 70px;
  top:45px;
}

.optionPage{
  height: 450px;
}

.courseAside{
  position: relative;
  left: 110px;
  top:50px;
  height: 450px;
}

.tips{
  font-size: 12px;
}

.courseMain{
  position: relative;
  left: 220px;
}

.courseImg{
  width: 240px;
}

</style>