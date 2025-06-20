/*
 * @Descripttion: 毕业审核设置表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-22
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-28 22:24:05
 */

import http from '@/utils/kq/http';

const veStuGraduationAuditConfigApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuGraduationAuditConfig/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuGraduationAuditConfig/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuGraduationAuditConfig/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuGraduationAuditConfig/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuGraduationAuditConfig/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuGraduationAuditConfig/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuGraduationAuditConfig/updateStatus', data);
  }
};
export default veStuGraduationAuditConfigApi;
