import request from '@/utils/request'
export default {
  //根据手机号发验证码
  sendCode(phone: string) {
    return request({
      url: `/edumsm/msm/send/${phone}`,
      method: 'get'
    })
  },
  // 注册
  registerMember(memberInfo: object) {
    return request({
      url: `/educenter/member/register`,
      method: 'post',
      data: memberInfo
    })
  }
}