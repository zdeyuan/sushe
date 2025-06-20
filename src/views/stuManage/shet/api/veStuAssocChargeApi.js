/*
 * @Descripttion: 社团负责人 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-22
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-22
 */

import http from '@/utils/kq/http'

const veStuAssocChargeApi = {
  //添加接口
  add(data){
    return http.post(http.service.stu+'veStuAssocCharge/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.stu+'veStuAssocCharge/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.stu+'veStuAssocCharge/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.stu+'veStuAssocCharge/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.stu+'veStuAssocCharge/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.stu+'veStuAssocCharge/updateStatus',data)
  },

};
export default veStuAssocChargeApi;
