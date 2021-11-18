<template>
  <div style="height:400px ;overflow: hidden">
    <div>
      <h2>课程信息</h2>
      <el-form>
        <el-form-item label="课程编号">
          <el-input v-model="this.$route.params.course_id"
                    :disabled="true"
                    style="width: 100px;font-size: 17px"></el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="this.$route.params.course_name"
                    style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍">
          <el-input v-model="this.$route.params.course_des"
                    :rows="5"
                    type="textarea"
                    resize="none"
                    style="width: 400px" >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="btnArea">
      <el-button class="saveBtn"
                 @click="saveEdit">
        <span>保存</span>
      </el-button>
      <el-button class="cancelBtn"
                 type="danger"
                 @click="cancelEdit"
                 plain>
        <span>取消</span>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditCourseInfo",
  data(){
    return{
      tmpName:'',
      tmpDes: '',
      courseInfo:{
        course_ID:'',
        name: '',
        description: ''
      }
    }
  },
  methods:{
    //更新课程资料
    saveEdit(){
      console.log("success!")
      this.$router.push({
        name:'info',
        params:{
          course_id:42024401
        }
      })
    },
    cancelEdit(){
      this.$router.push({
        name:'info',
        params:{
          course_id:42024401
        }
      })
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.courseID{
  position: relative;
  top: 10px
}

.courseName{
  position: relative;
  top: 25px
}

.courseDes{
  position: relative;
  top: 45px
}

.btnArea{
  position:relative;
  left: 110px;
}

.saveBtn{
  position: relative;
  left: 50px;
}

.cancelBtn{
  position: relative;
  left: 100px;
}

</style>