import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/manage'
import Vue from 'vue'

//课程分类管理列表
const categoryList = (params) => postAction("/edu-course/course/veCuzCategory/categoryList", params);
//课程分类添加
const categoryadd = (params) => postAction("/edu-course/course/veCuzCategory/add",params);
//课程分类修改
const categoryedit = (params) => postAction("/edu-course/course/veCuzCategory/edit",params);
//课程分类删除
const categorydelete = (id) => postAction(`/edu-course/course/veCuzCategory/delete/${id}`,id);

// 成绩考核项列表
const assessList = (params) => postAction("/edu-course/course/veTeachWeights/list",params);
// 成绩考核项添加
const assessAdd = (params) => postAction("/edu-course/course/veTeachWeights/add",params);
// 成绩考核项修改
const assessAEdit = (params) => postAction("/edu-course/course/veTeachWeights/edit",params);
// 成绩考核项启动
const stopAdmin = (params) => postAction("/edu-course/course/veTeachWeights/stopAdmin",params);

// 项目课程查看列表
const teachPageList = (params) => postAction("/edu-course/course/veCuzTerminal/list",params);


export {
    categoryList,
    categoryadd,
    categoryedit,
    categorydelete,
    assessList,
    assessAdd,
    assessAEdit,
    stopAdmin,
    teachPageList
}