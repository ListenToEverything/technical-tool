/*
 * @Author: xueml
 * @Date: 2023-07-31 16:41:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 16:22:07
 * @FilePath: \technical-tool\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Mobile_terminal from './Mobile_terminal/index'//移动端页面
import display_System from './PC_terminal/display_System/index'//展示系统
import management_System from './PC_terminal/management_System/index'//管理系统

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  ...Mobile_terminal,
  ...display_System,
  ...management_System
]

const router = new VueRouter({
  // hash  地址栏有#号（开发环境的选择）
  // history  地址栏无#号（上线打包的选择）
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
  // 自配置激活类名
  // linkActiveClass: 'on-active',
  // linkExactActiveClass: 'off-active'
})

//获取开始时间
let startTime = Date.now()
const get_userinfo = (to, from, token) => {
  //获取当前时间
  let currentTime = Date.now()
  let Brow_history = {
    preUrl: from.path,
    preTitle: from.meta.title,
    currentUrl: to.path,
    currentTitle: to.meta.title,
    prePage_browTime: parseInt((currentTime - startTime) / 1000) + "s",
  }
  //初始化开始时间
  startTime = Date.now()
}

router.beforeEach((to, from, next) => {
  console.log("这是", to.path)
  console.log("路由", routes)

  // next()
  get_userinfo(to, from, "token")
  if (to.path == "/") {
    console.log("这是什么", utils.equipment.isMobile())
    console.log("设备信息", utils.equipment.ipInfo())
    console.log("获取IP", utils.equipment.getIP())
    console.log("获取IP", window.location)

    //   if (utils.equipment.isMobile()) {
    //     next({
    //       path: "/MHome/home",
    //       query: { redirect: to.path }
    //     })
    //   } else {
    //     next({
    //       path: "/preview/look",
    //       query: { redirect: to.path }
    //     })
    //   }
    // } else {
    next()
  }

})
// router.afterEach(()=>{
//   window.scrollTo(0,0)
// })
export default router
