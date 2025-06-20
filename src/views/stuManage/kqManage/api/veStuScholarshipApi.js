/*
 * @Descripttion: 奖学金信息表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-13
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-13
 */

import http from '@/utils/kq/http'

const veStuScholarshipApi = {
  //添加接口
  add(data){
    return http.post(http.service.stu+'veStuScholarship/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.stu+'veStuScholarship/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.stu+'veStuScholarship/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.stu+'veStuScholarship/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.stu+'veStuScholarship/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.stu+'veStuScholarship/updateStatus',data)
  },

};
export default veStuScholarshipApi;
