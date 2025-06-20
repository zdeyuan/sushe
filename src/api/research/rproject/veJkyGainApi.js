/*
 * @Descripttion: 科研成果表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-17
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-17 13:56:02
 */

import http from '@/utils/kq/http';

const veJkyGainApi = {
  //添加接口
  add(data) {
    return http.post(http.service.jkl + 'veJkyGain/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.jkl + 'veJkyGain/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.jkl + 'veJkyGain/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.jkl + 'veJkyGain/page', pageData);
  },
  //分页查询接口
  countUser(pageData) {
    return http.post(http.service.jkl + 'veJkyGain/countUser', pageData);
  },
  //分页查询接口
  countCate(pageData) {
    return http.post(http.service.jkl + 'veJkyGain/countCate', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.jkl + 'veJkyGain/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.jkl + 'veJkyGain/updateStatus', data);
  }
};
export default veJkyGainApi;
