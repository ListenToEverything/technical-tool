/*
 * @Author: xueml
 * @Date: 2023-08-02 11:22:58
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 13:04:23
 * @FilePath: \technical-tool\src\utils\directive.js
 */
import Vue from 'vue'

// 自定义指令-埋点
const track = Vue.directive('track', {
  // 钩子函数，只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
  /*
   * el:指令所绑定的元素，可以用来直接操作 DOM
   * binding：一个对象，包含以下 property:
   *   name：指令名，不包括 v- 前缀。
   *   value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
   *   expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
   *   arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
   *   modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
   * vnode：Vue 编译生成的虚拟节点
   */
  bind: (el, binding) => {
    if (binding.value) {
      // 这里参数是根据自己业务可以自己定义
      const params = {
        currentUrl: binding.value.currentUrl,
        actionType: binding.value.actionType,
        title: binding.value.title,
        // preUrl: binding.value.preUrl,
        frontTriggerType: binding.value.triggerType,
        // businessCode: binding.value.businessCode,
        behavior: binding.value.behavior
        // service: "xxx",
      }
      // 如果是浏览类型，直接保存
      if (binding.value.triggerType === 'browse') {
        console.log('browse', params)
        // 调用后台接口保存数据
        // api.eventTrack.saveEventTrack(params);
      } else if (binding.value.triggerType === 'click') {
        // 如果是click类型，监听click事件
        el.addEventListener(
          'click',
          () => {
            console.log('click', params)
            // 调用后台接口保存数据
            // api.eventTrack.saveEventTrack(params);
          },
          false
        )
      }
    }
  }
})
// 自定义指令-重复点击
const preventReClick = Vue.directive('preventReClick', {
  inserted: function (el, binding, vNode, oldVnode) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        el.style.backgroundColor = '#ccc'
        el.style.border = 'none'
        setTimeout(() => {
          el.disabled = false
          el.style.backgroundColor = '#1890ff'
          el.style.border = '1px solid #1890ff'
        }, 2000)
      }
    })
  }
})

// 自定义指令 rap
// const elWap = Vue.directive('wap', {
//   bind: function (el, binding, vNode, oldVnode) {
//     const type = el.tagName
//     switch (type) {
//       case 'DIV':
//         const text = el.innerText.trim()
//         el.innerHTML = ''
//         if (text) {
//           setTimeout(() => appendJumpingLetters(text, el))
//         }
//         break
//       case 'INPUT':
//         if (el.value) {
//           const newDivEl = replaceInput(el)
//           appendJumpingLetters(el.value, newDivEl)

//           newDivEl.addEventListener('click', () => {
//             el.style.display = 'inline-block'
//             el.focus()
//             newDivEl.parentNode.removeChild(newDivEl)
//           })
//         }
//         break
//     }
//   }
// })

export default {
  preventReClick,
  track
}
