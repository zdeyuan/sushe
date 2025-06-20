/*
 * @Descripttion: 研究指导表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-14
 */

import http from '@/utils/kq/http'

const veJkyGuideApi = {
  //添加接口
  add(data){
    return http.post(http.service.jkl+'veJkyGuide/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.jkl+'veJkyGuide/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.jkl+'veJkyGuide/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.jkl+'veJkyGuide/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.jkl+'veJkyGuide/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.jkl+'veJkyGuide/updateStatus',data)
  },

};
export default veJkyGuideApi;
