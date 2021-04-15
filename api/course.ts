import { service } from "@/utils/request";
export default {
  // 条件分页课程查询的方法
  getCourseList(page: number, limit: number, searchObj: object) {
    return service({
      url: `/eduService/coursefront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  // 查询所有分类的方法
  getAllSubject() {
    return service({
      url: `/eduService/edu_subject/getAllSubject`,
      method: 'get'
    })
  },
  // 课程详情方法
  getCourseInfo(courseId: string) {
    return service({
      url: `/eduService/coursefront/getFrontCourseInfo/${courseId}`,
      method: 'get'
    })
  },

  //统计浏览量
  calViewCount(courseId: string, Id: string) {
    return service({
      url: `/eduService/course/addViewCount/${courseId}/${Id}`,
      method: 'post',
    })
  },

  suggestSuggest(name: string) {
    return service({
      url: `/eduService/search/suggest/${name}`,
      method: 'get',
    })
  },
  searchCourse(name: string) {
    return service({
      url: `/eduService/search/keyword/${name}`,
      method: 'get',
    })
  }
}