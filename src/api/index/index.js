import { getAction, deleteAction, putAction, postAction, postActionWithParams,httpAction,getActionForBase } from '@/api/common/manage'
import Vue from 'vue'
// 获取统计
const getCount=()=>getAction(`/sys/processInstance/processProportion`);
const setReadAnnount=(params)=>getAction(`/sys/annountCement/readMsg`,params);
//系统通知列表
const annountCement = (params) =>getAction(`/sys/annountCement/list`,params)
//系统通知新增
const annountCementadd = (id,params) =>postAction(`/sys/annountCement/add`,params)
const getCementById=(params) =>getAction(`/sys/annountCement/queryById`,params);
const getNoReadAnnount=() =>getAction(`/sys/annountCement/listByUser`)
export {
	getCount,
	annountCement,
	getCementById,
	getNoReadAnnount,
	annountCementadd,
	setReadAnnount
}