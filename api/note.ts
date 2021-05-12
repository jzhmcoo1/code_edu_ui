import { service } from '@/utils/request'

import { EduNote, NoteQuery } from './schema/note'
const api_prefix = '/service/note'
export default {
  // 添加笔记
  addNote(noteObj: EduNote) {
    return service({
      url: `${api_prefix}/add`,
      method: 'POST',
      data: noteObj
    })
  },
  // 删除笔记
  deleteNote(noteId: EduNote["id"]) {
    return service({
      url: `${api_prefix}/${noteId}`,
      method: 'delete',
    })
  },
  // 根据笔记ID查看笔记详情
  detailNote(noteId: EduNote["id"]) {
    return service({
      url: `${api_prefix}/get/${noteId}`,
      method: 'get',
    })
  },
  // 根据作者ID查看笔记列表
  pageAuthorNoteList(page: number, limit: number) {
    return service({
      url: `${api_prefix}/user/${page}/${limit}`,
      method: 'get',
    })
  },
  // 判断视频是否有笔记,有笔记则返回笔记ID，无笔记返回空
  checkExistNote(videoId: string) {
    return service({
      url: `${api_prefix}/exist/${videoId}`,
      method: 'get',
    })
  },
  //更新笔记内容
  updateNote(noteObj: EduNote) {
    return service({
      url: `${api_prefix}/update`,
      method: 'post',
      data: noteObj
    })
  },
  // 条件查询笔记
  conditionList(page: number, limit: number, searchObj: NoteQuery) {
    return service({
      url: `${api_prefix}/conditionList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  }
}