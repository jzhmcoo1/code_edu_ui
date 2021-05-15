import { service } from "@/utils/request";
const api_prefix = '/service/subject'
export default {
  getSubjectTree() {
    return service({
      url: `${api_prefix}/tree`,
      method: 'get'
    })
  }
}