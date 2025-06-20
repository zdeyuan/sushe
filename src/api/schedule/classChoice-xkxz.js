import { getAction, deleteAction, putAction, postAction,postActionWithParams, httpAction, getActionForBase } from '@/api/common/manage'

const nameSpace = '/edu-schedule/classChoise/veJwXkxz'

export const getPageList = params => postActionWithParams(`${nameSpace}/list`, params)
export const getStudentInfoList = params => postActionWithParams('/edu-schedule/classChoise/veJwXkxzxs/list', params)
export const create = params => postAction(`${nameSpace}/add`, params)
export const update = params => postAction(`${nameSpace}/edit`, params)
//销毁
export const batchDel = params => postActionWithParams(`${nameSpace}/deleteBatch`, params)
//删除
export const batchDeleteByStatus = params => postActionWithParams(`${nameSpace}/deleteByStatus`, params)
export const del = params => postActionWithParams(`${nameSpace}/delete`, params)
export const detail = params => postActionWithParams(`${nameSpace}/queryById`, params)
export const setValidStatus = params => postActionWithParams(`${nameSpace}/validStatus`, params)
export const setInvalidStatus = params => postActionWithParams(`${nameSpace}/invalidStatus`, params)
export const exportXls = params => getAction(`${nameSpace}/exportXls`, params)
//还原
export const batchReverseByStatus = (params)=> postActionWithParams(`${nameSpace}/reverseByStatus`, params)
export default {
  getPageList,
  getStudentInfoList,
  create,
  update,
  batchDel,
  del,
  detail,
  setValidStatus,
  setInvalidStatus,
  exportXls,
  batchDeleteByStatus,
  batchReverseByStatus
}
