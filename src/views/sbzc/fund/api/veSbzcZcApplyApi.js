/*
 * @Descripttion: 设备资产借领表 接口
 * @version: 1.0
 * @Author: Adrian Bian
 * @Date: 2021-03-22
 * @LastEditors: Adrian Bian
 * @LastEditTime: 2021-03-22
 */

import http from '@/utils/kq/http'

const veSbzcZcApplyApi = {
  //添加接口
  add(data){
    return http.post(http.service.sbzc+'veSbzcZcApply/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.sbzc+'veSbzcZcApply/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.sbzc+'veSbzcZcApply/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.sbzc+'veSbzcZcApply/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.sbzc+'veSbzcZcApply/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.sbzc+'veSbzcZcApply/updateStatus',data)
  },

};
export default veSbzcZcApplyApi;
