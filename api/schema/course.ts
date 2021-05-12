/**
 * 课程
 * @export
 * @interface Course
 */
export interface Course {
  /**
   * 课程ID
   * @type {string}
   * @memberof Course
   */
  courseId?: string;
  /**
   * 创建时间
   * @type {string}
   * @memberof Course
   */
  createTime?: string;
  /**
   * 章节ID
   * @type {string}
   * @memberof Course
   */
  id?: string;
  /**
   * 更新时间
   * @type {string}
   * @memberof Course
   */
  modifiedTime?: string;
  /**
   * 显示排序
   * @type {number}
   * @memberof Course
   */
  sort?: number;
  /**
   * 章节名称
   * @type {string}
   * @memberof Course
   */
  title?: string;
}


/**
 * 课程查询对象封装
 * @export
 * @interface CourseQuery
 */
export interface CourseQuery {
  /**
   * 查询开始时间
   * @type {string}
   * @memberof CourseQuery
   */
  begin?: string;
  /**
   * 选课数量排序
   * @type {boolean}
   * @memberof CourseQuery
   */
  choiceCountSort?: boolean;
  /**
   * 最新时间排序
   * @type {boolean}
   * @memberof CourseQuery
   */
  createTimeSort?: boolean;
  /**
   * 查询结束时间
   * @type {string}
   * @memberof CourseQuery
   */
  end?: string;
  /**
   * 课程评分排序
   * @type {boolean}
   * @memberof CourseQuery
   */
  scoreSort?: boolean;
  /**
   * 课程状态(字符串)：1、Draft已发布2、Normal未发布
   * @type {string}
   * @memberof CourseQuery
   */
  status?: string;
  /**
   * 二级类别id
   * @type {string}
   * @memberof CourseQuery
   */
  subjectId?: string;
  /**
   * 一级类别id
   * @type {string}
   * @memberof CourseQuery
   */
  subjectParentId?: string;
  /**
   * 讲师id
   * @type {string}
   * @memberof CourseQuery
   */
  teacherId?: string;
  /**
   * 课程名称,模糊查询
   * @type {string}
   * @memberof CourseQuery
   */
  title?: string;
}
