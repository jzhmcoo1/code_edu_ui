/**
 * 课程视频
 * @export
 * @interface Video
 */
export interface Video {
  /**
   * 章节ID
   * @type {string}
   * @memberof Video
   */
  chapterId?: string;
  /**
   * 课程ID
   * @type {string}
   * @memberof Video
   */
  courseId?: string;
  /**
   * 创建时间
   * @type {string}
   * @memberof Video
   */
  createTime?: string;
  /**
   * 视频时长（秒）
   * @type {number}
   * @memberof Video
   */
  duration?: number;
  /**
   * 视频ID
   * @type {string}
   * @memberof Video
   */
  id?: string;
  /**
   * 是否可以试听：0收费 1免费
   * @type {number}
   * @memberof Video
   */
  isFree?: number;
  /**
   * 更新时间
   * @type {string}
   * @memberof Video
   */
  modifiedTime?: string;
  /**
   * 播放次数
   * @type {number}
   * @memberof Video
   */
  playCount?: number;
  /**
   * 视频源文件大小（字节）
   * @type {number}
   * @memberof Video
   */
  size?: number;
  /**
   * 排序字段
   * @type {number}
   * @memberof Video
   */
  sort?: number;
  /**
   * Empty未上传 Transcoding转码中  Normal正常
   * @type {string}
   * @memberof Video
   */
  status?: string;
  /**
   * 节点名称
   * @type {string}
   * @memberof Video
   */
  title?: string;
  /**
   * 乐观锁
   * @type {number}
   * @memberof Video
   */
  version?: number;
  /**
   * 原始文件名称
   * @type {string}
   * @memberof Video
   */
  videoOriginalName?: string;
  /**
   * 云端视频资源
   * @type {string}
   * @memberof Video
   */
  videoSourceId?: string;
}