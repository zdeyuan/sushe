/*
 * @Descripttion: 场地借用表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-09 21:51:28
 */

import http from '@/utils/kq/http'

const veSbzcCdApplyApi = {
  //添加接口
  add(data){
    return http.post(http.service.sbzc+'veSbzcCdApply/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.sbzc+'veSbzcCdApply/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.sbzc+'veSbzcCdApply/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.sbzc+'veSbzcCdApply/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.sbzc+'veSbzcCdApply/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.sbzc+'veSbzcCdApply/updateStatus',data)
  },

};
export default veSbzcCdApplyApi;
