/*
 * @Descripttion: a-低耗品出入库 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-05
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-05 11:52:14
 */

import http from '@/utils/kq/http';

const veHqHaopinCrApi = {
  //添加接口
  add(data) {
    return http.post(http.service.hq + 'veHqHaopinCr/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.hq + 'veHqHaopinCr/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.hq + 'veHqHaopinCr/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.hq + 'veHqHaopinCr/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.hq + 'veHqHaopinCr/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.hq + 'veHqHaopinCr/updateStatus', data);
  }
};
export default veHqHaopinCrApi;
