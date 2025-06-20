/*
 * @Descripttion: 班级信息表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-28
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-28 21:46:12
 */

import http from '@/utils/kq/http';

const veBaseBanjiApi = {
  //添加接口
  add(data) {
    return http.post(http.service.stu + 'veBaseBanji/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.stu + 'veBaseBanji/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.stu + 'veBaseBanji/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.stu + 'veBaseBanji/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.stu + 'veBaseBanji/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.stu + 'veBaseBanji/updateStatus', data);
  }
};
export default veBaseBanjiApi;
