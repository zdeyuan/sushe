/*
 * @Descripttion: 文体获奖项目表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-21 20:01:53
 */

import http from '@/utils/kq/http';

const veStuLiteraryAwardItemApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veStuLiteraryAwardItem/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veStuLiteraryAwardItem/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veStuLiteraryAwardItem/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veStuLiteraryAwardItem/page', pageData);
  },
  //分页查询接口
  all(pageData) {
    return http.post(http.service.stu + 'veStuLiteraryAwardItem/all', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veStuLiteraryAwardItem/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veStuLiteraryAwardItem/updateStatus', data);
  }
};
export default veStuLiteraryAwardItemApi;
