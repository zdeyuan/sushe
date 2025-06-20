import { getAction, deleteAction, putAction, postAction, postActionWithParams,httpAction,getActionForBase } from '@/api/common/manage'
import Vue from 'vue'


//排课参数配置查询
const parameter = (id,params) =>postAction(`/edu-schedule/classSchedule/veJwPkpz/queryById?id=${1}`,params)
//排课参数修改
const parameterMod = (params) =>postAction('/edu-schedule/classSchedule/veJwPkpz/edit',params)
//排课节设置
const nodeSet = (params) =>postAction('/edu-schedule/classSchedule/veJwSection/list',params)
//排课节设置-通过id查询
const nodeSetId = (id) =>postAction(`/edu-schedule/classSchedule/veJwSection/queryById?id=${id}`)
//排课节设置-编辑
const nodeSetEdit = (params) =>postAction('/edu-schedule/classSchedule/veJwSection/edit',params)
//排课节不排课
const noNode = (ids) =>postAction(`/edu-schedule/classSchedule/veJwSection/canNotSchedule?ids=${ids}`)
//排课节排课
const node = (ids) =>postAction(`/edu-schedule/classSchedule/veJwSection/canSchedule?ids=${ids}`)
//全校不排课时间
const wholeSchool = (params) =>postAction('/edu-schedule/classSchedule/veJwBpksj/list',params)
//全校不排课时间保存
const wholeSchoolBC = (params) =>postAction('/edu-schedule/classSchedule/veJwBpksj/setNoSchedule',params)
//教室不排课时间
const wholeClass = (classroomid) =>postAction(`/edu-schedule/classSchedule/veJwJsbpksz/list?classroomid=${classroomid}`)
//教室不排课保存
const wholeClassBc = (classroomid,params) =>postAction(`/edu-schedule/classSchedule/veJwJsbpksz/setNoScheduleForRoom?classroomid=${classroomid}`,params)
//排课执行学期
const semester = (id) =>getActionForBase(`/common/veCommon/querySemesterList?id=${id}`)
//专业部
const majorS = (id) =>getActionForBase(`/common/veCommon/queryFacultyList?id=${id}`)
//专业
const major = (id,falId) =>getActionForBase(`/common/veCommon/querySpecialtyListByFalId?id=${id}&falId=${falId}`)
// 所有专业
const majorAll = (params) =>getActionForBase(`/common/veBase/getSpecialtyPageList`,params)
//班级
const classGrade = (id,specId) =>getActionForBase(`/common/veCommon/queryBanJiListBySpecId?id=${id}&specId=${specId}`)
//排课课表
const classSchedule = (jxbid,semid) =>postAction(`/edu-schedule/classSchedule/veJwPaike/list?jxbid=${jxbid}&semid=${semid}`)
//添加课表

const  classScheduleAdd = (params) =>postAction('/edu-schedule/classSchedule/veJwPaike/add',params)
//课表明细
const detail = (pkid) =>postAction(`/edu-schedule/classSchedule/veJwPkmx/list?pkid=${pkid}`)
//学期课表明细
const detailBysemid = (semid) =>postAction(`/edu-schedule/classSchedule/veJwPkmx/list?semid=${semid}`)
//手动排课
const manual = (params) =>postAction('/edu-schedule/classSchedule/veJwPkmx/add',params)
//清空课表
const dellClass = (pkId) =>postAction((`/edu-schedule/classSchedule/veJwPkmx/deleteByPkId?pkId=${pkId}`))
//自动排课列表
const volunList = (pageNo,pageSize) =>postAction(`/edu-schedule/classSchedule/veJwPaike/scheduleCount?pageNo=${pageNo}&pageSize=${pageSize}`)
//自动排课
const volun = (params) =>postAction(`/edu-schedule/classSchedule/veJwPaike/autoSchedule`,params)
//课程
const curriculum =(semid,jxbid) =>postAction(`/edu-schedule/classSchedule/veJwJxrw/rwkcList?semid=${semid}&jxbid=${jxbid}`)
//校区
const campus = (id) =>getActionForBase(`/common/veCommon/queryCampusList?id=${id}`)
//教学楼
const AcademicBuilding = (params) =>getActionForBase('/common/veBase/getBuildList',params)
//教室
const classroom = (buildName) =>getActionForBase(`/common/veIntegration/getBuildRoomPageList?buildName=${buildName}`)
//教师
const teacher = (id) =>getActionForBase(`/common/veCommon/queryDepartmentAndTeacherList?id=${id}`)
//教师不排课
const teacherList = (teacherid) =>postAction(`/edu-schedule/classSchedule/veJwJsbpksj/list?teacherid=${teacherid}`)
//教师不排课保存
const teacherbc = (teacherid,params) =>postAction(`/edu-schedule/classSchedule/veJwJsbpksj/setNoScheduleForTeacher?teacherid=${teacherid}`,params)
//获取当前老师的班级
const classListByTeacherCode = (params) =>getAction(`/classSchedule/veJwPkmx/teacherSmeIds`,params);
//获取当前老师的班级
const schedulingByTeacher = (params) =>getAction(`/classSchedule/veJwPkmx/teacherkcb`,params)
export {
  classSchedule,
  schedulingByTeacher,
  parameter,
  parameterMod,
  nodeSet,
  nodeSetId,
  nodeSetEdit,
  noNode,
  node,
  wholeSchool,
  wholeSchoolBC,
  wholeClass,
  wholeClassBc,
  semester,
  majorS,
  major,
  majorAll,
  classGrade,
  classScheduleAdd,
  detail,
  detailBysemid,
  manual,
  dellClass,
  volun,
  volunList,
  curriculum,
  campus,
  AcademicBuilding,
  classroom,
  teacher,
  teacherList,
  teacherbc,
  classListByTeacherCode
}