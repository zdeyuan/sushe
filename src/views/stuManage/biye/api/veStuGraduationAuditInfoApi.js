/*
 * @Descripttion: 毕业审核信息 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-22
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-13 15:17:32
 */

import http from '@/utils/kq/http';

const veStuGraduationAuditInfoApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuGraduationAuditInfo/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuGraduationAuditInfo/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuGraduationAuditInfo/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuGraduationAuditInfo/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuGraduationAuditInfo/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuGraduationAuditInfo/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuGraduationAuditInfo/updateStatus', data);
  },//分页查询接口
  listByBZR(pageData) {
    return http.post(http.service.stu + 'veStuGraduationAuditInfo/listByBZR', pageData);
  },
  auditByBzr(data){
	  return http.post(http.service.stu + 'veStuGraduationAuditInfo/auditByBZR ', data);
  }
  
};
export default veStuGraduationAuditInfoApi;
