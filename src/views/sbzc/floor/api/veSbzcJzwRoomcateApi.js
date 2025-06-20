/*
 * @Descripttion: （房间用途）房间类别 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-18 21:10:28
 */

import http from '@/utils/kq/http';

const veSbzcJzwRoomcateApi = {
  //添加接口
  add(data) {
    return http.post(http.service.sbzc + 'veSbzcJzwRoomcate/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.sbzc + 'veSbzcJzwRoomcate/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.sbzc + 'veSbzcJzwRoomcate/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.sbzc + 'veSbzcJzwRoomcate/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.sbzc + 'veSbzcJzwRoomcate/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.sbzc + 'veSbzcJzwRoomcate/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.sbzc + 'veSbzcJzwRoomcate/updateStatus', data);
  }
};
export default veSbzcJzwRoomcateApi;
