/*
 * @Descripttion: 助学金信息表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-13
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18 00:47:03
 */

import http from '@/utils/kq/http';

const veStuStipendApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuStipend/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuStipend/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuStipend/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuStipend/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuStipend/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuStipend/updateStatus', data);
  },
  //更新状态
  audit(data) {
    return http.post(http.service.stu + 'veStuStipend/audit', data);
  }
};
export default veStuStipendApi;
