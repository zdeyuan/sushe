/*
 * @Descripttion: 检查项目表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-05 21:34:37
 */

import http from '@/utils/kq/http';

const veHqItemApi = {
  //添加接口
  add(data) {
    return http.post(http.service.hq + 'veHqItem/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.hq + 'veHqItem/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.hq + 'veHqItem/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.hq + 'veHqItem/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.hq + 'veHqItem/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.hq + 'veHqItem/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.hq + 'veHqItem/updateStatus', data);
  }
};
export default veHqItemApi;
