import { service } from "~/utils/request";
import { Course } from "./schema/course";
const api_prefix = '/service/chapter'
export default {
  // 课程大纲列表, 根据课程id进行查询
  getChapterVideo(courseId: Course["courseId"]) {
    return service({
      url: `${api_prefix}/getChapterVideo/${courseId}`,
      method: 'get'
    })
  }
}