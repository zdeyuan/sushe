import {
  getAction,
  deleteAction,
  putAction,
  postAction,
  postActionWithParams,
  httpAction,
  getActionForBase
} from '@/api/common/manage'
const nameSpace = '/edu-schedule/classChoise/veJwXksj'

// const getList = (params) => postAction(`${nameSpace}/list`, params);
const getPageList = (params) => postActionWithParams(`${nameSpace}/list`, params);
const update = (params) => postAction(`${nameSpace}/edit`, params);
const create = (params) => postAction(`${nameSpace}/add`, params);
const detail = (id) => postAction(`${nameSpace}/queryById?id=${id}`);
const batchDel = (ids) => postAction(`${nameSpace}/deleteByStatus?ids=${ids}`); // 批量删除
const batchInvalidStatus = (ids) => postAction(`${nameSpace}/invalidStatus?ids=${ids}`); // 批量失效
const batchValidStatus = (ids) => postAction(`${nameSpace}/validStatus?ids=${ids}`); // 批量有效
const batchDestory = (ids) => postAction(`${nameSpace}/deleteBatch?ids=${ids}`); // 批量销毁
const batchReverse = (ids) => postAction(`${nameSpace}/reverseByStatus?ids=${ids}`); // 批量还原
const exportExcel = (params) => postActionWithParams(`${nameSpace}/exportXls`, params); // 导出Excel


//选择学期
const getSemesterList = (params) => getActionForBase(`/common/veCommon/querySemesterList`, params)
// const getSemesterList = (id) =>getActionForBase(`/common/veCommon/querySemesterList?id=${id}`)


export default {
  // getList,
  getPageList,
  update,
  create,
  detail,
  batchDel,
  batchInvalidStatus,
  batchValidStatus,
  batchDestory,
  batchReverse,
  exportExcel,
  getSemesterList
}