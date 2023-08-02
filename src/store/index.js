/*
 * @Author: xueml
 * @Date: 2023-07-31 16:41:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-07-31 17:04:04
 * @FilePath: \technical-tool\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 导入 modules 文件夹下的模块
import userInfo from './modules/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userInfo
  }
})
