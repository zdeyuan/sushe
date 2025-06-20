/*
 * @Descripttion: 人员信息表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-03
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-03
 */

import http from '@/utils/kq/http'

const veHqUserApi = {
  //添加接口
  add(data){
    return http.post(http.service.hq+'veHqUser/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.hq+'veHqUser/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.hq+'veHqUser/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.hq+'veHqUser/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.hq+'veHqUser/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.hq+'veHqUser/updateStatus',data)
  },

};
export default veHqUserApi;
