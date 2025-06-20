import {
  getAction,
  deleteAction,
  putAction,
  postAction,
  postActionWithParams,
  httpAction,
  getActionForBase
} from '@/api/common/manage'
const nameSpace = '/edu-schedule/classChoise/veJwXkdj'

const getList = (params) => postActionWithParams(`${nameSpace}/list`, params);
const getPageList = (params) => postActionWithParams(`${nameSpace}/list`, params);
const detail = (id) => postAction(`${nameSpace}/queryById?id=${id}`);
const create = (params) => postAction(`${nameSpace}/add`, params);
const update = (params) => postAction(`${nameSpace}/edit`, params);
const del = (params) => postAction(`${nameSpace}/delete`, params);
const batchDel = (params) => postAction(`${nameSpace}/deleteBatch`, params); // 批量删除



export default {
  getList,
  getPageList,
  update,
  create,
  del,
  detail,
  batchDel,
}