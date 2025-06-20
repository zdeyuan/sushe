/*通用模式接口 */
import {
  getAction,
  deleteAction,
  putAction,
  postAction,
  postActionWithParams,
  httpAction,
  getActionForBase
} from '@/api/common/manage'

// export const getKCPageList = params =>
// getAction(window._CONFIG['domianURL2'] + '/common/veIntegration/getKCPageList', params)
export const getSpecialtyPageList = params =>
  getAction(process.env.VUE_APP_API_BASE_URL_BASE + '/common/veCommon/querySpecialtyListByFalId', params)

// 批量保存选课模式课程明细
export const getKCPageList = params => postActionWithParams('/edu-schedule/classChoise/veJwKecheng/list', params)
export default {
  getKCPageList,
  getSpecialtyPageList
}
