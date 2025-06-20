/*
 * @Descripttion: 教科研组织表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-15 17:22:57
 */

import http from '@/utils/kq/http';

const veJkyOrganizeApi = {
  //添加接口
  add(data) {
    return http.post(http.service.jkl + 'veJkyOrganize/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.jkl + 'veJkyOrganize/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.jkl + 'veJkyOrganize/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.jkl + 'veJkyOrganize/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.jkl + 'veJkyOrganize/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.jkl + 'veJkyOrganize/updateStatus', data);
  },
  //查询所有接口
  all(pageData) {
    return http.post(http.service.jkl + 'veJkyOrganize/all', pageData);
  }
};
export default veJkyOrganizeApi;
