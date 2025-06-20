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
    <a-tab-pane tab="竞赛项目" key="1">
      <edu-layout type="table" :extHeight="50" topName="竞赛项目">
        <veStuChange slot="table"></veStuChange>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="团队报名" key="2">
      <edu-layout type="table" :extHeight="50" topName="团队报名">
        <veStuChangeZy slot="table"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="个人报名" key="3">
      <edu-layout type="table" :extHeight="50" topName="个人报名">
        <veStuChangeBack slot="table"></veStuChangeBack>
      </edu-layout>
    </a-tab-pane>
	<a-tab-pane tab="成绩管理" key="4">
	  <edu-layout type="table" :extHeight="50" topName="成绩管理">
	    <JwJiaocaiInLogList slot="table"></JwJiaocaiInLogList>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="竞赛统计" key="5">
	  <edu-layout type="table" :extHeight="50" topName="竞赛统计">
	    <JwJiaocaiOutLogList slot="table"></JwJiaocaiOutLogList>
	  </edu-layout>
	</a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './VeJwJingsaiProjectList';
import veStuChangeZy from './VeJwJingsaiGroupList';
import veStuChangeBack from './VeJwJingsaiPersonalList';
import JwJiaocaiInLogList from './VeJwJingsaiScoreList';
import JwJiaocaiOutLogList from './VeJwJingsaiProjectStatisticsList';


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
  	  width: 100px;
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
</style>
