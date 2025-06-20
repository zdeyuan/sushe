/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-08-14 15:03:37
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-22 17:21:44
 */
import moment from 'moment';
const date = {
  dateTimeFormat: 'yyyy年MM月dd日 HH时mm分ss秒',
  dateFormat: 'yyyy年MM月dd日',
  dateFormat1: 'yyyyMMddHHmmssu',
  dateFormat2: 'MM/dd',
  dateFormat3: 'yyyy/M/d HH:mm:ss',
  dateFormat4: 'yyyy-MM-dd',
  dateFormat5: 'yyyy-MM-dd HH:mm',
  dateFormat6: 'yyyy.MM.dd',
  dateFormat7: 'yyyy年MM月dd日HH时',
  dateFormatYMDHMS: 'yyyy-MM-dd HH:mm:ss',
  dateFormatYMD: 'yyyy/MM/dd',
  dateFormatHM: 'HH:mm',
  getDate(dateStr, format) {
    let now = null;
    if (dateStr) {
      if (format) {
        now = moment(dateStr, format);
      } else {
        now = moment(dateStr);
      }
    } else {
      now = moment();
    }
    return now;
  },
  intTime() {
    return '---';
  },
  geTime(dateStr, format) {
    const date111 = date.getDate(dateStr, format);
    return date111.toDate().getTime();
  },
  /**
   * years	y
      quarters	Q
      months	M
      weeks	w
      days	d
      hours	h
      minutes	m
      seconds	s
      milliseconds	ms
   */
  add(num, type) {
    return moment().add(num, type);
  },
  format(format) {
    if (!format) {
      format = 'YYYY年MM月DD日';
    }
    return moment().format(format);
  },
  formatDayHourChinese(format) {
    return moment(format).format('DD日HH时');
  },
  formatDay(format) {
    return moment(format).format('MM-DD');
  },
  formatDayChinese(format) {
    return moment(format).format('MM月DD日');
  },
  formatTime(format) {
    return moment(format).format('mm:ss');
  },
  formatStr(formatStr) {
    return moment().format(formatStr);
  },
  formatTH(data) {
    return moment(data).format('YYYY年MM月DD日HH时');
  },
  formatData(data, format) {
    return moment(data).format(format);
  },
  //获取服务器返回的 时间
  getCreateStr(dataStr) {
    return moment(dataStr).format('YYYY-MM-DD HH:mm:ss');
  },
  //对时间进行格式化date：时间类型，fmt：字符串类型如YYYY-MM-DD HH:mm:ss
  formatToDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str));
      }
    }
    return fmt;
  },

  timestampToStr(timestamp) {
    if (!timestamp || timestamp == '0') {
      return '';
    }
    // 补全为13位
    var arrTimestamp = (timestamp + '').split('');
    for (var start = 0; start < 13; start++) {
      if (!arrTimestamp[start]) {
        arrTimestamp[start] = '0';
      }
    }
    timestamp = arrTimestamp.join('') * 1;
    let d = new Date(parseInt(timestamp));
    console.log(d);
    return this.formatToDate(d, 'yyyy-MM-dd hh:mm:ss');
  },
  padLeftZero(str) {
    return ('00' + str).substr(str.length);
  },
  duration(times) {
    const sss = moment.duration(times + 3, 'seconds');
    const day = moment.duration(times + 3, 'seconds').asDays();
    let msg = '';
    if (day >= 1) {
      msg += parseInt(day) + '天';
    }
    const hours = sss._data.hours;
    if (hours >= 1) {
      msg += hours + '小时';
    }
    const minutes = sss._data.minutes;
    if (minutes >= 1) {
      msg += minutes + '分';
    }
    const seconds = sss._data.seconds;
    if (seconds >= 1) {
      msg += seconds + '秒';
    }
    return msg;
  }
};

export default date;
