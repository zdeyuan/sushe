/*
 * @Descripttion: 项目计划表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-14
 */

import http from '@/utils/kq/http'

const veJkyProjectPlanApi = {
  //添加接口
  add(data){
    return http.post(http.service.jkl+'veJkyProjectPlan/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.jkl+'veJkyProjectPlan/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.jkl+'veJkyProjectPlan/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.jkl+'veJkyProjectPlan/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.jkl+'veJkyProjectPlan/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.jkl+'veJkyProjectPlan/updateStatus',data)
  },

};
export default veJkyProjectPlanApi;
