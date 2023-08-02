/*
 * @Author: xueml
 * @Date: 2023-07-31 16:41:15
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 15:31:22
 * @FilePath: \technical-tool\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 导入 modules 文件夹下的模块
import userInfo from './modules/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: "张三",
    age: 12,
    sex: "男",
    count: 0
  },
  getters: {
    getInfo (state) {
      let str = `
            姓名：${state.name}
            性别：${state.sex}
            年龄：${state.age}
        `
      return str
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userInfo
  }
})
