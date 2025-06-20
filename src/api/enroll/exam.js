import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/common/manage'
import Vue from 'vue'

// 考试主题
const getExamTopicList = (params) => getAction("/exam/veExamTopic/getList", params);

//试题类型
const getExamTypeList = (params) => getAction("/exam/veExamType/getList", params);

//根据实体类型获取实体列表
const getExamQuestionListByType = (params) => getAction("/exam/veExamQuestion/getList", params);

// 保存试题
const saveExamPaperQuestion = (params) => postAction("/exam/veExamPaperQuestion/save", params);

// 获取试卷题型统计
const getExamPaperQuestionCount = (params) => getAction("/exam/veExamPaperQuestion/countById", params);

// 根据id获取试题信息，生成试卷解析
const getExamQuestionById = (id, params) => getAction(`/exam/veExamQuestion/queryById?id=${id}`, params);

// 通过id查询试卷
const getPaperDetail = (params) => getAction(`/exam/veExamPaper/queryPaperDetail`, params);

// 根据id获取试题信息，弹出试题详情
const getExamQuestionInfoById = (id, params) => getAction(`/exam/veExamQuestion/info?id=${id}`, params);

export {
  getExamTopicList,
  getExamTypeList,
  getExamQuestionListByType,
  saveExamPaperQuestion,
  getExamPaperQuestionCount,
  getExamQuestionById,
  getPaperDetail,
  getExamQuestionInfoById
}
