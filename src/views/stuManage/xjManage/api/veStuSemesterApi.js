/*
 * @Descripttion: 学期注册表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-08
 */

import http from '@/utils/kq/http'

const veStuSemesterApi = {
  //添加接口
  add(data){
    return http.post(http.service.stu+'veStuSemester/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.stu+'veStuSemester/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.stu+'veStuSemester/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.stu+'veStuSemester/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.stu+'veStuSemester/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.stu+'veStuSemester/updateStatus',data)
  },

};
export default veStuSemesterApi;
