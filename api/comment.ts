import { service } from '@/utils/request'
import { Comment } from './schema/comment'
const api_prefix = '/service/comment'
export default {
  /**
   * 添加评论
   *
   * @param {Comment} commentObj
   * @param {string} type (course/article/video)
   * @return {*} 
   */
  addComment(commentObj: Comment, type: string) {
    return service({
      url: `${api_prefix}/${type}`,
      method: 'post',
      data: commentObj
    })
  },
  /**
   *
   * 查询评论
   * @param {string} relatedId 有关的ID
   * @param {string} type (course/article/video)
   * @return {*} 
   */
  commentList(relatedId: string, type: string) {
    return service({
      url: `${api_prefix}/list`,
      method: 'get',
      params: { relatedId, type }
    })
  }
}