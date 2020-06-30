/**
 * http配置
 */

import axios from 'axios';
// import store from '../store'
import { Message } from 'view-design'
import { baseUrl } from '../config/env';
import router from '@/router';

//1.引入axios模块&字符串处理模块

//2.全局配置（后期请求接口，实际请求地址baseURL+url）
           
// axios.defaults.baseURL = 'https://api-cms.qscrm.com' // 正式接口
axios.defaults.baseURL = baseUrl // 测试接口
// axios.defaults.baseURL = 'http://192.168.1.101:8102'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.cache = false
// axios.defaults.withCredentials = true
axios.defaults.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS,PUT,DELETE'

// 3.全局处理（错误统一处理，推荐发送邮件报警）
// request 请求
// response 响应
// 作用：数据交给 then处理前 先交给下面这个方法处理

/**
 * Author: hth
 * request 请求 config 一定要做请求
 * response 响应 
 */  

// 请求拦截
axios.interceptors.request.use(
  config => {
    const tokenId = localStorage.getItem('token') || ''
    config.headers['Authorization'] = tokenId
    return config
  },
  error => {
    return Promise.reject(error)
  } 
)

//响应拦截
axios.interceptors.response.use(
  response => {
    console.log('response: ', response);
    switch (response.data.code) {
      case '401':
        Message.error('身份信息过期,请重新登录')
        localStorage.clear();
        setTimeout(() => {
          router.push('/login')
        }, 1000)
        break
      case '400':
        Message.error(response.data.msg) 
        break
      case '500':
        Message.error('服务器内部错误') 
        break  
      default:
        // Message.error('网络错误，请稍后再试')
    }
    return Promise.resolve(response.data)
  },
  error => {
    // 对响应错误做点什么
    Message.error('网络错误，请稍后再试')
    return Promise.reject(error)
  }
)
