<template>
  <div style="height:430px ;overflow: hidden">
    <div>
      <h2>课程信息</h2>
      <el-form>
        <el-form-item label="课程编号">
          <el-input v-model="this.$route.params.course_id"
                    :disabled="true" style="width: 150px;font-size: 17px">
          </el-input>
        </el-form-item>
        <el-form-item label="责任教师">
          <el-input v-model="this.$route.params.course_teacher_ID"
                    :disabled="true" style="width: 150px;font-size: 17px">
          </el-input>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="this.$route.params.course_name" style="width: 400px">
          </el-input>
        </el-form-item>
        <el-form-item label="课程介绍">
          <el-input v-model="this.$route.params.course_des" :rows="3"
                    type="textarea" resize="none" style="width: 400px">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button class="btn" @click="saveEdit">
        <span>保存</span>
      </el-button>
      <el-button class="btn" type="danger" @click="cancelEdit" plain>
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
      this.$router.push({name:'info'});
      // this.$router.push({
      //   name:'info',
      //   params:{
      //     course_id:42024401
      //   }
      // })
    },
    cancelEdit(){
      this.$router.push({name:'info'});
      // this.$router.push({
      //   name:'info',
      //   params:{
      //     course_id:42024401
      //   }
      // })
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.btn{
  position: relative;
  margin-left: 150px;
  margin-right: 50px;
  margin-top: 10px;
}

</style>