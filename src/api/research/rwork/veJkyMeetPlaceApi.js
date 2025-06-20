/*
 * @Descripttion: 会议场地表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 15:08:55
 */

import http from '@/utils/kq/http';

const veJkyMeetPlaceApi = {
  //添加接口
  add(data) {
    return http.post(http.service.jkl + 'veJkyMeetPlace/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.jkl + 'veJkyMeetPlace/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.jkl + 'veJkyMeetPlace/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.jkl + 'veJkyMeetPlace/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.jkl + 'veJkyMeetPlace/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.jkl + 'veJkyMeetPlace/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.jkl + 'veJkyMeetPlace/updateStatus', data);
  }
};
export default veJkyMeetPlaceApi;
