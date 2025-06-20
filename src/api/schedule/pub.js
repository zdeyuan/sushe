// 建筑教室信息
import {
    getAction,
    deleteAction,
    putAction,
    postAction,
    postActionWithParams,
    httpAction,
    getActionForBase
  } from '@/api/common/manage'
  
  const nameSpace = '/edu-schedule/pub'
  
const queryBuildListByCampusId = (id) => postAction(`${nameSpace}/veJwJianzhu/list?compusid=${id}`);

const getClassRoomList = (params) => postActionWithParams(`${nameSpace}/veJwJiaoshi/list`,params);

export {
    queryBuildListByCampusId,
    getClassRoomList
}
