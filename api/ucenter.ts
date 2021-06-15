import { service } from "@/utils/request";
export default {
  // 获取已登录用户的课程
  getMyCourseList(page: number, limit: number) {
    return service({
      url: `/service/selection/${page}/${limit}`,
      method: 'get',
    })
  },
  // 添加一门课程(选课)
  addMyCourse(courseId: string) {
    return service({
      url: `/service/selection/save/${courseId}`,
      method: 'post',
    })
  },
  // 删除一门课程(退课)
  deletdMyCourese(courseId: string) {
    return service({
      url: `/service/selection/${courseId}`,
      method: 'delete'
    })
  },
  // 获取选课状态
  getMyCourseState(courseId: string) {
    return service({
      url: `/service/selection/state/${courseId}`,
      method: 'get'
    })
  }
}