import { service } from '@/utils/request'

export default {
  getPageList(courseId: string) {
    return service({
      url: `/eduService/comment-course/pageComment`,
      method: 'get',
      params: { courseId }
    })
  },
  addComment(comment: object) {
    return service({
      url: `/eduService/comment-course/auth/save`,
      method: 'post',
      data: comment
    })
  },
  getArticlePageList(articleId: string) {
    return service({
      url: `/eduService/comment-article/pageComment`,
      method: 'get',
      params: { articleId }
    })
  },
  addArticleComment(comment: object) {
    return service({
      url: `/eduService/comment-article/auth/save`,
      method: 'post',
      data: comment
    })
  }
}