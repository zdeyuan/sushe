'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.FormItemProps = exports.ValidationRule = exports.FormProps = undefined;

var _Form = require('./Form');

Object.defineProperty(exports, 'FormProps', {
  enumerable: true,
  get: function get() {
    return _Form.FormProps;
  }
});
Object.defineProperty(exports, 'ValidationRule', {
  enumerable: true,
  get: function get() {
    return _Form.ValidationRule;
  }
});

var _FormItem = require('./FormItem');

Object.defineProperty(exports, 'FormItemProps', {
  enumerable: true,
  get: function get() {
    return _FormItem.FormItemProps;
  }
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _Form2 = _interopRequireDefault(_Form);

var _vueRef = require('vue-ref');

var _vueRef2 = _interopRequireDefault(_vueRef);

var _FormDecoratorDirective = require('ant-design-vue/lib/_util/FormDecoratorDirective');

var _FormDecoratorDirective2 = _interopRequireDefault(_FormDecoratorDirective);

var _base = require('ant-design-vue/lib/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_vue2['default'].use(_vueRef2['default'], { name: 'ant-ref' });
_vue2['default'].use(_FormDecoratorDirective2['default']);

/* istanbul ignore next */
_Form2['default'].install = function(Vue) {
  Vue.use(_base2['default']);
  Vue.component(_Form2['default'].name, _Form2['default']);
  Vue.component(_Form2['default'].Item.name, _Form2['default'].Item);
};

exports['default'] = _Form2['default'];
