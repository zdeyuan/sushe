/*
 * @Descripttion: 学生项目指标表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-01 23:23:41
 */

import http from '@/utils/kq/http';

const veStuCheckNormOptionApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuCheckNormOption/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuCheckNormOption/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuCheckNormOption/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuCheckNormOption/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuCheckNormOption/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuCheckNormOption/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuCheckNormOption/updateStatus', data);
  }
};
export default veStuCheckNormOptionApi;
