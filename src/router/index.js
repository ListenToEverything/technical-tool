/*
 * @Author: xueml
 * @Date: 2023-07-31 16:41:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-07-31 17:15:58
 * @FilePath: \technical-tool\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
  }
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

export default router
