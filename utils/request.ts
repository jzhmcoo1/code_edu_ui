import axios from 'axios'
import cookie from 'js-cookie'
const service = axios.create({
  baseURL: process.env.baseURL,
  timeout: 3000
})


service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response.data)
    if (response.data.success) {
      console.log("响应拦截器---返回数据成功");
      return response.data
    } else {
      console.log("请求错误")
    }
  },
  function (error) {
    console.log("响应拦截器---返回数据失败");
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);


export default service