import { service } from '@/utils/request'

const api_name = '/educenter/user-article'
export default {
  // 条件分页文章查询的方法
  getAllArticle() {
    return service({
      url: `${api_name}/getArticleList`,
      method: 'get',
    })
  },
  getArticleList(page: number, limit: number, searchObj: Object) {
    return service({
      url: `${api_name}/articleListCondition/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //根据用户获取文章
  getArticleMemberList(page: number, limit: number, memberId: string) {
    return service({
      url: `${api_name}/getArticleByMember/${memberId}/${page}/${limit}`,
      method: 'get',
    })
  },
  // 查询所有分类的方法
  getAllSubject() {
    return service({
      url: `/eduService/edu_subject/getAllSubject`,
      method: 'get'
    })
  },

  // 查询所有标签的方法
  getAllTag() {
    return service({
      url: `/eduService/edu_subject/getAllTag`,
      method: 'get'
    })
  },
  //获取所有用户
  getAllMember() {
    return service({
      url: `/educenter/member/getAllMember`,
      method: 'get'
    })
  },

  // 文章详情方法
  getArticleInfo(articleId: string) {
    return service({
      url: `${api_name}/getArticle/${articleId}`,
      method: 'get'
    })
  },
  //删除文章
  delArticleInfo(articleId: string) {
    return service({
      url: `${api_name}/deleteArtiicle/${articleId}`,
      method: 'delete'
    })
  },
  //更新文章
  updateArticleInfo(article: Object) {
    return service({
      url: `${api_name}/updateArticle`,
      method: 'post',
      data: article
    })
  },

  //添加文章
  addArticle(article: Object) {
    return service({
      url: `${api_name}/addArticle`,
      method: 'post',
      data: article
    })
  },

  //统计浏览量
  calViewCount(articleId: string, uid: string) {
    return service({
      url: `${api_name}/addViewCount/${articleId}/${uid}`,
      method: 'post',
    })
  },
  //获取文章点赞状态
  getLikeState(articleId: string) {
    return service({
      url: `${api_name}/getLikeState/${articleId}`,
      method: 'get'
    })
  },

  //点赞文章
  chooseLike(articleId: string) {
    return service({
      url: `${api_name}/addLikeCount/${articleId}`,
      method: 'post'
    })
  },

  //取消点赞
  cancelLike(articleId: string) {
    return service({
      url: `${api_name}/cancelLike/${articleId}`,
      method: 'delete'
    })
  }
}
