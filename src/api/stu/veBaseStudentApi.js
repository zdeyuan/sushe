/*
 * @Descripttion: 学生信息表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-16 22:57:57
 */

import http from '@/utils/kq/http';

const veBaseStudentApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veBaseStudent/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veBaseStudent/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veBaseStudent/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veBaseStudent/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veBaseStudent/queryById', { id: id });
  },
  //查询单个数据接口
  findFamilys(stuId) {
    return http.get(http.service.stu + 'veBaseStudent/findFamilys', { stuId: stuId });
  },
  //查询单个数据接口
  countKns(year) {
    return http.get(http.service.stu + 'veBaseStudent/countKns', { year: year });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veBaseStudent/updateStatus', data);
  },
  //更新状态
  findByIds(ids) {
    return http.get(http.service.stu + 'veBaseStudent/findByIds?ids=' + ids);
  },
  //根据班级id查学生接口
  findByBjIds(id) {
    return http.get('/common/veCommon/getStudentPageList?bjId='+id);
  },
  
};
export default veBaseStudentApi;
