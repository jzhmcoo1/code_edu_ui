/**
 * 多级评论
 * @export
 * @interface Comment
 */
export interface Comment {
  /**
   * 会员头像
   * @type {string}
   * @memberof Comment
   */
  avatar?: string;
  /**
   * 评论内容
   * @type {string}
   * @memberof Comment
   */
  content?: string;
  /**
   * 创建时间
   * @type {string}
   * @memberof Comment
   */
  createTime?: string;
  /**
   * ID
   * @type {string}
   * @memberof Comment
   */
  id?: string;
  /**
   * 逻辑删除 1（true）已删除， 0（false）未删除
   * @type {number}
   * @memberof Comment
   */
  isDeleted?: number;
  /**
   * 会员id
   * @type {string}
   * @memberof Comment
   */
  memberId?: string;
  /**
   * 更新时间
   * @type {string}
   * @memberof Comment
   */
  modifiedTime?: string;
  /**
   * 会员昵称
   * @type {string}
   * @memberof Comment
   */
  nickname?: string;
  /**
   * 父类id
   * @type {string}
   * @memberof Comment
   */
  parentId?: string;
  /**
   * 课程id
   * @type {string}
   * @memberof Comment
   */
  relatedId?: string;
  /**
   * 被回复者
   * @type {string}
   * @memberof Comment
   */
  replyTo?: string;
  /**
   * 评论类型
   * @type {number}
   * @memberof Comment
   */
  type?: number;
}