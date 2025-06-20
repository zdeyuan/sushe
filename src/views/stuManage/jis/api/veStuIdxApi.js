/*
 * @Descripttion: 指标基本表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-22
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-02 23:11:18
 */

import http from '@/utils/kq/http';

const veStuIdxApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuIdx/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuIdx/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuIdx/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuIdx/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuIdx/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuIdx/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuIdx/updateStatus', data);
  }
};
export default veStuIdxApi;
