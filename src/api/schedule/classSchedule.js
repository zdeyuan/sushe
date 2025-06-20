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

const nameSpace = '/edu-schedule/classSchedule'
const tnameSpace='/classSchedule'
// 排课课表
const getClassSchedule = params => postAction(`${nameSpace}/veJwPaike/list`, params);

// 新增排课信息
const addClassSchedule = (params) => postAction(`${nameSpace}/veJwPaike/add`, params)

// 修改排课信息
const updateClassSchedule = (params) => postAction(`${nameSpace}/veJwPaike/edit`, params)

//排课信息（课表）明细
const getClassScheduleDetail = (pkid) => postAction(`${nameSpace}/veJwPkmx/list?pkid=${pkid}`)

//清空课表明细
const removeClassDetail = (pkId) => postAction((`${nameSpace}/veJwPkmx/deleteByPkId?pkId=${pkId}`))

//排课节列表
const getScheduleNodeList = (params = {}) => postAction(`${nameSpace}/veJwSection/list`, params)
//获取学生下的排课信息
const getScheduleNodeListbyStudent = (params = {}) => getAction(`/jxrw/kbcx/wdkb`)
//课程
const getCourseList =(semid,jxbid) =>postAction(`${nameSpace}/veJwJxrw/rwkcList?semid=${semid}&jxbid=${jxbid}`)

//排课明细新增
const scheduleDetailAdd = (params) =>postAction(`${nameSpace}/veJwPkmx/add`,params);
//排课明细修改
const scheduleDetailEdit = (params) =>postAction(`${nameSpace}/veJwPkmx/edit`,params);

//教室不排课时间列表
const getClassroomNoScheduleList = (params) =>postActionWithParams(`${nameSpace}/veJwJsbpksz/list`,params);

//教室不排课时间设置
const setNoScheduleForRoom = (classroomid,params) =>postAction(`${nameSpace}/veJwJsbpksz/setNoScheduleForRoom?classroomid=${classroomid}`,params);

//教室不排课时间删除
const setNoScheduleDelete = (ids) =>postAction(`${nameSpace}/veJwJsbpksz/deleteBatch?ids=${ids}`);
//教室不排课时间新增
const setNoScheduleAdd = (params) =>postAction(`${nameSpace}/veJwJsbpksz/add`,params);


//教师不排课时间列表
const getTeacherNoScheduleList = (params) =>postActionWithParams(`${nameSpace}/veJwJsbpksj/list`,params);


//教师不排课时间设置
const setNoScheduleForTeacher = (teacherid,params) =>postAction(`${nameSpace}/veJwJsbpksj/setNoScheduleForTeacher?teacherid=${teacherid}`,params);

//教师不排课时间删除
const setTeacherNoScheduleDelete = (ids) =>postAction(`${nameSpace}/veJwJsbpksj/deleteBatch?ids=${ids}`);
//教师不排课时间新增
const setTeacherNoScheduleAdd = (params) =>postAction(`${nameSpace}/veJwJsbpksj/add`,params);

const getClassesByTeacher = (params) => getActionForBase(`${tnameSpace}/veJwSection/queryBanjiBySemId`,params)
export {
  getClassSchedule,
  addClassSchedule,
  getScheduleNodeListbyStudent,
  updateClassSchedule,
  getClassScheduleDetail,
  removeClassDetail,
  getScheduleNodeList,
  getCourseList,
  scheduleDetailAdd,
  scheduleDetailEdit,
  getClassroomNoScheduleList,
  setNoScheduleForRoom,
  setNoScheduleAdd,
  setNoScheduleDelete,
  getTeacherNoScheduleList,
  setNoScheduleForTeacher,
  setTeacherNoScheduleDelete,
  setTeacherNoScheduleAdd,
  getClassesByTeacher
}