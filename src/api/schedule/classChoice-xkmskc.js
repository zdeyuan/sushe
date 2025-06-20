/*选课模式接口 */
import {
  getAction,
  deleteAction,
  putAction,
  postAction,
  postActionWithParams,
  httpAction,
  getActionForBase
} from '@/api/common/manage'

// 批量保存选课模式课程明细
export const saveBatch = params => postAction('/edu-schedule/classChoise/veJwXkmskc/saveBatch', params)
// 查询学科模式课程明细列表
export const getPageList = params => postActionWithParams('/edu-schedule/classChoise/veJwXkmskc/list', params)

export default {
  getPageList,
  saveBatch
}
