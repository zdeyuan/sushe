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
    <a-tab-pane tab="教学日志" key="1" >
      <edu-layout type="table" :extHeight="50" topName="教学日志">
        <veStuChange slot="table"></veStuChange>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="我的教学日志" key="2" v-if="$hasPer(['bzr','teacher'])">
      <edu-layout type="table" :extHeight="50" topName="我的教学日志">
        <veStuChangeZy slot="table"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './VeJwJxrzList';
import veStuChangeZy from './VeJwMyJxrzList';

export default {
  components: {
    veStuChange,
    veStuChangeZy,
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
  	  width: 200px !important;
  	  // display: inline-block;
  }
  ::v-deep .table-operator{
  	  margin: 10px 0;
  }
  ::v-deep .common-layout{
  	padding: 0 15px!important;
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
