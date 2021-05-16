import { service } from '@/utils/request'
import { Article, ArticleQuery } from './schema/article'
const api_prefix = '/service/article'
export default {
  //添加文章
  addArticle(articleObj: Article) {
    return service({
      url: `${api_prefix}/addArticle`,
      method: 'post',
      data: articleObj
    })
  },
  //删除文章
  deleteArticle(articleId: Article["id"]) {
    return service({
      url: `${api_prefix}/${articleId}`,
      method: 'delete',
    })
  },
  // 删除多篇文章
  deleteArticles(articleIds: Array<Article["id"]>) {
    return service({
      url: `${api_prefix}/batch/${[...articleIds]}`,
      method: 'delete',
    })
  },
  // 修改文章
  updateArticle(articleObj: Article) {
    return service({
      url: `${api_prefix}/updateArticle`,
      method: 'put',
      data: articleObj
    })
  },
  // 获取文章分页列表
  conditionList(page: number, limit: number, searchObj: ArticleQuery) {
    return service({
      url: `${api_prefix}/conditionList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  // 获取文章详情
  getArticle(articleId: Article["id"]) {
    return service({
      url: `${api_prefix}/detail/${articleId}`,
      method: 'get',
    })
  },
  // 点赞文章
  praiseArticle(articleId: Article["id"]) {
    return service({
      url: `${api_prefix}/like/${articleId}`,
      method: 'post'
    })
  },
  // 取消点赞
  cancelPraise(articleId: Article["id"]) {
    return service({
      url: `${api_prefix}/dislike/${articleId}`,
      method: 'delete'
    })
  },
  // 获取点赞状态
  getPraise(articleId: Article["id"]) {
    return service({
      url: `${api_prefix}/like/${articleId}`,
      method: 'get'
    })
  },
  // 获取用户文章列表
  userArticlePage(page: number, limit: number) {
    return service({
      url: `${api_prefix}/written/${page}/${limit}`,
      method: 'get'
    })
  },
  // 获取文章(修改文章初始化信息时的接口)
  getBeforeArticleUpdate(articleId: Article["id"]) {
    return service({
      url: `${api_prefix}/${articleId}`,
      method: 'get'
    })
  }
}
