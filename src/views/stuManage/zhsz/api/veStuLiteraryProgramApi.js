/*
 * @Descripttion: 文体活动计划表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18
 */

import http from '@/utils/kq/http'

const veStuLiteraryProgramApi = {
  //添加接口
  add(data){
    return http.post(http.service.stu+'veStuLiteraryProgram/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.stu+'veStuLiteraryProgram/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.stu+'veStuLiteraryProgram/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.stu+'veStuLiteraryProgram/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.stu+'veStuLiteraryProgram/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.stu+'veStuLiteraryProgram/updateStatus',data)
  },

};
export default veStuLiteraryProgramApi;
