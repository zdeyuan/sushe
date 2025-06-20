/*
 * @Descripttion: 教科研论文表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-17
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-17 22:07:23
 */

import http from '@/utils/kq/http';

const veJkyPaperApi = {
  //添加接口
  add(data) {
    return http.post(http.service.jkl + 'veJkyPaper/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.jkl + 'veJkyPaper/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.jkl + 'veJkyPaper/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.jkl + 'veJkyPaper/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.jkl + 'veJkyPaper/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.jkl + 'veJkyPaper/updateStatus', data);
  },
  //更新状态
  countDept(data) {
    return http.get(http.service.jkl + 'veJkyPaper/countDept', data);
  }
};
export default veJkyPaperApi;
