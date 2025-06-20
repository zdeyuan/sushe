import {isPhone,isEmail,isMobile} from './validate.js';
// 定义一个简单的验证服务
const validationService = {
  // 通用验证函数
  validate(fieldValue, rules) {
    let errorMessage = null;
    
    for (const rule of rules) {
      if (typeof rule === 'function') {
        const result = rule(fieldValue);
        if (result !== true) {
          errorMessage = result || '输入无效';
          break;
        }
      } else if (typeof rule === 'object' && rule.test) {
        if (!rule.test(fieldValue)) {
          errorMessage = rule.message || '输入格式不正确';
          break;
        }
      }
    }

    return errorMessage;
  },
  requiredRuleByArr(value){
	  return !value||value.length==0 ?'此字段是必填项'  :true;
  },
  // 具体的验证规则
  requiredRule(value) {
    return value ? true : '此字段是必填项';
  },
  
  numberRule(value) {
    return !isNaN(value) ? true : '请输入一个有效的数字';
  },
  iphoneRule(value){
	  return isPhone(value) ||isMobile(value) ? true : '请输入一个有效的联系方式';
  },
  // 验证多个字段的函数
  validateFields(fields, formData) {
    const errors = {};

    for (const field of fields) {
      const { name, rules } = field;
      const fieldValue = formData[name];
      const errorMessage = this.validate(fieldValue, rules);
      errors[name] = errorMessage;
    }

    return errors;
  }
};

export default validationService;