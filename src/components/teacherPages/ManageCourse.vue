<template>
  <div>
    <el-tabs class="courseTab" type="border-card">
      <el-tab-pane class="optionPage" label="课程设置">
          <el-container>
            <el-aside class="courseAside">
              <div>
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                  <img class="courseImg" src="../../../src/assets/course.jpg" alt="加载失败">
                </el-upload>
              </div>
              <div class="tips">
                <br><span>仅支持*******格式图片</span><br>
                <span>建议最佳尺寸*****，不超过***</span>
              </div>
            </el-aside>

            <el-main class="courseMain">
              <div>
                <h2>课程信息</h2><br>
                <p>课程编号 : ？？？？</p><br>
                <p>课程名称 : ？？？？</p><br>
                <p>课程介绍 : ？？？？</p><br>
              </div>
              <el-button>编辑资料</el-button>
              <el-button class="endCourse">结束课程</el-button>
              <el-button class="deleteCourse" type="danger" plain>删除课程</el-button>
            </el-main>

          </el-container>
      </el-tab-pane>
      <el-tab-pane class="optionPage" label="教师团队">
        <el-button class="addMember" type="primary" plain>添加老师</el-button>
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
      </el-tab-pane>
      <el-tab-pane class="optionPage" label="助教团队">
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
      teacherList:Array(3).fill(item),
      taList:Array(4).fill(item)
    }
  }
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
  left: 250px;
}

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

.endCourse{
  position: relative;
  left: 50px;
}

.deleteCourse{
  position: relative;
  left: 100px;
}

.courseImg{
  width: 270px;
}

</style>