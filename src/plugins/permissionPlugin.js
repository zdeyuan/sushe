import { hasPer } from '@/store/modules/permission.js';

const permissionPlugin = {
  install(Vue) {
    Vue.prototype.$hasPer = function(targetRoles) {
		 let roles=localStorage.getItem('role');
		if (!Array.isArray(targetRoles)) {
		        targetRoles = [targetRoles];
		    }
		 return targetRoles.some(targetRole => roles.includes(targetRole));
    };
  }
};

export default permissionPlugin;