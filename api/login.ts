import { service } from '@/utils/request'
export default {
  // 获取图像验证码
  getCodeImage(randomId: string) {
    return service({
      method: 'get',
      url: `/auth/captcha`,
      responseType: 'arraybuffer',
      params: { key: randomId }
    })
  },

}