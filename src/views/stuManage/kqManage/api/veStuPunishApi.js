/*
 * @Descripttion: 惩罚信息表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-09
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-27 20:53:28
 */

import http from '@/utils/kq/http';

const veStuPunishApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuPunish/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuPunish/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuPunish/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuPunish/page', pageData);
  },
  //分页查询接口
  countBy(pageData) {
    return http.post(http.service.stu + 'veStuPunish/countBy', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuPunish/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuPunish/updateStatus', data);
  }
};
export default veStuPunishApi;
