/*
 * @Descripttion: 检查指标表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-02 09:48:00
 */

import http from '@/utils/kq/http';

const veStuHygieneNormApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuHygieneNorm/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuHygieneNorm/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuHygieneNorm/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuHygieneNorm/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuHygieneNorm/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuHygieneNorm/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuHygieneNorm/updateStatus', data);
  }
};
export default veStuHygieneNormApi;
