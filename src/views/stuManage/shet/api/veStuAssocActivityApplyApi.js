/*
 * @Descripttion: 社团活动申请 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-22
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-22
 */

import http from '@/utils/kq/http'

const veStuAssocActivityApplyApi = {
  //添加接口
  add(data){
    return http.post(http.service.stu+'veStuAssocActivityApply/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(http.service.stu+'veStuAssocActivityApply/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(http.service.stu+'veStuAssocActivityApply/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(http.service.stu+'veStuAssocActivityApply/page',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(http.service.stu+'veStuAssocActivityApply/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(http.service.stu+'veStuAssocActivityApply/updateStatus',data)
  },

};
export default veStuAssocActivityApplyApi;
