import Vue from 'vue'
import VueRouter from 'vue-router'
import LogIn from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
]

const router = new VueRouter({
  routes
})

export default router
