/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-07-03 15:37:19
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-15 20:25:50
 */
export const baseMixins = {
  data() {
    const userInfo = window.localStorage.getItem("userInfo");
    const data = {
      /* 尽量用这个 */
      loginInfo: {
        userId: userInfo.teacherOrStudentId || userInfo.id,
        userName: userInfo.userName
      }
    };
    return data;
  }
};
