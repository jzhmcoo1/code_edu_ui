import { service } from "@/utils/request";
const api_prefix = "/service/question";

export default {

  /**
   * 根据问题id获取问题详情
   * @param id 
   * @returns 
   */
  detail(id: string) {
    return service({
      url: `${api_prefix}/detail/${id}`,
      method: 'get'
    })
  }
}