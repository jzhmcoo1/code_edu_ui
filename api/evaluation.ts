import { service } from "@/utils/request";
import { Evaluation } from "./schema/evaluation";
const api_prefix = '/service/evaluation'
export default {
  // 添加评价
  addEvaluation(evaluation: Evaluation) {
    return service({
      url: `${api_prefix}`,
      method: 'post',
      data: evaluation
    })
  },
  // 获取评价状态
  getEvaluation(id: Evaluation["evaluatedId"], limit: number, pageNum: number, type: Evaluation["type"]) {
    return service({
      url: `${api_prefix}`,
      method: 'get',
      params: { id, limit, pageNum, type }
    })
  },
  // 修改评价
  updateEvaluation(evaluation: Evaluation) {
    return service({
      url: `${api_prefix}`,
      method: 'put',
      data: evaluation
    })
  },
  // 获取评价列表
  pageEvaluation(id: Evaluation["evaluatedId"], limit: number, pageNum: number, type: Evaluation["type"]) {
    return service({
      url: `${api_prefix}/page`,
      method: 'get',
      params: { id, limit, pageNum, type }
    })
  }
}