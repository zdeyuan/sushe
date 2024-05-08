const dateToFormat = (date) => {
  let str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ';
  if (date.getHours() < 10) {
    str += '0' + date.getHours();
  } else {
    str += date.getHours();
  }
  str += ':'
  if (date.getMinutes() < 10) {
    str += '0' + date.getMinutes();
  } else {
    str += date.getMinutes();
  }
  return str;
}

export default {
  dateToFormat,
}
