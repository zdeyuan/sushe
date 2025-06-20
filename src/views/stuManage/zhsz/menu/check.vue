<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-16 11:45:16
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="指标管理" key="firs1t" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="指标管理" >
        <veStuCheckNorm slot="table"></veStuCheckNorm>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="项目管理" key="firs2t"  v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="项目管理">
        <veStuCheckItem slot="table"></veStuCheckItem>
      </edu-layout>
    </a-tab-pane>
     <a-tab-pane tab="参与的评测项目" key="firs3t" v-if="$hasPer(['bzr'])">
      <edu-layout type="table" :extHeight="50" topName="参与的评测项目">
        <veStuCheckStudent slot="table"></veStuCheckStudent>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="申请修改检查" key="firs5t">
      <edu-layout type="table" :extHeight="50" topName="申请修改检查">
        <veStuCheckModifyMy slot="table"></veStuCheckModifyMy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="审核修改检查" key="firs6t"  v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="审核修改检查">
        <veStuCheckModifyAdmin slot="table"></veStuCheckModifyAdmin>
      </edu-layout>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuCheckNorm from '../view/veStuCheckNorm/veStuCheckNorm';
import veStuCheckItem from '../view/veStuCheckItem/veStuCheckItem';
import veStuCheckStudentMy from '../view/veStuCheckStudent/veStuCheckStudentMy';
import veStuCheckItemTea from '../view/veStuCheckItem/veStuCheckItemTea';
import veStuCheckStudent from '../view/veStuCheckStudent/veStuCheckStudent';
import veStuCheckModifyAdmin from '../view/veStuCheckModify/veStuCheckModifyAdmin';
import veStuCheckModifyMy from '../view/veStuCheckModify/veStuCheckModifyMy';

export default {
  components: {
    veStuCheckNorm,
    veStuCheckItem,
    veStuCheckItemTea,
    veStuCheckStudent,
    veStuCheckStudentMy,
    veStuCheckModifyAdmin,
    veStuCheckModifyMy
  },
  data() {
    return {
      activeName: 'firs1t'
    };
  },
  mounted() {},
  methods: {}
};
</script>
