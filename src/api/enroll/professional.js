import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/common/manage'
import Vue from 'vue'


//专业课程管理
const professional = (params) =>postAction("/edu-course/course/veCuzTerminal/list",params)
//创建课程
const professionalAdd = (params) =>postAction("/edu-course/course/veCuzTerminal/add",params)
//所属专业
const Major = (params) =>postAction("/edu-user/user/veBaseDepartment/department",params)


//回收站
const reList = (params) =>postAction("/edu-course/course/veCuzTerminal/list",params)
//恢复
const reNewCourse = (params) =>postAction("/edu-course/course/veCuzTerminal/reNewCourse",params)


export {
  professional,
  professionalAdd,
  reList,
  reNewCourse,
  Major
}