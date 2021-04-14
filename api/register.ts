import { service } from '@/utils/request'
export default {
  //根据手机号发验证码
  sendCode(phone: string) {
    return service({
      url: `/edumsm/msm/send/${phone}`,
      method: 'get'
    })
  },
  // 注册
  registerMember(memberInfo: object) {
    return service({
      url: `/educenter/member/register`,
      method: 'post',
      data: memberInfo
    })
  }
}
