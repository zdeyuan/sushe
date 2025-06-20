/*
 * @Descripttion: 房间信息表（参照JCBX0203） 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-20
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-20 11:58:53
 */

import http from '@/utils/kq/http';

const veSbzcJzwRoomApi = {
  //添加接口
  add(data) {
    return http.post(http.service.sbzc + 'veSbzcJzwRoom/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.sbzc + 'veSbzcJzwRoom/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.sbzc + 'veSbzcJzwRoom/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.sbzc + 'veSbzcJzwRoom/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.sbzc + 'veSbzcJzwRoom/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.sbzc + 'veSbzcJzwRoom/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.sbzc + 'veSbzcJzwRoom/updateStatus', data);
  }
};
export default veSbzcJzwRoomApi;
