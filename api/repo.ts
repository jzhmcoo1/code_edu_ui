import { gitService, gitBackService } from '@/utils/request'
// 获取仓库的提交记录
export default {
  getCommitRecords(page = 1, per_page = 20) {
    return gitService({
      url: '/commits',
      params: { page, per_page },
    })
  },
  getBackCommitRecords(page = 1, per_page = 20) {
    return gitBackService({
      url: '/commits',
      params: { page, per_page }
    })
  }
}