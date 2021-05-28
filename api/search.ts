import { service } from '@/utils/request';
const api_prefix = "/service/search"
export default {
  /**
   * 获取搜索建议
   * @param keyword 关键字
   * @param type 类型
   * @returns 
   */
  suggest(keyword: string) {
    return service({
      url: `${api_prefix}/suggest`,
      params: { keyword },
      method: 'get'
    })
  },

  /**
   * 获取搜索结果
   * @param page 页数
   * @param limit 每页个数
   * @param keyword 关键词
   * @returns 
   */
  result(page: number, limit: number, keyword: string) {
    return service({
      url: `${api_prefix}/results`,
      method: 'get',
      params: { page, limit, keyword }
    })
  }
}