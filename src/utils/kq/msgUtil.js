/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-12 00:12:09
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-25 23:26:13
 */
/**
 * 消息框
 */
export default {
  install(Vue) {
    const that = Vue.prototype;
    Vue.prototype.msgUtil = {
      success(_msg) {
        show('success', _msg);
      },
      warning(_msg) {
        show('warning', _msg);
      },
      info(_msg) {
        show('info', _msg);
      },
      error(_msg) {
        show('error', _msg);
      },
      /**
       * 确认框
       * @param _title 标题
       * @param _msg 内容
       * @param _callback 回调函数参数{点击按钮：true/false}
       * @param _options 配置
       */
      confirm(_title, _msg, _callback, _options) {
        confirm(_title, _msg, _callback, _options);
      }
    };

    /**
     * 基础显示方法
     * @param _type
     * @param _msg
     */
    function show(_type, _msg) {
      that.$message({
        type: _type,
        message: _msg
      });
    }

    function parse(html) {
      var startReg = new RegExp(/^<[^\/>]+>/);
      var selfCloseReg = new RegExp(/^<[^<>\/]+\/>/);
      var endReg = new RegExp('^</[^>]+>');
      var textNode = new RegExp(/^[^<]+/);
      var stack = [];
      var res;
      while (html) {
        var startTag = startReg.exec(html);
        if (startTag) {
          res = startTag[0];
          stack.push(res);
          html = html.slice(res.length);
          continue;
        }
        var textTag = textNode.exec(html);
        if (textTag) {
          res = textTag[0];
          stack.push(res);
          html = html.slice(res.length);
          continue;
        }
        var endTag = endReg.exec(html);
        if (endTag) {
          res = endTag[0];
          stack.push(res);
          html = html.slice(res.length);
          continue;
        }
        var selfCloseTag = selfCloseReg.exec(html);
        if (selfCloseTag) {
          res = selfCloseTag[0];
          stack.push(res);
          html = html.slice(res.length);
          continue;
        }
      }
      return stack;
    }

    /**
     * 确认框
     * @param _title 标题
     * @param _msg 内容
     * @param _callback 回调函数参数{点击按钮：true/false}
     * @param _options 配置
     */
    function confirm(_title, _msg, _callback, _options) {
      let options = {
        class: 'extDialog',
        title: _title,
        content: h => _msg,
        okText: '确定',
        cancelText: '取消',
        type: 'warning',
        closable: true,
        closeOnClickModal: false,
        onOk() {
          _callback();
        }
      };
      if (options) {
        options = Object.assign(options, _options);
      }
      that.$confirm(options);
    }
  }
};
