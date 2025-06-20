/*
 * @Descripttion: 家庭成员管理 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-08
 */

import http from '@/utils/kq/http'

const veStuFamilyApi = {
  //添加接口
  add(data){
    return http.post(http.service.stu+'veStuFamily/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.stu+'veStuFamily/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.stu+'veStuFamily/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.stu+'veStuFamily/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.stu+'veStuFamily/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.stu+'veStuFamily/updateStatus',data)
  },

};
export default veStuFamilyApi;
