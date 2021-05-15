import { service } from '@/utils/request'
import { TeacherQuery } from './schema/teacher'
const api_prefix = '/service/teacher'
export default {
  // 获取讲师的列表
  getTeacherList(page: number, limit: number) {
    return service({
      url: `${api_prefix}/list/${page}/${limit}`,
      method: 'get',
    })
  },
  // 讲师详情的方法
  getTeacherInfo(id: string) {
    return service({
      url: `${api_prefix}/${id}`,
      method: 'get'
    })
  },
  // 条件讲师列表
  conditionList(page: number, limit: number, searchObj: TeacherQuery = {}) {
    return service({
      url: `${api_prefix}/conditionList/${page}/${limit}`,
      method: 'post',
      data: searchObj,
    })
  }
}