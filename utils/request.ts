import axios from 'axios'
import cookie from 'js-cookie'
import { message } from 'ant-design-vue'
// 服务1---往自己的后端服务器发请求
const service = axios.create({
  baseURL: process.env.baseURL,
  timeout: 3000,
  method: 'GET'
})
const gitService = axios.create({
  baseURL: process.env.giteeURL,
  timeout: 3000,
  method: 'GET'
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (cookie.get('dhu_token')) {
      config.headers['token'] = cookie.get('dhu_token');
    }
    return config
  },
  err => {
    console.error('请求拦截器错误')
    return Promise.reject(err);
  }
)


service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response.data)
    if (response.data.success) {
      console.log("响应拦截器---返回数据成功");
    } else {
      console.error(response.data.message)
    }
    return response.data
  },
  function (error) {
    console.log("响应拦截器---返回数据失败");
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    message.error({
      content: "response错误:" + error
    })
    return Promise.reject(error);
  }
);


export { service, gitService }