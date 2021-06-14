import { service } from "~/utils/request";
import { EduMessage } from "./schema/message";
const api_prefix = "/service/message"
export default {
  /**
   * 获取未读消息
   * @returns 
   */
  checkUnreadCount() {
    return service({
      url: `${api_prefix}/checkUnreadCount`,
      method: 'get'
    })
  },
  pageMessage(page: number, limit: number) {
    return service({
      url: `${api_prefix}/${page}/${limit}`,
      method: 'get'
    })
  },
  sendOne(message: EduMessage) {
    return service({
      url: `${api_prefix}/sendOne`,
      method: 'post',
      data: message
    })
  },
}