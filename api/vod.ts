import { service } from '@/utils/request'
export default {
  getVideoById(id: string) {
    return service({
      url: `/tools/video/${id}`,
      method: 'get'
    })
  }
}