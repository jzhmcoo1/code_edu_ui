import { service } from '@/utils/request'
export default {
  // 获取讲师的列表
  getTeacherList(page: number, limit: number) {
    return service({
      url: `/eduService/teacherfront/getTeacherFrontList/${page}/${limit}`,
      method: 'get'
    })
  },
  // 讲师详情的方法
  getTeacherInfo(id: string) {
    return service({
      url: `/eduService/teacherfront/getTeacherFrontInfo/${id}`,
      method: 'get'
    })
  }
}