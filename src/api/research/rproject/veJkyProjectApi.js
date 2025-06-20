/*
 * @Descripttion: 科研项目信息表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-20 22:20:29
 */

import http from '@/utils/kq/http';

const veJkyProjectApi = {
  //添加接口
  add(data) {
    return http.post(http.service.jkl + 'veJkyProject/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.jkl + 'veJkyProject/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.jkl + 'veJkyProject/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.jkl + 'veJkyProject/page', pageData);
  },
  //分页查询接口
  countProject(pageData) {
    return http.post(http.service.jkl + 'veJkyProject/countProject', pageData);
  },
  //分页查询接口
  countProjectUser(pageData) {
    return http.post(http.service.jkl + 'veJkyProject/countProjectUser', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.jkl + 'veJkyProject/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.jkl + 'veJkyProject/updateStatus', data);
  },
  //更新状态
  updateProgress(data) {
    return http.post(http.service.jkl + 'veJkyProject/updateProgress', data);
  },
  //更新状态
  audit(data) {
    return http.post(http.service.jkl + 'veJkyProject/audit', data);
  }
};
export default veJkyProjectApi;
