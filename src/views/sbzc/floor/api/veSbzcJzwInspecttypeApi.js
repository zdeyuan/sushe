/*
 * @Descripttion: 检查类型表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-18 21:10:20
 */

import http from '@/utils/kq/http';

const veSbzcJzwInspecttypeApi = {
  //添加接口
  add(data) {
    return http.post(http.service.sbzc + 'veSbzcJzwInspecttype/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.sbzc + 'veSbzcJzwInspecttype/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.sbzc + 'veSbzcJzwInspecttype/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.sbzc + 'veSbzcJzwInspecttype/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.sbzc + 'veSbzcJzwInspecttype/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.sbzc + 'veSbzcJzwInspecttype/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.sbzc + 'veSbzcJzwInspecttype/updateStatus', data);
  }
};
export default veSbzcJzwInspecttypeApi;
