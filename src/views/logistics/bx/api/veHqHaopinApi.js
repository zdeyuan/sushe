/*
 * @Descripttion: a-低耗品管理 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-05
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-07 11:39:05
 */

import http from '@/utils/kq/http';

const veHqHaopinApi = {
  //添加接口
  add(data) {
    return http.post(http.service.hq + 'veHqHaopin/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.hq + 'veHqHaopin/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.hq + 'veHqHaopin/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.hq + 'veHqHaopin/page', pageData);
  },
  //分页查询接口
  pageDtoCount(pageData) {
    return http.post(http.service.hq + 'veHqHaopin/pageCount', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.hq + 'veHqHaopin/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.hq + 'veHqHaopin/updateStatus', data);
  }
};
export default veHqHaopinApi;
