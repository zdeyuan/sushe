/*
 * @Descripttion: 办公物品分类 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-02
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-03 23:21:50
 */

import http from '@/utils/kq/http';

const veHqBgwpflApi = {
  //添加接口
  add(data) {
    return http.post(http.service.hq + 'veHqBgwpfl/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.hq + 'veHqBgwpfl/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.hq + 'veHqBgwpfl/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.hq + 'veHqBgwpfl/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.hq + 'veHqBgwpfl/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.hq + 'veHqBgwpfl/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.hq + 'veHqBgwpfl/updateStatus', data);
  }
};
export default veHqBgwpflApi;
