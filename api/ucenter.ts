import { service } from "@/utils/request";
export default {
  // 获取已登录用户的课程
  getMyCourseList(page: number, limit: number, ucenterId: string) {
    return service({
      url: `/eduService/edu-mycourse/pageMyCourese/${page}/${limit}`,
      method: 'get',
      params: { ucenterId }
    })
  },
  // 添加一门课程(选课)
  addMyCourse(mycourse: object) {
    return service({
      url: `/eduService/edu-mycourse/auth/save`,
      method: 'post',
      data: mycourse
    })
  },
  // 删除一门课程(退课)
  deletdMyCourese(courseId: string) {
    return service({
      url: `/eduService/edu-mycourse/deleteMyCourse/${courseId}`,
      method: 'delete'
    })
  }
}