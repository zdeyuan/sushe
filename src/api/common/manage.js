import Vue from 'vue'
import { axios } from '@/utils/request'

const api = {
  user: '/mock/api/user',
  role: '/mock/api/role',
  service: '/mock/api/service',
  permission: '/mock/api/permission',
  permissionNoPager: '/mock/api/permission/no-pager'
}

export default api

//post
export function postActionWithParams(url,params,data) {
  return axios({
    url: url,
    method:'post',
    params:params,
    data: data
  })
}


//post
export function postAction(url,parameter) {
  return axios({
    url: url,
    method:'post' ,
    data: parameter
  })
}

//post method= {post | put}
export function httpAction(url,parameter,method) {
  return axios({
    url: url,
    method:method ,
    data: parameter
  })
}

//put
export function putAction(url,parameter) {
  return axios({
    url: url,
    method:'put',
    data: parameter
  })
}

//get
export function getAction(url,parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

let baseUrlForBaseApi = window._CONFIG['domianBaseURL'] || '';
//post //基础数据接口
export function postActionForBase(url, parameter) {
  url = baseUrlForBaseApi + url;
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}
//get //基础数据接口
export function getActionForBase(url,parameter,key) {
  if(parameter == null){
    parameter={};
  }
  if(key != null){
    parameter[key] = '09d5e1e7f9b049008eee645c783a1d67';
  }
  parameter["interfaceUserId"] = '09d5e1e7f9b049008eee645c783a1d67';

  url = baseUrlForBaseApi + url;
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}
/*根据专业id取专业信息*/
export function getActionZhuanyeById(id) {
  let url = "/common/veCommon/querySpecialtyById";
  return getActionForBase(url,{specialtyId:id});
}

/*根据年级id取年级信息*/
export function getActionGradeById(id) {
  let url = "/common/veCommon/queryGradeById";
  return getActionForBase(url,{gradeId:id});
}
/*根据学期id取学期信息*/
export function getActionXueqiById(id) {
  let url = "/common/veCommon/querySemesterById";
  return getActionForBase(url,{semesterId:id});
}
/*根据学生userId查找学生信息*/
export function getActionStudentByUserId(id) {
  let url = "/common/veCommon/queryStudentByUserId";
  return getActionForBase(url,{userId:id},"id");
}

/*根据学生Id查找学生信息*/
export function getActionStudentById(id) {
  let url = "/common/veCommon/getStudentById";
  return getActionForBase(url,{studentId:id},"interfaceUserId");
}


/*根据教研组id获取教研组信息*/
export function getActionJyzById(id) {
  let url = "/common/veCommon/queryJYZById";
  return getActionForBase(url,{jyzId:id},"interfaceUserId");
}



/*根据院系id获取院系信息*/
export function getActionYuanxiById(id) {
  let url = "/common/veCommon/queryFacultyById";
  return getActionForBase(url,{facultyId:id});
}

/*根据教师id获取教师信息*/
export function getActionTeacherById(id) {
  let url = "/common/veCommon/queryTeacherById";
  return getActionForBase(url,{teacherId:id});
}

/*根据教师id获取教师信息*/
export function getActionTeacherByUserId(id) {
  let url = "/common/veCommon/queryTeacherByUserId";
  return getActionForBase(url,{userId:id},"id");
}

/*根据userId获取当前用户信息*/
export function getActionUserById(id) {
  let url = "/common/veCommon/queryAppUserByUserId";
  return getActionForBase(url,{userId:id},"id");
}
/*根据学制id获取学制信息*/
export function getActionXuezhiById(id) {
  let url = "/common/veCommon/queryXueZhiById";
  return getActionForBase(url,{xueZhiId:id});
}

/*根据班级id获取班级信息*/
export function getActionBanjiById(id) {
  let url = "/common/veCommon/queryBanJiById";
  return getActionForBase(url,{banJiId:id});
}

/*获取所有校区信息*/
export function getActionCampusById(parameter) {
  let url = "/common/veCommon/queryCampusList";
  return getActionForBase(url,parameter==null?{}:parameter,'id');
}

/*根据modelCode查找字典数据信息*/
export function getActionDictListByModel(modelCode) {
  let url = "/common/veCommon/queryDictDataByModelCode";
  return getActionForBase(url,{modelCode:modelCode},'id');
}

/*根据modelCode查找字典数据信息*/
export function getActionDictValueByCode(modelCode,code) {
  let url = "/common/veCommon/queryDictDataByModelCode";
  return getActionForBase(url,{modelCode:modelCode,code:code},'id');
}

/*根据班级获取学生*/
export function getActionStudentByClass(id) {
  let url = "/common/veCommon/getStudentPageList";
  return getActionForBase(url,{bjId:id,pageSize:9999},'interfaceUserId');
}


export function getActionStudentPageList(parameter) {
  let url = "/common/veCommon/getStudentPageList";
  return getActionForBase(url,parameter);
}

//deleteAction
export function deleteAction(url,parameter) {
  return axios({
    url: url,
    method: 'delete',
    params: parameter
  })
}

export function getUserList(parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

export function getRoleList(parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return axios({
    url: api.service,
    method: parameter.id == 0 ? 'post' : 'put',
    data: parameter
  })
}

/**
 * 下载文件 用于excel导出
 * @param url
 * @param parameter
 * @returns {*}
 */
export function downFile(url,parameter){
  return axios({
    url: url,
    params: parameter,
    method:'get' ,
    responseType: 'blob'
  })
}

/**
 * 下载文件
 * @param url 文件路径
 * @param fileName 文件名
 * @param parameter
 * @returns {*}
 */
export function downloadFile(url, fileName, parameter) {
  return downFile(url, parameter).then((data) => {
    if (!data || data.size === 0) {
      Vue.prototype['$message'].warning('文件下载失败')
      return
    }
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(new Blob([data]), fileName)
    } else {
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link) //下载完成移除元素
      window.URL.revokeObjectURL(url) //释放掉blob对象
    }
  })
}

/**
 * 文件上传 用于富文本上传图片
 * @param url
 * @param parameter
 * @returns {*}
 */
export function uploadAction(url,parameter){
  return axios({
    url: url,
    data: parameter,
    method:'post' ,
    headers: {
      'Content-Type': 'multipart/form-data',  // 文件上传
    },
  })
}

/**
 * 获取文件服务访问路径
 * @param avatar
 * @param subStr
 * @returns {*}
 */
export function getFileAccessHttpUrl(avatar,subStr) {
  if(!subStr) subStr = 'http'
  try {
    if(avatar && avatar.startsWith(subStr)){
      return avatar;
    }else{
      if(avatar &&　avatar.length>0 && avatar.indexOf('[')==-1){
        return window._CONFIG['staticDomainURL'] + "/" + avatar;
      }
    }
  }catch(err){
   return;
  }
}
