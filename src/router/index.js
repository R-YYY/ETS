import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../components/Login.vue'
import CourseHome from "@/components/teacherPages/CourseHome";
import ManageStudent from "@/components/teacherPages/student/ManageStudent";
import ManageTask from "@/components/teacherPages/task/ManageTask";
import ManageCourse from "@/components/teacherPages/course/ManageCourse";
import ManageGrade from "@/components/teacherPages/grade/ManageGrade";
import ManageFile from "@/components/teacherPages/file/ManageFile";
import Feedback from "@/components/teacherPages/feedback/ManageFeedbacks";
import CourseInfo from "@/components/teacherPages/course/CourseInfo";
import EditCourseInfo from "@/components/teacherPages/course/EditCourseInfo";
import TeacherList from "@/components/teacherPages/course/TeacherList";
import TAList from "@/components/teacherPages/course/TAList";
import ProjectList from "@/components/teacherPages/task/ProjectList";
import AttendanceList from "@/components/teacherPages/task/AttendanceList";

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: {name: 'CourseHome'}
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/courses/:course_id',
    name: 'CourseHome',
    component: CourseHome,
    children:[
      {
        path: '',
        component: ManageCourse,
        children:[
            {
              path: 'info',
              name: 'info',
              components: {
                courseInfo:CourseInfo,
              }
            },
          {
            path: 'edit',
            name: 'edit',
            components: {
              courseInfo:EditCourseInfo
            }
          },
          {
            path: 'teachers',
            name: 'teachers',
            components:{
              teacherList: TeacherList
            }
          },
          {
            path: 'tas',
            name: 'tas',
            components:{
              taList: TAList
            }
          }
        ]
      },
      {
        path: 'students',
        name: 'students',
        component: ManageStudent
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: ManageTask,
        children: [
          {
            path: 'projects',
            name: 'projects',
            components: {
              projectList:ProjectList
            }
          },
          {
            path: 'attendances',
            name: 'attendances',
            components: {
              attendanceList:AttendanceList
            }
          }
        ]
      },
      {
        path: 'grades',
        name: 'grades',
        component: ManageGrade
      },
      {
        path: 'files',
        name: 'files',
        component: ManageFile
      },
      {
        path: 'feedbacks',
        name: 'feedbacks',
        component: Feedback
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
