import { service } from '@/utils/request'
export default {
  getPlayAuth(vid: string) {
    return service({
      url: `/eduvod/video/getPlayAuth/${vid}`,
      method: 'get'
    })
  }
}