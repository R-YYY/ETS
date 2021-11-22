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
import EditCourseInfo from "@/components/teacherPages/course/EditCourseInfo";
import TeacherList from "@/components/teacherPages/course/TeacherList";
import TAList from "@/components/teacherPages/course/TAList";
import ProjectList from "@/components/teacherPages/task/ProjectList";
import AttendanceList from "@/components/teacherPages/task/AttendanceList";
import SetGrade from "@/components/teacherPages/grade/SetGrade";
import PartGrade from "@/components/teacherPages/grade/PartGrade";
import StudentCourseHome from "@/components/studentPages/StudentCourseHome";

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    // redirect: {name: 'StudentCourseHome'},
    redirect: {name: 'CourseHome'},
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
      },
      {
        path: 'info',
        name: 'info',
        component: ManageCourse,
      },
      {
        path: 'edit',
        name: 'edit',
        component: EditCourseInfo
      },
      {
        path: 'teachers',
        name: 'teachers',
        component: TeacherList
      },
      {
        path: 'tas',
        name: 'tas',
        component: TAList
      },
      {
        path: 'students',
        name: 'students',
        component: ManageStudent
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: ManageTask
      },
      {
        path: 'projects',
        name: 'projects',
        component: ProjectList
      },
      {
        path: 'attendances',
        name: 'attendances',
        component: AttendanceList
      },
      {
        path: 'totalGrades',
        name: 'totalGrades',
        component: ManageGrade
      },
      {
        path: 'partGrades',
        name: 'partGrades',
        component: PartGrade
      },
      {
        path: 'setGrades',
        name: 'setGrades',
        component: SetGrade
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
  {
    path: '/stu/courseInfo/:course_id',
    name: 'StudentCourseHome',
    component: StudentCourseHome
  }
]

const router = new VueRouter({
  routes
})

export default router
