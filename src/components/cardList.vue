<template>
  <div>
    <el-row>
      <el-col
        :span="4"
        v-for="item in dataList.slice((currentPage - 1) * pagesize,currentPage * pagesize)"
        :key="item.id"
        :offset="1"
        type="flex"
        :push=1
      >
        <div style="margin-top:30px">
          <el-card :body-style="{ padding: '10px' }" shadow="hover" class="box-card" @click.native="formore(item.course_ID,item.is_student,item.teacher_ID)">
            <h2>{{ item.course_name }} </h2>
            <h3>{{ item.course_ID }}</h3>
            <h4>{{ item.teacher_name}}</h4>
            <span id='hiding-id' v-show="false">{{item.id}}</span>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div style="margin-left: 35%">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[4, 8, 12]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next,jumper"
          :total="dataList.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}
.box-card{
  width:200px;
  text-align: center;
  margin-right: 150px;
  color:white;
  background: #369575;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 5;
  float: left;
}

.docImage {
  float: left;
  width: 50px;
  height: 50px;
  padding: 5px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.block{
  position: relative;
  top:30px;
  right:10%;
  padding:10px;
}
</style>

<script>

export default {
  name: "cardList",
  data() {
    return {
      currentPage: 1,
      pagesize: 4,
      lastCardInfo:{
        _id: -1,
        _name:' '
      }
    };
  },
  props:{
    dataList:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  methods: {
    handleSizeChange(page_size) {
      this.pagesize = page_size;
    },
    handleCurrentChange(current_page) {
      this.currentPage = current_page;
    },
    // recordLocation(mes){
    //   console.log(mes.currentTarget.parentElement
    //                     .parentElement.parentElement.childNodes[4])
    //   this.lastCardInfo._id = Number(mes.currentTarget.parentElement
    //                     .parentElement.parentElement.childNodes[4].innerHTML)
    //   this.lastCardInfo._name = mes.currentTarget.parentElement
    //                     .parentElement.parentElement.childNodes[1].innerHTML
    // },
    formore(course_ID,is_student,teacher_ID){
        console.log("course_ID"+course_ID);
        console.log("is_student"+is_student);
        console.log("teacher_ID"+teacher_ID);
        window.sessionStorage.setItem("resTeacher_ID",teacher_ID);
        if(is_student==0)
        {
          this.$router.push({
            name: "CourseHome",
            params: {
              course_id: course_ID,
            },
          });
        }
        else{
        this.$router.push({
            name: "StudentCourseHome",
            params: {
              course_id: course_ID,
            },
          });
        }
    }
  },
  watch: {
    dataList: function () {//自动跳转回列表第一页
      this.$nextTick(function () {
        this.currentPage = 1;
      });
    },
  },
};
</script>
