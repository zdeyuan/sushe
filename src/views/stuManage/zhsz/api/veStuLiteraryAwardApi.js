/*
 * @Descripttion: 文体获奖表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18
 */

import http from '@/utils/kq/http'

const veStuLiteraryAwardApi = {
  //添加接口
  add(data){
    return http.post(http.service.stu+'veStuLiteraryAward/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.stu+'veStuLiteraryAward/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.stu+'veStuLiteraryAward/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.stu+'veStuLiteraryAward/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.stu+'veStuLiteraryAward/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.stu+'veStuLiteraryAward/updateStatus',data)
  },

};
export default veStuLiteraryAwardApi;
