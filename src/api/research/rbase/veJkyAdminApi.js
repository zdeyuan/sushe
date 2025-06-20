/*
 * @Descripttion: 教科研人员表（总表） 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 11:02:21
 */

import http from '@/utils/kq/http';

const veJkyAdminApi = {
  //添加接口
  add(data) {
    return http.post(http.service.jkl + 'veJkyAdmin/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.jkl + 'veJkyAdmin/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.jkl + 'veJkyAdmin/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.jkl + 'veJkyAdmin/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.jkl + 'veJkyAdmin/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.jkl + 'veJkyAdmin/updateStatus', data);
  },
  //更新状态
  findByIds(ids) {
    return http.get(http.service.jkl + 'veJkyAdmin/findByIds?ids=' + ids);
  }
};
export default veJkyAdminApi;
