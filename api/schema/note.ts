/**
 * 笔记
 * @export
 * @interface EduNote
 */
export interface EduNote {
  /**
   * 作者ID
   * @type {number}
   * @memberof EduNote
   */
  authorId?: number;
  /**
   * 笔记内容
   * @type {string}
   * @memberof EduNote
   */
  content?: string;
  /**
   * 创建时间
   * @type {string}
   * @memberof EduNote
   */
  createTime?: string;
  /**
   * 笔记ID
   * @type {number}
   * @memberof EduNote
   */
  id?: number;
  /**
   * 更新时间
   * @type {string}
   * @memberof EduNote
   */
  modifiedTime?: string;
  /**
   * 笔记标题
   * @type {string}
   * @memberof EduNote
   */
  title?: string;
  /**
   * 视频ID
   * @type {number}
   * @memberof EduNote
   */
  videoId?: number;
}

export interface NoteQuery {
  /**
   *
   * 笔记名称,模糊查询
   * @type {string}
   * @memberof NoteQuery
   */
  titel?: string,
  /**
   * 查询开始时间
   *
   * @type {string}
   * @memberof NoteQuery
   */
  begin?: string,
  /**
   * 查询结束时间
   *
   * @type {string}
   * @memberof NoteQuery
   */
  end?: string,
}