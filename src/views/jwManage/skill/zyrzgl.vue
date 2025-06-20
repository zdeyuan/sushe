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
    <a-tab-pane tab="考试管理" key="1">
      <edu-layout type="table" :extHeight="50" topName="考试管理">
        <veStuChange slot="table"></veStuChange>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="录入成绩" key="2">
      <edu-layout type="table" :extHeight="50" topName="录入成绩">
        <veStuChangeZy slot="table"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="成绩修改" key="3">
      <edu-layout type="table" :extHeight="50" topName="成绩修改">
        <veStuChangeBack slot="table"></veStuChangeBack>
      </edu-layout>
    </a-tab-pane>
	<a-tab-pane tab="打印模版" key="4">
	  <edu-layout type="table" :extHeight="50" topName="打印模版">
	    <JwJiaocaiInLogList slot="table"></JwJiaocaiInLogList>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="成绩打印" key="5">
	  <edu-layout type="table" :extHeight="50" topName="成绩打印">
	    <JwJiaocaiOutLogList slot="table"></JwJiaocaiOutLogList>
	  </edu-layout>
	</a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './VeJwKsZhiyeList';
import veStuChangeZy from './VeJwCjZhiyeList';
import veStuChangeBack from './VeJwCjZhiyeUpdateList';
import JwJiaocaiInLogList from './VeJwZycjTemplateList';
import JwJiaocaiOutLogList from './VeJwCjZhiyePrintingList';


export default {
  components: {
    veStuChange,
    veStuChangeZy,
    veStuChangeBack,
	JwJiaocaiInLogList,	
	JwJiaocaiOutLogList
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
  :v-deep .common-layout{
	  padding:0 15px;
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
