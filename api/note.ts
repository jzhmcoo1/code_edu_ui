import { service } from '@/utils/request'

interface EduNote {
  authorId: string,//作者ID
  content: string,//笔记内容
  createTime: string,//创建时间
  videoId: string,//视频ID
  id: string,//笔记ID
  typeId: string,//类别ID
  modifiedTime: string//修改时间
  isDeleted: number,//逻辑删除
  title: string,//笔记标题
}

export default {
  // 添加笔记
  addNote(noteObj: EduNote) {
    return service({
      url: '/eduservice/edu-note/addNote',
      method: 'POST',
      data: noteObj
    })
  },
  // 删除笔记
  deleteNote(noteId: EduNote["id"]) {
    return service({
      url: '/eduservice/edu-note/deleteNote',
      method: 'delete',
      params: noteId
    })
  },
  // 根据笔记ID查看笔记详情
  detailNote(noteId: EduNote["id"]) {
    return service({
      url: '/eduservice/edu-note/getNote',
      method: 'get',
      params: noteId
    })
  },
  // 根据作者ID查看笔记列表
  pageAuthorNoteList(AuthorId: string, page: number, limit: number) {
    return service({
      url: '/eduservice/edu-note/getNoteByMember',
      method: 'get',
      params: [AuthorId, page, limit]
    })
  },
  // 判断视频是否有笔记,有笔记则返回笔记ID，无笔记返回空
  checkExistNote(videoId: string) {
    return service({
      url: '/eduservice/edu-note/getNoteId',
      method: 'get',
      params: videoId
    })
  },
  //更新笔记内容
  updateNote(noteObj: EduNote) {
    return service({
      url: '/eduservice/edu-note/updateNote',
      method: 'post',
      data: noteObj
    })
  }
}