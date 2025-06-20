/*
 * @Descripttion: 考勤类型表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-09
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-13 21:12:30
 */

import http from '@/utils/kq/http';

const veStuCheckTypeApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuCheckType/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuCheckType/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuCheckType/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuCheckType/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuCheckType/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuCheckType/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuCheckType/updateStatus', data);
  }
};
export default veStuCheckTypeApi;
