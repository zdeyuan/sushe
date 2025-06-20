/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-12 13:04:34
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-08 20:26:42
 */
import http from '@/utils/kq/http';
import constant from '@/config/constant';
export default {
  sLogin(sub) {
    return http.post(http.service.sys + 'sys/sLogin', sub);
  },
  getTeaData(sub) {
    delete sub.sorts;
    delete sub.param;
    delete sub.conditions;
    sub.pageNo = sub.current;
    sub.pageSize = sub.size;
    sub.interfaceUserId = constant.commonApi;
    return http.get(http.service.base + 'veCommon/getTeacherPageList', sub);
  },
  getTea(id) {
    return http.get(http.service.base + `veCommon/queryTeacherById?interfaceUserId=${constant.commonApi}&teacherId=${id}`, {});
  },
  //传工号
  getTeaByGh(id) {
    return http.get(http.service.base + `veCommon/queryTeacherByUserId`, {userId:id});
  },
  page(data) {
    const sub = {};
    sub.pageNo = data.current;
    sub.pageSize = data.size;

    return http.get(http.service.sys + 'sys/user/list', sub);
  },
  get(id) {
    return http.get(http.service.sys + 'sys/user/queryById?id=' + id, {});
  }
};
