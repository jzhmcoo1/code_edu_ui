import request from '@/utils/request'
export default {
  // 查询首页
  getIndexData() {
    return request({
      url: `/eduService/indexfront/index`,
      method: 'get'
    })
  }
}