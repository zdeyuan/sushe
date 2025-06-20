/*
 * @Descripttion: 学生信息表 接口
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-08
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-16 22:57:57
 */

import http from '@/utils/kq/http';

const departmentApi = {
  //添加接口
  add(data) {
    return http.post(http.service.base + 'veBase/addDepartment', data);
  },
  //修改接口
  update(data) {
    return http.post(http.service.base + 'veBase/editDepartment', data);
  },
  list(pageData) {
    return http.get(http.service.base + 'veBase/getDepartmentPageList');
  }
  
};
export default departmentApi;
