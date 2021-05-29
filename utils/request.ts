import axios, { AxiosRequestConfig } from 'axios'
import { message, notification } from 'ant-design-vue'
import { getToken, getRefreshToken, getExpireTime } from '@/utils/auth'
import store from '@/store/index'
import authorizationValue from './settings'
// 请求超时时间，10s
const requestTimeOut = 10 * 1000
const success = 200
// 更换令牌的时间区间
const checkRegion = 5 * 60 * 1000


// 系统全局请求对象
const service = axios.create({
  baseURL: process.env.baseURL,
  timeout: 3000,
  responseType: 'json',
  method: 'GET',
  validateStatus(status) {
    return status === success
  }
})
// 系统令牌刷新请求对象
const refresh_service = axios.create({
  baseURL: process.env.baseURL,
  timeout: requestTimeOut,
  responseType: 'json',
  validateStatus(status) {
    return status === success
  }
})

// 两个gitee请求
const gitService = axios.create({
  baseURL: process.env.giteeURL,
  timeout: 3000,
  method: 'GET'
})
const gitBackService = axios.create({
  baseURL: process.env.BackendGiteeURL,
  timeout: 3000,
  method: 'GET'
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 判断令牌是否过期
    try {
      const expireTime = getExpireTime()
      if (expireTime) {
        const left = expireTime - new Date().getTime()
        const refreshToken = getRefreshToken()
        if (left < checkRegion && refreshToken) {
          config = queryRefreshToken(config, refreshToken) as AxiosRequestConfig
        } else {
          if (getToken()) {
            console.log("访问令牌:", getToken())
            config.headers['Authorization'] = 'bearer ' + getToken()
          }
        }
      }
    } catch (e) {
      console.error(e)
    }
    return config
  },
  err => {
    console.error('请求拦截器错误')
    return Promise.reject(err);
  }
)

// 响应拦截器
service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function (error) {
    if (error.response) {
      const errorMessage = error.response.data === null ? '系统内部异常，请联系网站管理员' : error.response.data.message
      switch (error.response.status) {
        case 404:
          message.open({
            content: "很抱歉，资源未找到",
            type: 'error',
          })
          break
        case 403:
          message.open({
            content: '很抱歉，您暂无该操作权限',
            type: 'error',
          })
          break
        case 401:
          message.open({
            content: '很抱歉，认证已失效，请重新登录',
            type: 'error',
          })
          break
        default:
          if (errorMessage === 'refresh token无效') {
            notification.open({
              message: "温馨提示",
              description: "登录已过期，请重新登录"
            })
          } else {
            message.open({
              content: errorMessage,
              type: 'error',
            })
          }
          break
      }
    }
    return Promise.reject(error)
  }
);

const request = {
  login(url: string, params: any) {
    params['grant_type'] = 'password'
    return service.post(url, params, {
      transformRequest: [(params) => {
        return tansParams(params)
      }],
      headers: {
        'Authorization': 'Basic ZmViczoxMjM0NTY='
      }
    })
  },
  post(url: string, params: any) {
    return service.post(url, params, {
      transformRequest: [(params) => {
        return tansParams(params)
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  put(url: string, params: any) {
    return service.put(url, params, {
      transformRequest: [(params) => {
        return tansParams(params)
      }],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  get(url: string, params: any) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return service.get(`${url}${_params}`)
  },
  delete(url: string, params: any) {
    let _params
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      _params = '?'
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] !== null) {
          _params += `${key}=${params[key]}&`
        }
      }
    }
    return service.delete(`${url}${_params}`)
  },
  refresh(url: string, params: any) {
    params['grant_type'] = 'refresh_token'
    return refresh_service.post(url, params, {
      transformRequest: [(params) => {
        return tansParams(params)
      }],
      headers: {
        'Authorization': authorizationValue
      }
    })
  },
}


function tansParams(params: any) {
  let result = ''
  Object.keys(params).forEach((key) => {
    if (!Object.is(params[key], undefined) && !Object.is(params[key], null)) {
      result += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
    }
  })
  return result
}

async function queryRefreshToken(config: AxiosRequestConfig, refreshToken: string) {
  const result = await request.refresh('auth/oauth/token', {
    refresh_token: refreshToken
  })
  if (result.status === success) {
    saveData(result.data)
    config.headers['Authorization'] = 'bearer ' + getToken()
  }
  return config
}


function saveData(data: any) {
  store.commit('account/setAccessToken', data.access_token)
  store.commit('account/setRefreshToken', data.refresh_token)
  const current = new Date()
  const expireTime = current.setTime(current.getTime() + 1000 * data.expires_in)
  store.commit('account/setExpireTime', expireTime)
}

export { service, gitService, gitBackService, request }