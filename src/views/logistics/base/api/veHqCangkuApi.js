/*
 * @Descripttion: 仓库表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-02
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-02
 */

import http from '@/utils/kq/http';

const veHqCangkuApi = {
  //添加接口
  add(data) {
    return http.post(http.service.hq + 'veHqCangku/add', data);
  },
  //删除接口
  delete(ids) {
    return http.delete(http.service.hq + 'veHqCangku/deleteBatch?ids=' + ids);
  },
  //修改接口
  update(data) {
    return http.put(http.service.hq + 'veHqCangku/edit', data);
  },
  //分页查询接口
  page(pageData) {
    return http.post(http.service.hq + 'veHqCangku/page', pageData);
  },
  //查询单个数据接口
  get(id) {
    return http.get(http.service.hq + 'veHqCangku/queryById', { id: id });
  },
  //更新状态
  updateStatus(data) {
    return http.post(http.service.hq + 'veHqCangku/updateStatus', data);
  }
};
export default veHqCangkuApi;
