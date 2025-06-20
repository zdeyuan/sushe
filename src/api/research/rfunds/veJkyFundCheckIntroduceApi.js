/*
 * @Descripttion: 科研经费审批说明表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-14
 */

import http from '@/utils/kq/http'

const veJkyFundCheckIntroduceApi = {
  //添加接口
  add(data){
    return http.post(http.service.jkl+'veJkyFundCheckIntroduce/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.jkl+'veJkyFundCheckIntroduce/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.jkl+'veJkyFundCheckIntroduce/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.jkl+'veJkyFundCheckIntroduce/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.jkl+'veJkyFundCheckIntroduce/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.jkl+'veJkyFundCheckIntroduce/updateStatus',data)
  },

};
export default veJkyFundCheckIntroduceApi;
