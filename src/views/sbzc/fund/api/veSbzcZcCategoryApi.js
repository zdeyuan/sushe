/*
 * @Descripttion: 设备资产分类 参照 JY/T 1001-2012 高等学校固定资产分类及编码 接口
 * @version: 1.0
 * @Author: Adrian Bian
 * @Date: 2021-03-21
 * @LastEditors: Adrian Bian
 * @LastEditTime: 2021-03-21
 */

import http from '@/utils/kq/http'

const veSbzcZcCategoryApi = {
  //添加接口
  add(data){
    return http.post(http.service.sbzc+'veSbzcZcCategory/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.sbzc+'veSbzcZcCategory/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.sbzc+'veSbzcZcCategory/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.sbzc+'veSbzcZcCategory/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.sbzc+'veSbzcZcCategory/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.sbzc+'veSbzcZcCategory/updateStatus',data)
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.sbzc + 'veSbzcZcCategory/all', pageData);
  }

};
export default veSbzcZcCategoryApi;
