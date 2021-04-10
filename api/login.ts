import request from '@/utils/request'

export default {
  //登录的方法
  submitLoginUser(userInfo: object) {
    return request({
      url: `/educenter/member/login`,
      method: 'post',
      data: userInfo
    })
  },

  //根据token获取用户信息
  getLoginUserInfo() {
    return request({
      url: `/educenter/member/getMemberInfo`,
      method: 'get'
    })
  },

  //忘记密码
  forgetPassword(userPwd: string) {
    return request({
      url: `/educenter/member/forgetPassword`,
      method: 'post',
      data: userPwd
    })
  },

  //修改密码
  changePassword(newPwd: string) {
    return request({
      url: `/educenter/member/changePassword`,
      method: 'post',
      data: newPwd
    })
  },

  // 检查手机号码是否存在
  checkMobile(mobile: string) {
    return request({
      url: `/educenter/member/checkMobile`,
      method: 'post',
      params: mobile
    })
  },
  updateUcenter(ucenter: string) {
    return request({
      url: `/educenter/member/updateUcenter`,
      method: 'post',
      data: ucenter
    })
  }
}