/*
 * @Descripttion: 科研经费报销明细表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-14
 */

import http from '@/utils/kq/http'

const veJkyFundClaimListApi = {
  //添加接口
  add(data){
    return http.post(http.service.jkl+'veJkyFundClaimList/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.jkl+'veJkyFundClaimList/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.jkl+'veJkyFundClaimList/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.jkl+'veJkyFundClaimList/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.jkl+'veJkyFundClaimList/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.jkl+'veJkyFundClaimList/updateStatus',data)
  },

};
export default veJkyFundClaimListApi;
