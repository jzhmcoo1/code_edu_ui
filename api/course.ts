import { service } from "@/utils/request";
import { Course, CourseQuery } from "./schema/course";
const api_prefix = '/service/course'
export default {
  // 条件查询课程列表
  conditionList(page: number = 1, limit: number = 8, searchObj: CourseQuery = {}) {
    return service({
      url: `${api_prefix}/conditionList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  // 根据课程ID查询详情(前台接口)
  courseDetail(courseId: Course["courseId"]) {
    return service({
      url: `${api_prefix}/front-detail/${courseId}`,
      method: 'get',
    })
  },
  // 根据ID获取课程发布信息
  coursePublishInfo(courseId: Course["courseId"]) {
    return service({
      url: `${api_prefix}/publishInfo/${courseId}`,
      method: 'get',
    })
  },
  /**
   * 新增课程浏览量
   * @param courseId 
   * @returns 
   */
  addView(courseId: Course["courseId"]) {
    return service({
      url: `${api_prefix}/view/${courseId}`,
      method: 'put'
    })
  }
}