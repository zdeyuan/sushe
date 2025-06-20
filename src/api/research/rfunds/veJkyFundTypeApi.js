/*
 * @Descripttion: 教科研费用类别表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 08:47:48
 */

import http from '@/utils/kq/http';

const veJkyFundTypeApi = {
  //添加接口
  add(data) {
    return http.post(http.service.jkl + 'veJkyFundType/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.jkl + 'veJkyFundType/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.jkl + 'veJkyFundType/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.jkl + 'veJkyFundType/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.jkl + 'veJkyFundType/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.jkl + 'veJkyFundType/updateStatus', data);
  },
  //更新状态
  all(data) {
    return http.post(http.service.jkl + 'veJkyFundType/all', data);
  }
};
export default veJkyFundTypeApi;
