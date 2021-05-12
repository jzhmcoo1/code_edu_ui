/**
 * 用户评价课程信息表
 * @export
 * @interface Evaluation
 */
export interface Evaluation {
  /**
   * 用户头像
   * @type {string}
   * @memberof Evaluation
   */
  avatar?: string;
  /**
   * 评价内容
   * @type {string}
   * @memberof Evaluation
   */
  content?: string;
  /**
   * 创建时间
   * @type {string}
   * @memberof Evaluation
   */
  createTime?: string;
  /**
   * 被评价对象的id
   * @type {string}
   * @memberof Evaluation
   */
  evaluatedId?: string;
  /**
   * 主键id
   * @type {number}
   * @memberof Evaluation
   */
  id?: number;
  /**
   * 更新时间
   * @type {string}
   * @memberof Evaluation
   */
  modifiedTime?: string;
  /**
   * 用户昵称
   * @type {string}
   * @memberof Evaluation
   */
  nickname?: string;
  /**
   * 评分(小数点后只能有一位)
   * @type {number}
   * @memberof Evaluation
   */
  score?: number;
  /**
   * 被评价对象的类型,course/teacher
   * @type {string}
   * @memberof Evaluation
   */
  type?: string;
  /**
   * 用户id
   * @type {number}
   * @memberof Evaluation
   */
  userId?: number;
}