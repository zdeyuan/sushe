/*
 * @Descripttion: 会议提醒表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-14
 */

import http from '@/utils/kq/http'

const veJkyMeetRemindApi = {
  //添加接口
  add(data){
    return http.post(http.service.jkl+'veJkyMeetRemind/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.jkl+'veJkyMeetRemind/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.jkl+'veJkyMeetRemind/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.jkl+'veJkyMeetRemind/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.jkl+'veJkyMeetRemind/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.jkl+'veJkyMeetRemind/updateStatus',data)
  },

};
export default veJkyMeetRemindApi;
