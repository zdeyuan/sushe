/*
 * @Descripttion: 基础数据 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18
 */
import config from '@/config/config'
import http from '@/utils/kq/http'
const baseUrl = config.service.sys
const userId = '09d5e1e7f9b049008eee645c783a1d67'
const interfaceUserId = 'id'
const baseApi = {
    /*根据专业id取专业信息*/
    getActionZhuanyeById(id) {
        let url = "/common/veCommon/querySpecialtyById?"+interfaceUserId+"="+userId + '&specialtyId='+id;
        return http.get(baseUrl+url);
    },
    /*根据年级id取年级信息*/
    getActionGradeById(id) {
        let url = "/common/veCommon/queryGradeById?"+interfaceUserId+"="+userId + '&gradeId='+id;
        return http.get(baseUrl+url);
    },
    /*根据学期id取学期信息*/
    getActionXueqiById(id) {
        let url = "/common/veCommon/querySemesterById?"+interfaceUserId+"="+userId + '&semesterId='+id;
        return http.get(baseUrl+url);
    },
    /*根据班级id获取班级信息*/
    getActionBanjiById(id) {
        let url = "/common/veCommon/queryBanJiById?"+interfaceUserId+"="+userId + '&banJiId='+id;
        return http.get(baseUrl+url);
    },
    getStudentPageList(id) {
        let url = "/common/veCommon/getStudentPageList?bjId="+id;
        return http.get(baseUrl+url);
    }
};
export default baseApi;
