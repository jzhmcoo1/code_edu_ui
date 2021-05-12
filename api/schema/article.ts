/**
 * 文章对象
 *
 * @interface Article
 * 
 */
interface Article {
  /**
     * 作者ID
     * @type {number}
     * @memberof Article
     */
  authorId?: number;
  /**
   * 作者姓名
   * @type {string}
   * @memberof Article
   */
  authorName?: string;
  /**
   * 评论人数
   * @type {number}
   * @memberof Article
   */
  commentCount?: number;
  /**
   * 
   * @type {string}
   * @memberof Article
   */
  content?: string;
  /**
   * 文章封面
   * @type {string}
   * @memberof Article
   */
  cover?: string;
  /**
   * 创建时间
   * @type {string}
   * @memberof Article
   */
  createTime?: string;
  /**
   * 文章ID
   * @type {string}
   * @memberof Article
   */
  id?: string;
  /**
   * 点赞人数
   * @type {number}
   * @memberof Article
   */
  likeCount?: number;
  /**
   * 更新时间
   * @type {string}
   * @memberof Article
   */
  modifiedTime?: string;
  /**
   * 文章标题
   * @type {string}
   * @memberof Article
   */
  title?: string;
  /**
   * 文章二级分类ID
   * @type {string}
   * @memberof Article
   */
  typeId?: string;
  /**
   * 文章一级分类ID
   * @type {string}
   * @memberof Article
   */
  typeParentId?: string;
  /**
   * 浏览数量
   * @type {number}
   * @memberof Article
   */
  viewCount?: number;
}
/**
 *文章查询对象
 *
 * @interface SearchArticle
 */
interface SearchArticle {
  /**
     * 作者姓名
     * @type {string}
     * @memberof SearchArticle
     */
  authorName?: string;
  /**
   * 查询开始时间
   * @type {string}
   * @memberof SearchArticle
   */
  begin?: string;
  /**
   * 最新时间排序
   * @type {boolean}
   * @memberof SearchArticle
   */
  createTimeSort?: boolean;
  /**
   * 查询结束时间
   * @type {string}
   * @memberof SearchArticle
   */
  end?: string;
  /**
   * 点赞次数排序
   * @type {boolean}
   * @memberof SearchArticle
   */
  likeCountSort?: boolean;
  /**
   * 文章名称,模糊查询
   * @type {string}
   * @memberof SearchArticle
   */
  title?: string;
  /**
   * 文章二级分类ID
   * @type {string}
   * @memberof SearchArticle
   */
  typeId?: string;
  /**
   * 文章一级分类ID
   * @type {string}
   * @memberof SearchArticle
   */
  typeParentId?: string;
  /**
   * 浏览量&评论量排序
   * @type {boolean}
   * @memberof SearchArticle
   */
  viewAndCommentSort?: boolean;
}


export { Article, SearchArticle }