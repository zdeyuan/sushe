/*
 * @Descripttion: 场地类型 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-09 22:06:33
 */

import http from '@/utils/kq/http'

const veSbzcCdCategoryApi = {
  //添加接口
  add(data){
    return http.post(http.service.sbzc+'veSbzcCdCategory/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.sbzc+'veSbzcCdCategory/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.sbzc+'veSbzcCdCategory/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.sbzc+'veSbzcCdCategory/page',pageData)
  },
  //分页查询接口
  all(pageData){
    return http.post(http.service.sbzc+'veSbzcCdCategory/all',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.sbzc+'veSbzcCdCategory/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.sbzc+'veSbzcCdCategory/updateStatus',data)
  },

};
export default veSbzcCdCategoryApi;
