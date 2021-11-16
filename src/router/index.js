import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../components/Login.vue'
import CourseHome from "@/components/teacherPages/CourseHome";
import ManageStudent from "@/components/teacherPages/ManageStudent";
import ManageProject from "@/components/teacherPages/ManageProject";
import ManageCourse from "@/components/teacherPages/ManageCourse";
import ManageGrade from "@/components/teacherPages/ManageGrade";
import ManageFile from "@/components/teacherPages/ManageFile";
import Feedback from "@/components/teacherPages/Feedback";

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/coursehome'
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/coursehome',
    name: 'CourseHome',
    component: CourseHome,
    children:[
      { path: '/managecourse', component: ManageCourse},
      { path: '/managestudent', component: ManageStudent },
      { path: '/manageproject', component: ManageProject },
      { path: '/managegrade', component: ManageGrade},
      { path: '/managefile', component: ManageFile},
      { path: '/feedback', component: Feedback},
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
