/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-09-22 15:24:48
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-16 00:53:59
 */
import EduData from './EduData.vue';
import EduDictText from './EduDictText.vue';
import EduForm from './EduForm.vue';
import EduLayout from './EduLayout.vue';
import EduTable from './EduTable.vue';
import EduPms from './EduPms.vue';
import EduQuery from './EduQuery.vue';
import EduQueryItem from './EduQueryItem.vue';

import EduTree from './EduTree/EduTree.vue';
import EduTreeSelect from './EduTreeSelect.vue';

//import FormItem from './form-model/FormItem';

// 这里是重点
const Loading = {
  install: function(Vue) {
    Vue.component('edu-data', EduData);
    Vue.component('edu-dict-text', EduDictText);
    Vue.component('edu-form', EduForm);
    Vue.component('edu-layout', EduLayout);
    Vue.component('edu-tree', EduTree);
    Vue.component('edu-tree-select', EduTreeSelect);

    Vue.component('edu-table', EduTable);
    Vue.component('edu-pms', EduPms);
    Vue.component('edu-query', EduQuery);
    Vue.component('edu-query-item', EduQueryItem);

    //Vue.component('a-form-model-item ', FormItem);
  }
};

// 导出组件
export default Loading;
