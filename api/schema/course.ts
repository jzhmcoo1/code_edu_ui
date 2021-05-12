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
 * @interface SearchCourse
 */
export interface SearchCourse {
  /**
   * 查询开始时间
   * @type {string}
   * @memberof SearchCourse
   */
  begin?: string;
  /**
   * 选课数量排序
   * @type {boolean}
   * @memberof SearchCourse
   */
  choiceCountSort?: boolean;
  /**
   * 最新时间排序
   * @type {boolean}
   * @memberof SearchCourse
   */
  createTimeSort?: boolean;
  /**
   * 查询结束时间
   * @type {string}
   * @memberof SearchCourse
   */
  end?: string;
  /**
   * 课程评分排序
   * @type {boolean}
   * @memberof SearchCourse
   */
  scoreSort?: boolean;
  /**
   * 课程状态(字符串)：1、Draft已发布2、Normal未发布
   * @type {string}
   * @memberof SearchCourse
   */
  status?: string;
  /**
   * 二级类别id
   * @type {string}
   * @memberof SearchCourse
   */
  subjectId?: string;
  /**
   * 一级类别id
   * @type {string}
   * @memberof SearchCourse
   */
  subjectParentId?: string;
  /**
   * 讲师id
   * @type {string}
   * @memberof SearchCourse
   */
  teacherId?: string;
  /**
   * 课程名称,模糊查询
   * @type {string}
   * @memberof SearchCourse
   */
  title?: string;
}

/**
 * 用户评价课程信息表
 * @export
 * @interface CourseMark
 */
export interface CourseMark {
  /**
   * 用户头像
   * @type {string}
   * @memberof CourseMark
   */
  avatar?: string;
  /**
   * 评价内容
   * @type {string}
   * @memberof CourseMark
   */
  content?: string;
  /**
   * 创建时间
   * @type {string}
   * @memberof CourseMark
   */
  createTime?: string;
  /**
   * 被评价对象的id
   * @type {string}
   * @memberof CourseMark
   */
  evaluatedId?: string;
  /**
   * 主键id
   * @type {number}
   * @memberof CourseMark
   */
  id?: number;
  /**
   * 更新时间
   * @type {string}
   * @memberof CourseMark
   */
  modifiedTime?: string;
  /**
   * 用户昵称
   * @type {string}
   * @memberof CourseMark
   */
  nickname?: string;
  /**
   * 评分(小数点后只能有一位)
   * @type {number}
   * @memberof CourseMark
   */
  score?: number;
  /**
   * 被评价对象的类型
   * @type {string}
   * @memberof CourseMark
   */
  type?: string;
  /**
   * 用户id
   * @type {number}
   * @memberof CourseMark
   */
  userId?: number;
}