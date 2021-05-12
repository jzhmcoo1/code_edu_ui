/**
 * 讲师查询对象封装
 * @export
 * @interface TeacherQuery
 */
export interface TeacherQuery {
  /**
   * 查询开始时间
   * @type {string}
   * @memberof TeacherQuery
   */
  begin?: string;
  /**
   * 查询结束时间
   * @type {string}
   * @memberof TeacherQuery
   */
  end?: string;
  /**
   * 管理员名称,模糊查询
   * @type {string}
   * @memberof TeacherQuery
   */
  name?: string;
}


/**
 * 讲师
 * @export
 * @interface Teacher
 */
export interface Teacher {
  /**
   * 用户头像
   * @type {string}
   * @memberof Teacher
   */
  avatar?: string;
  /**
   * 创建时间
   * @type {string}
   * @memberof Teacher
   */
  createTime?: string;
  /**
   * 用户ID
   * @type {string}
   * @memberof Teacher
   */
  id?: string;
  /**
   * 用户简介
   * @type {string}
   * @memberof Teacher
   */
  intro?: string;
  /**
   * 逻辑删除 1（true）已删除， 0（false）未删除
   * @type {number}
   * @memberof Teacher
   */
  isDeleted?: number;
  /**
   * 更新时间
   * @type {string}
   * @memberof Teacher
   */
  modifiedTime?: string;
  /**
   * 用户名
   * @type {string}
   * @memberof Teacher
   */
  name?: string;
  /**
   * 讲师评分(小数点后只能有一位)
   * @type {number}
   * @memberof Teacher
   */
  score?: number;
  /**
   * 排序
   * @type {number}
   * @memberof Teacher
   */
  sort?: number;
}