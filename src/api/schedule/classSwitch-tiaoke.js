import {
  getAction,
  deleteAction,
  putAction,
  postAction,
  postActionWithParams,
  httpAction,
  getActionForBase
} from '@/api/common/manage'
const nameSpace = '/edu-schedule/classSwitch/veJwTiaoke'

// const getList = (params) => postAction(`${nameSpace}/list`, params);
const getPageList = (params) => postActionWithParams(`${nameSpace}/list`, params);
const update = (params) => postAction(`${nameSpace}/edit`, params);
const create = (params) => postAction(`${nameSpace}/add`, params);
const detail = (id) => postAction(`${nameSpace}/queryById?id=${id}`);
const batchNoPass = (ids) => postAction(`${nameSpace}/noPass?ids=${ids}`); // 批量不通过
const batchPass = (ids) => postAction(`${nameSpace}/pass?ids=${ids}`); // 批量通过

const notice = (params) => postActionWithParams(`${nameSpace}/notice`, params); // 调课通知


export default {
  // getList,
  getPageList,
  update,
  create,
  detail,
  batchNoPass,
  batchPass,
  notice
}