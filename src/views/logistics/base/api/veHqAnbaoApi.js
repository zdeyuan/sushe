/*
 * @Descripttion: 安保记录表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-03
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-03
 */

import http from '@/utils/kq/http'

const veHqAnbaoApi = {
  //添加接口
  add(data){
    return http.post(http.service.hq+'veHqAnbao/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.hq+'veHqAnbao/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.hq+'veHqAnbao/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.hq+'veHqAnbao/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.hq+'veHqAnbao/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.hq+'veHqAnbao/updateStatus',data)
  },

};
export default veHqAnbaoApi;
