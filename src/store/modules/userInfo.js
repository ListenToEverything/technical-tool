/*
 * @Author: xueml
 * @Date: 2023-07-31 17:03:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 15:33:44
 * @FilePath: \technical-tool\src\store\modules\userInfo.js
 */
const store = {}

const mutations = {
  addCount (state, num) {
    state.count = state.count + num
  },
  reduce (state, num) {
    state.count--
  }
}

const actions = {
  asyncAddCount (context, num) {
    console.log("这是", num, context)
    //异步
    setTimeout(() => {
      context.commit("addCount", num)
    }, 1000)

  },
  asyncReduce (context) {
    //异步
    setTimeout(() => {
      context.commit("reduce")
    }, 1000)
  }
}

export default {
  // 开启命名空间
  namespaced: true,
  store,
  mutations,
  actions
}
