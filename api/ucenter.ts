import { service } from "@/utils/request";
export default {
  // 更新用户信息
  updateUcenter(ucenter: Object) {
    return service({
      url: `/educenter/member/updateUcenter`,
      method: 'post',
      data: ucenter
    })
  }
}