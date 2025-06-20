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
const isProd = process.env.NODE_ENV === 'production'
const nameSpace = `${isProd ? '' :'http://150.242.97.194:14010'}/common/veIntegration`;
const defaultParams = {
  id: childSycId
} // 子系统id
//教室
export const getClassRoomList = (params) => getActionForBase(`${nameSpace}/getBuildRoomPageList`, {
  ...params
})

export default {
  getClassRoomList
}