/*
 * @Descripttion: 奖学金类型表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-13
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-17 23:48:19
 */

import http from '@/utils/kq/http';

const veStuScholarshipTypeApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuScholarshipType/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuScholarshipType/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuScholarshipType/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuScholarshipType/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuScholarshipType/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuScholarshipType/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuScholarshipType/updateStatus', data);
  }
};
export default veStuScholarshipTypeApi;
