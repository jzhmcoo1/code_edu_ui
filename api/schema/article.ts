/**
 * 文章对象
 *
 * @interface Article
 * 
 */
export interface Article {
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
 * @interface ArticleQuery
 */
export interface ArticleQuery {
  /**
     * 作者姓名
     * @type {string}
     * @memberof ArticleQuery
     */
  authorName?: string;
  /**
   * 查询开始时间
   * @type {string}
   * @memberof ArticleQuery
   */
  begin?: string;
  /**
   * 最新时间排序
   * @type {boolean}
   * @memberof ArticleQuery
   */
  createTimeSort?: boolean;
  /**
   * 查询结束时间
   * @type {string}
   * @memberof ArticleQuery
   */
  end?: string;
  /**
   * 点赞次数排序
   * @type {boolean}
   * @memberof ArticleQuery
   */
  likeCountSort?: boolean;
  /**
   * 文章名称,模糊查询
   * @type {string}
   * @memberof ArticleQuery
   */
  title?: string;
  /**
   * 文章二级分类ID
   * @type {string}
   * @memberof ArticleQuery
   */
  typeId?: string;
  /**
   * 文章一级分类ID
   * @type {string}
   * @memberof ArticleQuery
   */
  typeParentId?: string;
  /**
   * 浏览量&评论量排序
   * @type {boolean}
   * @memberof ArticleQuery
   */
  viewAndCommentSort?: boolean;
}

