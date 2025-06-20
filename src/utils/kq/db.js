/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-06-03 14:04:17
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-13 20:31:50
 */
const db = {
  setObj: function (key, value) {
    value = JSON.stringify(value);
    return localStorage.setItem(key, value);
  },
  getObj: function (key) {
    const data = JSON.parse(localStorage.getItem(key));
    if (!data) return null;
    return data;
  },
  sessionSetObj: function (key, value) {
    value = JSON.stringify(value);
    return sessionStorage.setItem(key, value);
  },
  sessionGetObj: function (key) {
    const datasss = sessionStorage.getItem(key);
    if (!datasss) return null;
    try {
      const data = JSON.parse(datasss);
      if (!data) return null;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  set: function (name, value) {
    return sessionStorage.setItem(name, value);
  },
  get: function (name) {
    return sessionStorage.getItem(name);
  },
  delete: function (name) {
    return sessionStorage.removeItem(name);
  },
  setLocal: function (name, value) {
    return localStorage.setItem(name, value);
  },
  getLocal: function (name) {
    return localStorage.getItem(name);
  },
  deleteLocal: function (name) {
    return localStorage.removeItem(name);
  },
  deleteSession: function (name) {
    return sessionStorage.removeItem(name);
  },
  clear: function () {
    sessionStorage.clear();
    localStorage.clear();
  },
};

export default db;
