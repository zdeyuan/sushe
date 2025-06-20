/*
 * @Descripttion: 会议表（会议，或调用OA会议模块） 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 22:25:22
 */

import http from '@/utils/kq/http';

const veJkyMeetApi = {
  //添加接口
  add(data) {
    return http.post(http.service.jkl + 'veJkyMeet/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.jkl + 'veJkyMeet/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.jkl + 'veJkyMeet/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.jkl + 'veJkyMeet/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.jkl + 'veJkyMeet/queryById', { id: id });
  },
  //查询单个数据接口
  findMeetUsers(data) {
    return http.get(http.service.jkl + 'veJkyMeet/findMeetUsers', { meetId: data.meetId });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.jkl + 'veJkyMeet/updateStatus', data);
  },
  //更新状态
  updateMeetUser(data) {
    return http.post(http.service.jkl + 'veJkyMeet/updateMeetUser', data);
  },
  //更新状态
  audit(id, status) {
    return http.get(http.service.jkl + `veJkyMeet/audit?id=${id}&status=${status}`);
  }
};
export default veJkyMeetApi;
