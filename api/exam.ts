import { service } from "@/utils/request";
const api_prefix = "/service/exam";

export default {
  /**
   * 根据考试ID获取考试详情
   *
   * @param {string} id
   */
  detail(id: string) {
    return service({
      url: `${api_prefix}/detail/${id}`,
      method: 'get',
    })
  },

  /**
   * 考试结束,评分
   *
   * @param {string} examId
   * @param {object} answersMap
   * @return {*} 
   */
  finish(examId: string, answersMap: object) {
    return service({
      url: `${api_prefix}/finish/${examId}`,
      method: 'post',
      data: answersMap
    })
  },

  /**
   * 根据考试记录ID获取考试记录详情
   *
   * @param {string} recordId
   * @return {*} 
   */
  recordDetail(recordId: string) {
    return service({
      url: `${api_prefix}/record/detail/${recordId}`,
      method: 'get',
    })
  },

  /**
   * 获取当前用户的考试记录
   *
   * @param {number} page
   * @param {number} limit
   * @return {*} 
   */
  getUserRecordByPage(page: number, limit: number) {
    return service({
      url: `${api_prefix}/record/user/${page}/${limit}`,
      method: 'get'
    })
  },

  /**
   * 获取考试的分页列表
   *
   * @param {number} page
   * @param {number} limit
   * @param {object} condition
   * @return {*} 
   */
  examList(page: number, limit: number, condition: object) {
    return service({
      url: `${api_prefix}/${page}/${limit}`,
      method: 'post',
      data: condition
    })
  },

  userExamList(page: number, limit: number, condition: object) {
    return service({
      url: `${api_prefix}/user/${page}/${limit}`,
      method: 'post',
      data: condition
    })
  }
}