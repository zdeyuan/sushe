/*
 * @Descripttion: 心理健康知识类型表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18 15:20:56
 */

import http from '@/utils/kq/http';

const hqStuHealthKnowledgeTypeApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'hqStuHealthKnowledgeType/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'hqStuHealthKnowledgeType/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'hqStuHealthKnowledgeType/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'hqStuHealthKnowledgeType/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'hqStuHealthKnowledgeType/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'hqStuHealthKnowledgeType/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'hqStuHealthKnowledgeType/updateStatus', data);
  }
};
export default hqStuHealthKnowledgeTypeApi;
