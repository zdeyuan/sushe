
import http from '@/utils/kq/http'
const nameSpace = '/edu-schedule/classSwitch/veJwTiaoke'
const courseManegeRecord = {
  //添加接口
  add(data){
    return http.post(nameSpace+'/add',data)
  },
  //删除接口
  delete(ids){
    return http.delete(nameSpace+'/deleteBatch?ids='+ids)
  },
  //修改接口
  update(data){
    return http.put(nameSpace+'/edit',data)
  },
  //分页查询接口
  page(pageData){
    return http.post(nameSpace+'/list',pageData)
  },
  //查询单个数据接口
  get(id){
    return http.get(nameSpace+'/queryById',{id:id})
  },
  //更新状态
  updateStatus(data){
    return http.post(nameSpace+'/updateStatus',data)
  },

};
export default courseManegeRecord;
