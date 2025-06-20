import http from "./http";
import db from "./db";
/**
 * 数据字典管理
 */
const dist = {
  get(type, callback, value, valueName) {
    dist.getList(type).then((list) => {
      for (let i = 0; i < list.length; i++) {
        const po = list[i];
        if (po[valueName] == value) {
          callback(po);
          return;
        }
      }
      callback(null);
    });
  },
  async getList(type) {
	  let list=[];
    const data = {
      modelCode: type,
	  interfaceUserId:'09d5e1e7f9b049008eee645c783a1d66'
    };
    return new Promise((resolve, reject) => {
      http.get("/common/veCommon/queryDictDataByModelCode", data)
        .then((res) => {
			 console.log("字典1",res)
          if (res.result) {
			 
            list = res.result;
            resolve(list);
          }
        });
    });
  },
};

export default dist;
