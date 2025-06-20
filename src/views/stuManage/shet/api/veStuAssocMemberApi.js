/*
 * @Descripttion: 社团成员 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-22
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-24 23:26:50
 */

import http from '@/utils/kq/http';

const veStuAssocMemberApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuAssocMember/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuAssocMember/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuAssocMember/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuAssocMember/page', pageData);
  },
  //分页查询接口
  findByAssocId(assocId) {
    return http.get(http.service.stu + 'veStuAssocMember/findByAssocId?assocId=' + assocId, {});
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuAssocMember/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuAssocMember/updateStatus', data);
  }
};
export default veStuAssocMemberApi;
