import { getAction, deleteAction, putAction, postAction, httpAction, getActionForBase } from '@/api/common/manage';
import { childSycId } from '@/config'
const nameSpace = process.env.VUE_APP_API_BASE_URL+'/common/veCommon'
const defaultParams = { id: childSycId } // 子系统id
//获取院系
export const queryFacultyList = params => getActionForBase(`${nameSpace}/queryFacultyList`, {...params, ...defaultParams})
//获取专业
export const querySpecialtyListByFalId = params => getActionForBase(`${nameSpace}/querySpecialtyListByFalId`, {...params, ...defaultParams})
//获取年级
export const queryGradeList = params => getActionForBase(`${nameSpace}/queryGradeList`, {...params, ...defaultParams})
//获取班级
export const queryBanJiListBySpecId = params => getActionForBase(`${nameSpace}/queryBanJiListBySpecId`, {...params, ...defaultParams})
//获取校区
export const queryCampusList = params => getActionForBase(`${nameSpace}/queryCampusList`, {...params, ...defaultParams})
// 班级分页: 不需要传'id'
export const queryBanJiPageList = params => getActionForBase(`${nameSpace}/queryBanJiPageList`, {...params})

export const getStudentPageList = params => getActionForBase(`${nameSpace}/getStudentPageList`, params);

//选择学期
export const querySemesterList = (id) =>getActionForBase(`${nameSpace}/querySemesterList?id=${id}`)

//教学楼
export const queryBuildListByCampusId = (params) => getActionForBase(`${nameSpace}/queryBuildListByCampusId`, {
  ...params
})
//教研组树
export const queryJYZTreeList = (params = {}) => getActionForBase(`${nameSpace}/queryJYZTreeList`, {
  ...params
})
//教师
export const queryTeacherList = (params) => getActionForBase(`${nameSpace}/queryTeacherListByJYZId`,{...params})
//教师详情
export const queryTeacherById = (params) => getActionForBase(`${nameSpace}/queryTeacherById`,{...params})
export const queryTeacherByUserId=(params) => getActionForBase(`${nameSpace}/queryTeacherByUserId`,{...params})
export default {
  queryTeacherByUserId,
  queryFacultyList,
  querySpecialtyListByFalId,
  queryBanJiListBySpecId,
  getStudentPageList,
  queryGradeList,
  queryCampusList,
  queryBanJiPageList,
  queryBuildListByCampusId,
  queryJYZTreeList,
  queryTeacherById,
  queryTeacherList
}
