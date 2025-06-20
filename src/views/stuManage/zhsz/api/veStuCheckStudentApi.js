/*
 * @Descripttion: 被评测的学生 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-05 23:34:44
 */

import http from '@/utils/kq/http';

const veStuCheckStudentApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuCheckStudent/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuCheckStudent/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuCheckStudent/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuCheckStudent/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuCheckStudent/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuCheckStudent/queryById', { id: id });
  },
  //查询单个数据接口
  findStu(stuId) {
    return http.get(http.service.stu + 'veStuCheckStudent/findStu', { stuId: stuId });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuCheckStudent/updateStatus', data);
  }
};
export default veStuCheckStudentApi;
