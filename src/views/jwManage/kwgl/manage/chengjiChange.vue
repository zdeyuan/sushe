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
    <!-- <a-tab-pane tab="成绩类型管理" key="1" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="成绩类型管理">
        <VeJwCjlxList slot="table"></VeJwCjlxList>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="成绩录入设置" key="2" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="成绩录入设置">
        <VeJwCjsettingList slot="table"></VeJwCjsettingList>
      </edu-layout>
    </a-tab-pane> -->
    <a-tab-pane tab="成绩录入" key="3" v-if="$hasPer(['system','teacher','bzr'])">
      <edu-layout type="table" :extHeight="50" topName="成绩录入">
        <VeJwCjPutin slot="table"></VeJwCjPutin>
      </edu-layout>
    </a-tab-pane>
	<a-tab-pane tab="我的成绩'" key="4" v-if="$hasPer(['student'])">
	  <edu-layout type="table" :extHeight="50" topName="我的成绩">
	    <VeJwChengjiListAudit slot="table"></VeJwChengjiListAudit>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="录入成绩审核" key="4" v-if="$hasPer(['system'])">
	  <edu-layout type="table" :extHeight="50" topName="录入成绩审核">
	    <VeJwChengjiListAudit slot="table"></VeJwChengjiListAudit>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="成绩修改申请" key="5" v-if="$hasPer(['system','teacher','bzr'])">
	  <edu-layout type="table" :extHeight="50" topName="成绩修改申请">
	    <VeJwChengjiList slot="table"></VeJwChengjiList>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="成绩修改审核" key="6" v-if="$hasPer(['system'])">
	  <edu-layout type="table" :extHeight="50" topName="成绩修改审核">
	    <VeJwCjChangeList slot="table"></VeJwCjChangeList>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="班级成绩列表" key="7" v-if="$hasPer(['system'])">
	  <edu-layout type="table" :extHeight="50" topName="班级成绩列表">
	    <VeJwCJClassList slot="table"></VeJwCJClassList>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="补考成绩录入" key="8" v-if="!$hasPer(['student'])">
	  <edu-layout type="table" :extHeight="50" topName="补考成绩录入">
	    <VeJwCjBkPutin slot="table"></VeJwCjBkPutin>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="补考成绩记录" key="9" v-if="$hasPer(['system'])">
	  <edu-layout type="table" :extHeight="50" topName="补考成绩记录">
	    <VeJwCjBukaoList slot="table"></VeJwCjBukaoList>
	  </edu-layout>
	</a-tab-pane>
	<!-- <a-tab-pane tab="清考成绩录入" key="10" v-if="!$hasPer(['student'])">
	  <edu-layout type="table" :extHeight="50" topName="清考成绩录入">
	    <VeJwCjQkPutin slot="table"></VeJwCjQkPutin>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="清考成绩记录" key="11" v-if="$hasPer(['system'])">
	  <edu-layout type="table" :extHeight="50" topName="补考考试管理">
	    <VeJwCjQingkaoList slot="table"></VeJwCjQingkaoList>
	  </edu-layout>
	</a-tab-pane> -->
	<a-tab-pane tab="免缓缺登记" key="12" v-if="$hasPer(['system','teacher','bzr'])">
	  <edu-layout type="table" :extHeight="50" topName="免缓缺登记">
	    <VeJwCjFreeList slot="table"></VeJwCjFreeList>
	  </edu-layout>
	</a-tab-pane>
  </a-tabs>
</template>

<script>
import VeJwCjlxList from './VeJwCjlxList';
import VeJwCjsettingList from './VeJwCjsettingList';
import VeJwCjPutin from './VeJwCjPutin';
import VeJwChengjiListAudit from './VeJwChengjiListAudit';
import VeJwChengjiList from './VeJwChengjiList';
import VeJwCjChangeList from './VeJwCjChangeList';
import VeJwCJClassList from './VeJwCJClassList';
import VeJwCjBkPutin from './VeJwCjBkPutin';
import VeJwCjBukaoList from './VeJwCjBukaoList';
import VeJwCjQkPutin from './VeJwCjQkPutin';
import VeJwCjQingkaoList from './VeJwCjQingkaoList';
import VeJwCjFreeList from './VeJwCjFreeList';


export default {
  components: {
    VeJwCjlxList,
	VeJwCjsettingList,
	VeJwCjPutin,
	VeJwChengjiListAudit,
	VeJwChengjiList,
	VeJwCjChangeList,
	VeJwCJClassList,
	VeJwCjBkPutin,
	VeJwCjBukaoList,
	VeJwCjQkPutin,
	VeJwCjQingkaoList,
	VeJwCjFreeList
  },
  data() {
    return {
      activeName: '1',
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
  }
  
 ::v-deep .table-operator{
	 margin: 10px 0;
 }
  ::v-deep .common-layout{
	  padding:0 15px!important;
  }
  ::v-deep .ant-tabs-bar{
	  margin-bottom:0;
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
