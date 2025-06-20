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

const getPageList = params => postActionWithParams('/edu-schedule/classChoise/veJwXkms/list', params)
const create = params => postAction('/edu-schedule/classChoise/veJwXkms/add', params)

const update = params => postAction('/edu-schedule/classChoise/veJwXkms/edit', params)
// const del = params => postAction('/edu-schedule/classChoise/veJwXkms/list', params)
const detail = params => postActionWithParams('/edu-schedule/classChoise/veJwXkms/queryById', params)
// 批量销毁
const batchOff = params => postActionWithParams('/edu-schedule/classChoise/veJwXkms/deleteBatch', params)
// 批量还原
const batchReverse = params => postActionWithParams('/edu-schedule/classChoise/veJwXkms/reverseByStatus', params)
// 批量删除
const batchDel = params => postActionWithParams('/edu-schedule/classChoise/veJwXkms/deleteByStatus', params)

export default {
  getPageList,
  create,
  update,
  batchOff,
  batchDel,
  batchReverse,
  detail
}
