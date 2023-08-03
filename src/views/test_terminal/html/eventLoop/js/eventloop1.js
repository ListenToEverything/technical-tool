/*
 * @Author: xueml
 * @Date: 2023-06-05 16:07:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-06-07 13:51:22
 * @FilePath: \my-test\src\view\html\eventLoop\js\eventloop1.js
 */
//
console.log('文件引入', '这是主线程', 1)

setTimeout(() => {
  console.log('文件引入', '这是宏线程', 1)
}, -100)

new Promise((resolve, reject) => {
  console.log('文件引入', '这是主线程', 2)
}).then(
  console.log('文件引入', '这是微线程', 1)
)
