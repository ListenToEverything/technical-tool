/*
 * @Author: xueml
 * @Date: 2023-08-02 11:22:58
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 13:09:09
 * @FilePath: \technical-tool\src\utils\request.js
 */
import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://chenyp.top:8008', // url = base url + request url
  // baseURL: 'http://127.0.0.1:8686', // url = base url + request url
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Token: 'TokenToken'
  },
  // 请求超时
  timeout: 10000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    config.headers.Token1 = 'token1111111111111111111'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const error = 'ERROR'
    // 状态
    if (response.status === 200) {
      Message({
        showClose: true,
        message: '恭喜你，这是一条成功消息',
        type: 'success'
      })
      response = response.data
      return response
    } else {
      Message({
        showClose: true,
        message: '错了哦，这是一条错误消息',
        type: 'error'
      })
      return error
    }
  },
  error => {
    return Promise.reject(error)
  }
)
// get请求
export function get (url, data) {
  return new Promise((resolve, reject) => {
    service.get(url, { data })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// post请求
export function post (url, data) {
  return new Promise((resolve, reject) => {
    service.post(url, { data })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default service
