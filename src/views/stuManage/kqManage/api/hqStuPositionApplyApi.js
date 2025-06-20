/*
 * @Descripttion: 学生职位申请表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-13
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-04 23:41:34
 */

import http from '@/utils/kq/http';

const hqStuPositionApplyApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'hqStuPositionApply/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'hqStuPositionApply/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'hqStuPositionApply/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'hqStuPositionApply/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'hqStuPositionApply/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'hqStuPositionApply/updateStatus', data);
  }
};
export default hqStuPositionApplyApi;
