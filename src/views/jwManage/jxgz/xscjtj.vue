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
    <a-tab-pane tab="统计设置" key="1">
      <edu-layout type="table" :extHeight="50" topName="统计设置">
        <veStuChange slot="table"></veStuChange>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="重要考试查看" key="2">
      <edu-layout type="table" :extHeight="50" topName="重要考试查看">
        <veStuChangeZy slot="table"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane>
	<a-tab-pane tab="及格率统计" key="3">
	  <edu-layout type="table" :extHeight="50" topName="及格率统计">
	    <classDetail slot="table"></classDetail>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="成绩分析" key="4">
	  <edu-layout type="table" :extHeight="50" topName="成绩分析">
	    <VeJwCjfx slot="table"></VeJwCjfx>
	  </edu-layout>
	</a-tab-pane>
	<a-tab-pane tab="成绩查询" key="5">
	  <edu-layout type="table" :extHeight="50" topName="成绩查询">
	    <VeJwChengjiList slot="table"></VeJwChengjiList>
	  </edu-layout>
	</a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './VeJwTjSettingList';
import veStuChangeZy from './VeJwZyks';
import classDetail from './VeJwTjJigeList';
import VeJwCjfx from './VeJwCjfx';
import VeJwChengjiList from './VeJwChengjiList';

export default {
  components: {
    veStuChange,
    veStuChangeZy,
	classDetail,
	VeJwCjfx,
	VeJwChengjiList
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
 ::v-deep .common-layout,::v-deep .ant-card-body{
 	padding: 0 15px!important;
 }
  
  ::v-deep .button_default{
  	  height: 40px;
  	  position: relative;
	  top: 2px;
  }
  
  
  ::v-deep th{
  	  background: #66C3FD;
	  font-size: 20px;
	  font-weight: 700;
	  color: white;
  	  width: 200px;
  	  text-align: center;
  }
  
  
  ::v-deep p{
  	  margin-bottom: 5px;
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
