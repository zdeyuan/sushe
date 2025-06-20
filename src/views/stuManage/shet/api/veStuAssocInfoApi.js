/*
 * @Descripttion: 学生社团信息 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-22
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-24 20:42:04
 */

import http from '@/utils/kq/http';

const veStuAssocInfoApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuAssocInfo/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuAssocInfo/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuAssocInfo/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuAssocInfo/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuAssocInfo/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuAssocInfo/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuAssocInfo/updateStatus', data);
  }
};
export default veStuAssocInfoApi;
