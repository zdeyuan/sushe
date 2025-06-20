/*
 * @Descripttion: 参评老师表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18
 */

import http from '@/utils/kq/http';

const veStuHygieneJudgerApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuHygieneJudger/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuHygieneJudger/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuHygieneJudger/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuHygieneJudger/page', pageData);
  },
  all(pageData) {
    return http.post(http.service.stu + 'veStuHygieneJudger/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuHygieneJudger/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuHygieneJudger/updateStatus', data);
  }
};
export default veStuHygieneJudgerApi;
