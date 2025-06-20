/*
 * @Descripttion: 资源引入表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-14
 */

import http from '@/utils/kq/http'

const veJkyResourceApi = {
  //添加接口
  add(data){
    return http.post(http.service.jkl+'veJkyResource/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.jkl+'veJkyResource/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.jkl+'veJkyResource/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.jkl+'veJkyResource/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.jkl+'veJkyResource/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.jkl+'veJkyResource/updateStatus',data)
  },

};
export default veJkyResourceApi;
