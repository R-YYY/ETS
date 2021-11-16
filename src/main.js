import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueRouter from "vue-router";
import store from './store'
import axios from "axios";

//+引入组件库及相关样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//让Vue使用ElementUI
Vue.use(ElementUI)

Vue.use(VueRouter)

Vue.prototype.$axios = axios;
axios.defaults.baseURL="/api";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
