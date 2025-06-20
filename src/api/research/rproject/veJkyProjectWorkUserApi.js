/*
 * @Descripttion: 科研项目工作人员表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-14
 */

import http from '@/utils/kq/http'

const veJkyProjectWorkUserApi = {
  //添加接口
  add(data){
    return http.post(http.service.jkl+'veJkyProjectWorkUser/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.jkl+'veJkyProjectWorkUser/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.jkl+'veJkyProjectWorkUser/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.jkl+'veJkyProjectWorkUser/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.jkl+'veJkyProjectWorkUser/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.jkl+'veJkyProjectWorkUser/updateStatus',data)
  },

};
export default veJkyProjectWorkUserApi;
