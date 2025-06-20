<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-02 20:39:16
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="班级课表查询" key="1" >
      <edu-layout type="table" :extHeight="50" topName="班级课表查询">
        <veStuChange slot="table"></veStuChange>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="教师课表查询" key="2" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="教师课表查询">
        <veStuChangeZy slot="table"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane>
	<a-tab-pane tab="教室课表查询" key="3" v-if="$hasPer(['system'])">
	  <edu-layout type="table" :extHeight="50" topName="教师课表查询">
	    <VeJwTjJiaoSKBCX slot="table"></VeJwTjJiaoSKBCX>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="专业课表查询" key="4" v-if="$hasPer(['system'])">
	  <edu-layout type="table" :extHeight="50" topName="教师课表查询">
	    <VeJwTjZYKBCX slot="table"></VeJwTjZYKBCX>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="全校课表查询" key="5" v-if="$hasPer(['system'])">
	  <edu-layout type="table" :extHeight="50" topName="教师课表查询">
	    <VeJwTjQXKBCX slot="table"></VeJwTjQXKBCX>
	  </edu-layout>
	</a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './VeJwTjBJKBCX';
import veStuChangeZy from './VeJwTjJSKBCX';
import VeJwTjZYKBCX from './VeJwTjZYKBCX';
import VeJwTjJiaoSKBCX from './VeJwTjJiaoSKBCX';
import VeJwTjQXKBCX from './VeJwTjQXKBCX';


export default {
  components: {
    veStuChange,
    veStuChangeZy,
	VeJwTjJiaoSKBCX,
	VeJwTjZYKBCX,
	VeJwTjQXKBCX
  },
  data() {
    return {
      activeName: 'first'
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
  ::v-deep .j-select-biz-component-box {
	  width: 300px;
  }	
  ::v-deep .ant-table-thead > tr > th{
  	background:#66C3FD;
  	color:#FFFFFF;
  }	
  
  ::v-deep .ant-form-item-control{
  	  width: 200px ;
  	  // display: inline-block;
  }
  
  ::v-deep .sbys .ant-form-item-control{
  	  width: 600px ;
  }
  ::v-deep .table-operator{
  	  margin: 10px 0;
  }
  
  ::v-deep .button_default{
  	  height: 40px;
  	  position: relative;
	  top: 2px;
  }
  
// .auto-tabs /deep/.ant-tabs-bar {
//   margin-bottom: 0;
//   .ant-tabs-tab {
//     color: #999999;
//   }
//   .ant-tabs-tab-active {
//     color: #666666;
//   }
//   .ant-tabs-ink-bar {
//     background: #878787;
//   }
// }
</style>
