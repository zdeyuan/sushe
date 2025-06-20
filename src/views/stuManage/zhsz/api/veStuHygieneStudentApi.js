/*
 * @Descripttion: 被评测的学生 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-05 23:36:45
 */

import http from '@/utils/kq/http';

const veStuHygieneStudentApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuHygieneStudent/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuHygieneStudent/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuHygieneStudent/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuHygieneStudent/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuHygieneStudent/all', pageData);
  },
  //查询单个数据接口
  findStu(stuId) {
    return http.get(http.service.stu + 'veStuHygieneStudent/findStu', { stuId: stuId });
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuHygieneStudent/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuHygieneStudent/updateStatus', data);
  }
};
export default veStuHygieneStudentApi;
