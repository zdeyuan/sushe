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
    <a-tab-pane tab="生成补考名单" key="first">
      <edu-layout type="table" :extHeight="50" topName="生成补考名单">
        <veStuChange slot="table"></veStuChange>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="补考学生查询" key="second">
      <edu-layout type="table" :extHeight="50" topName="补考学生查询">
        <veStuChangeZy slot="table"></veStuChangeZy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="补考考试管理" key="third">
      <edu-layout type="table" :extHeight="50" topName="补考考试管理">
        <veStuChangeBack slot="table"></veStuChangeBack>
      </edu-layout>
    </a-tab-pane>
	<a-tab-pane tab="补考监考管理" key="fse">
	  <edu-layout type="table" :extHeight="50" topName="补考监考管理">
	    <veJwBkJiankaoList slot="table"></veJwBkJiankaoList>
	  </edu-layout>
	</a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuChange from './VeJwCjBukaoList';
import veStuChangeZy from './VeJwBkXueshengList';
import veStuChangeBack from './VeJwBukaoList';
import veJwBkJiankaoList from './VeJwBkJiankaoList';

export default {
  components: {
    veStuChange,
    veStuChangeZy,
    veStuChangeBack,
	veJwBkJiankaoList
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
  ::v-deep .common-layout{
  	  padding:0 15px!important;
  }
  ::v-deep .ant-tabs-bar{
  	  margin-bottom:0;
  }
  ::v-deep .ant-form-item-control{
	  width: 200px !important;
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
