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
    <a-tab-pane tab="仓库管理" key="1">
      <edu-layout type="table" :extHeight="50" topName="仓库管理">
        <veStuChange slot="table"></veStuChange>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="供应商管理" key="2">
      <edu-layout type="table" :extHeight="50" topName="供应商管理">
        <veStuChangeZy slot="table"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="教材管理" key="3">
      <edu-layout type="table" :extHeight="50" topName="教材管理">
        <veStuChangeBack slot="table"></veStuChangeBack>
      </edu-layout>
    </a-tab-pane>
	<a-tab-pane tab="教材入库" key="4">
	  <edu-layout type="table" :extHeight="50" topName="教材入库">
	    <JwJiaocaiInLogList slot="table"></JwJiaocaiInLogList>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="教材出库" key="5">
	  <edu-layout type="table" :extHeight="50" topName="教材出库">
	    <JwJiaocaiOutLogList slot="table"></JwJiaocaiOutLogList>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="教材订单" key="6">
	  <edu-layout type="table" :extHeight="50" topName="教材订单">
	    <JwJiaocaiOrderList slot="table"></JwJiaocaiOrderList>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="出入库查询" key="7">
	  <edu-layout type="table" :extHeight="50" topName="出入库查询">
	    <JwJiaocaiLogList slot="table"></JwJiaocaiLogList>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="库存查询" key="8">
	  <edu-layout type="table" :extHeight="50" topName="库存查询">
	    <JwJiaocaiKucunList slot="table"></JwJiaocaiKucunList>
	  </edu-layout>
	</a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './JwCangkuList';
import veStuChangeZy from './JwJiaocaiSupplierList';
import veStuChangeBack from './JwJiaocaiList';
import JwJiaocaiInLogList from './JwJiaocaiInLogList';
import JwJiaocaiOutLogList from './JwJiaocaiOutLogList';
import JwJiaocaiOrderList from './JwJiaocaiOrderList';
import JwJiaocaiLogList from './JwJiaocaiLogList';
import JwJiaocaiKucunList from './JwJiaocaiKucunList';


export default {
  components: {
    veStuChange,
    veStuChangeZy,
    veStuChangeBack,
	JwJiaocaiInLogList,
	JwJiaocaiLogList,
	JwJiaocaiOutLogList,
	JwJiaocaiOrderList,
	JwJiaocaiKucunList
	
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
  ::v-deep .ant-card-body{
  	 padding:0 15px;
   }
  ::v-deep .common-layout{
  	padding:0 15px!important;
  }
  ::v-deep .ant-form-item-control{
  	  width: 200px !important;
  	  // display: inline-block;
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
