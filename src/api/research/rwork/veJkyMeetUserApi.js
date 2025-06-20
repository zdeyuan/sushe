/*
 * @Descripttion: 会议人员表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-14
 */

import http from '@/utils/kq/http'

const veJkyMeetUserApi = {
  //添加接口
  add(data){
    return http.post(http.service.jkl+'veJkyMeetUser/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.jkl+'veJkyMeetUser/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.jkl+'veJkyMeetUser/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.jkl+'veJkyMeetUser/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.jkl+'veJkyMeetUser/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.jkl+'veJkyMeetUser/updateStatus',data)
  },

};
export default veJkyMeetUserApi;
