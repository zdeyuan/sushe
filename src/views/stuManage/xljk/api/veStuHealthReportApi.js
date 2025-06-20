/*
 * @Descripttion: 体质健康记录 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-04 23:27:56
 */

import http from '@/utils/kq/http';

const veStuHealthReportApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuHealthReport/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuHealthReport/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuHealthReport/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuHealthReport/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuHealthReport/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuHealthReport/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuHealthReport/updateStatus', data);
  }
};
export default veStuHealthReportApi;
