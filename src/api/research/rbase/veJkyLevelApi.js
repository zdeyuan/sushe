/*
 * @Descripttion: 教科研项目级别表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-13
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-15 17:22:42
 */

import http from '@/utils/kq/http';

const veJkyLevelApi = {
  //添加接口
  add(data) {
    //return http.post('http://127.0.0.1:9999/research/veJkyLevel/add',data)
    return http.post(http.service.jkl + 'veJkyLevel/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.jkl + 'veJkyLevel/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.jkl + 'veJkyLevel/edit', data);
  },
  //查询接口
  page(pageData) {
    return http.post(http.service.jkl + 'veJkyLevel/page', pageData);
  },
  //查询接口
  get(id) {
    return http.get(http.service.jkl + 'veJkyLevel/queryById', { id: id });
  },
  //查询接口
  updateStatus(data) {
    return http.post(http.service.jkl + 'veJkyLevel/updateStatus', data);
  },
  //查询所有接口
  all(pageData) {
    return http.post(http.service.jkl + 'veJkyLevel/all', pageData);
  }
};
export default veJkyLevelApi;
