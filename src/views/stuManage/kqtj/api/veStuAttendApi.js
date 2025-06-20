/*
 * @Descripttion: 学生考勤表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18
 */

import http from '@/utils/kq/http'
const url = http.service.sanming;
const veStuAttendApi = {
    //添加接口
    add(data){
        return http.post(url+'veStuAttend/add',data)
    },
    //删除接口
    delete(ids){
        return http.delete(url+'veStuAttend/deleteBatch?ids='+ids)
    },
    //修改接口
    update(data){
        return http.put(url+'veStuAttend/edit',data)
    },
    //分页查询接口
    page(pageData){
        return http.post(url+'veStuAttend/list',pageData)
    },
    //分页统计查询接口
    count(pageData){
        return http.post(url+'veStuAttend/page',pageData)
    },
    //查询单个数据接口
    get(id){
        return http.get(url+'veStuAttend/queryById',{id:id})
    },

    all(data){
        return http.post(url+'veStuAttend/all',data)
    },


    /**
     *  其他项目接口
     */
    // 周课表
    weekSchedule(pageData){
        return http.post(url+'veStuAttend/weekSchedule',pageData)
    },
    // 课程列表
    queryCourseList(data){
        return http.post(url+'veStuAttend/queryCourseList',data)
    },
    // 获取学生个人成绩单
    getStuScoreMap(id){
        return http.post(url+'veStuAttend/getStuScore',{stuId:id})
    },
};
export default veStuAttendApi;