/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-08-06 09:46:03
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-07-20 21:37:19
 */
const config = {
  systemName: process.env.VUE_APP_SYSTEM_NAME,
  isRemoteMenu: true, //是否读取服务器菜单
  //各个服务的名称列表
  service: {
    sys: '',
    jkl: 'research/',
    hq: 'logistics/',
    sbzc: 'sbzc/',
    base: 'common/',
    stu: 'stu/',
	kwgl:'kwgl/',
	sanming: 'sanming/sanming/'
  }
};
if (process.env.NODE_ENV === 'development') {
  config.isRemoteMenu = false;
  // config.service.sys = 'http://192.168.0.13:9000/';
  //config.service.base = 'http://192.168.0.13:9000/common/';
}
export default config;
