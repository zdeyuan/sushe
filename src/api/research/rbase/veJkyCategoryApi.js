/*
 * @Descripttion: 教科研项目类型表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-14 15:00:30
 */

import http from '@/utils/kq/http';

const veJkyCategoryApi = {
  //添加接口
  add(data) {
    return http.post(http.service.jkl + 'veJkyCategory/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.jkl + 'veJkyCategory/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.jkl + 'veJkyCategory/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.jkl + 'veJkyCategory/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.jkl + 'veJkyCategory/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.jkl + 'veJkyCategory/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.jkl + 'veJkyCategory/updateStatus', data);
  }
};
export default veJkyCategoryApi;
