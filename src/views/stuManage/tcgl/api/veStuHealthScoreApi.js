/*
 * @Descripttion: 体质健康表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18
 */
import http from '@/utils/kq/http'
const url = http.service.sanming;
const veStuHealthScoreApi = {
    //分页查询接口
    page(pageData){
        return http.post(url+'veStuHealthScore/list',pageData)
    },
    //批量保存
    saveBatch(dataList){
        return http.post(url+'veStuHealthScore/saveBatch',dataList)
    },

    // 参数生成
    getParams(params) {
        let conditions = [];
        let queryParam = {};
        for (var i = 0; i < params.conditions.length; i++){
            let conditionOld = params.conditions[i]
            // conditions.push({operator:conditionOld.operator,column:conditionOld.column.replace('_i','I'),value:conditionOld.value})
            queryParam[conditionOld.column.replace('_i','I')] = conditionOld.value
            conditions.push({operator:conditionOld.operator,column:'s.'+conditionOld.column,value:conditionOld.value})
            // queryParam['s.'+conditionOld.column] = conditionOld.value
        }

        /* 测试数据
        conditions.push({operator:'eq',column:'s.fal_id',value:3})
        conditions.push({operator:'eq',column:'s.spec_id',value:9})
        conditions.push({operator:'eq',column:'s.bj_id',value:22})
        //*/

        params.conditions = conditions;
        params.query = queryParam;
        if (!queryParam.bjId) {
            return false;
        }
        params.size = 99;
        return params;
    },

    // 获取年级(一、二、三)
    getTerm(startYear){	//取入学年份
        let date=new Date;	//当前时间
        let year=date.getFullYear();	//现在年份
        let month=date.getMonth()+1;    //getMonth()获取当前月份(0-11,0代表1月)
        let term = (year - startYear)*2 + parseInt(month/9);	//学期
        let yTermValue = year - startYear + parseInt(month/9); //计算学年，如2018-2019学年两个学期值都是2018，方便写入选择器
        if (yTermValue > 3) {
            yTermValue = 3;
        }
        return yTermValue;
    },
};
export default veStuHealthScoreApi;