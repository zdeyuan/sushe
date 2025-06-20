/*
 * @Descripttion: 检查记录表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-20
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-20
 */

import http from '@/utils/kq/http'

const veSbzcJzwInspectApi = {
  //添加接口
  add(data){
    return http.post(http.service.sbzc+'veSbzcJzwInspect/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.sbzc+'veSbzcJzwInspect/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.sbzc+'veSbzcJzwInspect/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.sbzc+'veSbzcJzwInspect/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.sbzc+'veSbzcJzwInspect/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.sbzc+'veSbzcJzwInspect/updateStatus',data)
  },

};
export default veSbzcJzwInspectApi;
