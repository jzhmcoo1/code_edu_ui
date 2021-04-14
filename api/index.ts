import { service } from '@/utils/request'
export default {
  // 查询首页
  getIndexData() {
    return service({
      url: `/eduService/indexfront/index`,
      method: 'get'
    })
  }
}