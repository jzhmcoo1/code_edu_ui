export interface EduMessage {
  content: string,	//回复内容		
  createTime: string//创建时间
  id: string	//ID
  isRead: number	//已读
  link: string	//跳转链接
  memberId: string//	接受消息成员id
  modifiedTime: string	//更新时间
  senderName: string//	发送者昵称
  type: number //类型
}