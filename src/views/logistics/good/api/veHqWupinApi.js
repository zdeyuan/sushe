/*
 * @Descripttion: 办公物品信息 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-06
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-06
 */

import http from '@/utils/kq/http'

const veHqWupinApi = {
  //添加接口
  add(data){
    return http.post(http.service.hq+'veHqWupin/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.hq+'veHqWupin/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.hq+'veHqWupin/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.hq+'veHqWupin/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.hq+'veHqWupin/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.hq+'veHqWupin/updateStatus',data)
  },

};
export default veHqWupinApi;
