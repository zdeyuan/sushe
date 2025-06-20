const utils = {
  //判断值是否在数组中
  isInArr: function(list, key, value) {
    for (let i = 0; i < list.length; i++) {
      if (value == list[i][key]) {
        return true;
      }
    }
    return false;
  },
  phoneFormate: function(phone) {
    if (!phone) {
      return '';
    }
    if (phone.length <= 3) {
      return phone;
    }
    return phone.slice(0, 3) + (phone.slice(3) == '' ? '' : ' ' + this.phoneFormatMethod(phone.slice(3)));
  },
  phoneFormatMethod: function(phone4) {
    return phone4.slice(0, 4) + (phone4.slice(4) == '' ? '' : ' ' + this.phoneFormatMethod(phone4.slice(4)));
  },
  inArrIndex: function(list, key, value) {
    for (let i = 0; i < list.length; i++) {
      if (value == list[i][key]) {
        return i;
      }
    }
    return -1;
  },
  getInArr: function(list, key, value) {
    for (let i = 0; i < list.length; i++) {
      if (value == list[i][key]) {
        return list[i];
      }
    }
    return null;
  },
  //设置值到 po中   list   key 比如sex 自动添加 sexText  dataList 数组需要key and vue
  setKeyValue: function(list, key, dataList) {
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      for (let j = 0; j < dataList.length; j++) {
        const common = dataList[j];
        if (common.key == data[key]) {
          data[key + 'Text'] = common.value;
          break;
        }
      }
    }
  },
  //设置值到 po中   list   key 比如sex 自动添加 sexText  dataList 数组需要key and vue
  setObjKeyValue: function(data, key, dataList) {
    for (let j = 0; j < dataList.length; j++) {
      const common = dataList[j];
      if (common.key == data[key]) {
        data[key + 'Text'] = common.value;
        break;
      }
    }
  },
  /*根据出生日期算出年龄*/
  getAgeByBirthday: function(strBirthday) {
    if (!strBirthday) {
      return;
    }
    let returnAge;
    const strBirthdayArr = strBirthday.split('-');
    const birthYear = strBirthdayArr[0];
    const birthMonth = strBirthdayArr[1];
    const birthDay = strBirthdayArr[2];
    const d = new Date();
    const nowYear = d.getFullYear();
    const nowMonth = d.getMonth() + 1;
    const nowDay = d.getDate();
    if (nowYear == birthYear) {
      returnAge = 0; //同年 则为0岁
    } else {
      const ageDiff = nowYear - birthYear; //年之差
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          const dayDiff = nowDay - birthDay; //日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          const monthDiff = nowMonth - birthMonth; //月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge; //返回周岁年龄
  },
  isPoneAvailable(str) {
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(str)) {
      return false;
    } else {
      return true;
    }
  },
  filteremoji(emojireg) {
    const ranges = ['\ud83c[\udf00-\udfff]', '\ud83d[\udc00-\ude4f]', '\ud83d[\ude80-\udeff]'];
    emojireg = emojireg.replace(new RegExp(ranges.join('|'), 'g'), '');
    return emojireg;
  }, //判断值是否在数组中
  jsonToStr: function(value) {
    return JSON.stringify(value);
  },
  strToJson: function(value) {
    if (value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  },
  deleteNullObj(obj) {
    for (let key in obj) {
      if (!obj[key]) {
        delete obj[key];
      }
    }
    return obj;
  },
  randomNum(len, radix) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    radix = radix || chars.length;
    if (len) {
      // Compact form
      for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('') + new Date().getTime();
  },
  removeClass(ele, cls) {
    if (utils.hasClass(ele, cls)) {
      const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
  },
  hasClass(ele, cls) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  },
  addClass(ele, cls) {
    if (!utils.hasClass(ele, cls)) ele.className += ' ' + cls;
  },
  // 判断是否含有大写字母
  hasCapital(str) {
    const result = str.match(/^.*[A-Z]+.*$/);
    if (result == null) return false;
    return true;
  },
  // 判断是否含有小写字母
  hasLowercase(str) {
    const result = str.match(/^.*[a-z]+.*$/);
    if (result == null) return false;
    return true;
  },
  /* 大写字段转小写 */
  objToLowerCase(jsonObj) {
    for (let key in jsonObj) {
      if (utils.hasCapital(key)) {
        jsonObj[key.toLowerCase()] = jsonObj[key];
        delete jsonObj[key];
      }
    }
    return jsonObj;
  },
  /* 大写字段转小写 */
  deleteObjCommonKey(jsonObj) {
    for (let key in jsonObj) {
      if (key.startsWith('gmt_')) {
        delete jsonObj[key];
      }
    }
    return jsonObj;
  },
  /* 删除gmt开头的 面得新增进去了 */
  deleteObjGmt(jsonObj) {
    for (let key in jsonObj) {
      if (key.startsWith('gmt')) {
        delete jsonObj[key];
      }
    }
    return jsonObj;
  },
  /*
	isChange :是否自动转化为下划线
	 */
  getPageConditions(name, op, value, isChange) {
    let name1 = name;
    if (isChange) {
      name1 = name.replace(/([A-Z])/g, '_$1').toUpperCase();
    }
    const data = {
      conditions: [
        {
          operator: op,
          column: name1,
          value: value
        }
      ]
    };
    return data;
  },
  /*
	isChange :是否自动转化为下划线
	 */
  addPageConditions(params, name, op, value, isChange) {
    let name1 = name;
    if (isChange) {
      name1 = name.replace(/([A-Z])/g, '_$1').toUpperCase();
    }
    params.conditions.push({
      operator: op,
      column: name1,
      value: value
    });
  },
  /*
	isChange :是否自动转化为下划线
	 */
  addPageBetweenValueConditions(params, name, op, betweenValue1, betweenValue2, isChange) {
    let name1 = name;
    if (isChange) {
      name1 = name.replace(/([A-Z])/g, '_$1').toUpperCase();
    }

    params.conditions.push({
      operator: op,
      column: name1,
      betweenValue1: betweenValue1,
      betweenValue2: betweenValue2
    });
  },
  // 拷贝对象
  copyObject(obj) {
    const str = JSON.stringify(obj);
    return JSON.parse(str);
  },
  // 获取uuid
  uuid() {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '1';
    const uuid = s.join('');
    return uuid;
  },
  btree(arr, pid) {
    const copy = arr;
    const obj = {};
    copy.forEach(item => {
      obj[item.id] = item;
    });
    const res = [];
    copy.forEach(item => {
      if (item.pid === pid) {
        res.push(item);
      }
      for (let key in obj) {
        if (item.id === obj[key].pid) {
          if (item.children) {
            item.children.push(obj[key]);
          } else {
            item.children = [obj[key]];
          }
        }
      }
    });
    return res;
  },
  // 下划线转换驼峰
  toHump(name) {
    return name.toLowerCase().replace(/\_(\w)/g, function(all, letter) {
      return letter.toUpperCase();
    });
  },
  // 驼峰转换下划线
  toLine(name) {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase();
  },
  /**
   * @msg:  判断是否有权限
   * @name: Erik zhang
   */
  hasPermission(code) {
    if (code === 'noShow') {
      return false;
    }
    if (code === 'awaitShow') {
      return true;
    }
    let flag = false;
    if (code) {
      //code可以多个 满足一个即有权限
      const codeArr = code.split(',');
      for (const value of codeArr) {
        flag = window.$vm.$store.state.user.privilege.indexOf(value) > -1 ? true : false;
        if (flag) {
          return true;
        }
      }
    }
    return flag;
  },
  isIe() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE) {
      var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp['$1']);
      if (fIEVersion == 7) {
        return 7;
      } else if (fIEVersion == 8) {
        return 8;
      } else if (fIEVersion == 9) {
        return 9;
      } else if (fIEVersion == 10) {
        return 10;
      } else {
        return 6; //IE版本<=7
      }
    } else if (isEdge) {
      return true; //edge
    } else if (isIE11) {
      return true; //IE11
    } else {
      return false; //不是ie浏览器
    }
  },
  isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
      return true;
    } else {
      return false;
    }
  }
};
export default utils;
