import {
  getAction,
  deleteAction,
  putAction,
  postAction,
  httpAction,
  getActionForBase,
  postActionWithParams
} from '@/api/common/manage'
import {
  childSycId
} from '@/config'
const nameSpace = process.env.VUE_APP_API_BASE_URL+'/common/veBase';
const defaultParams = {
  id: childSycId
} // 子系统id

//教学楼
export const getBuildList = (params) => getActionForBase(`${nameSpace}/getBuildList`, {
  ...params,
  ...defaultParams
})

export default {
  getBuildList
}