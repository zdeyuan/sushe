<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-16 11:45:36
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="卫生指标管理" key="firs1t" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="卫生指标管理">
        <veStuHygieneNorm slot="table"></veStuHygieneNorm>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="卫生项目管理" key="firs2t" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="卫生项目管理">
        <veStuHygieneItem slot="table"></veStuHygieneItem>
      </edu-layout>
    </a-tab-pane>
       <a-tab-pane tab="参与的卫生评测项目" key="firs3t" v-if="$hasPer(['bzr'])">
      <edu-layout type="table" :extHeight="50" topName="参与的卫生评测项目">
        <veStuHygieneStudent slot="table"></veStuHygieneStudent>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="申请修改卫生检查" key="firs5t" v-if="$hasPer(['bzr'])">
      <edu-layout type="table" :extHeight="50" topName="申请修改检查">
        <veStuHygieneModifyMy slot="table"></veStuHygieneModifyMy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="审核修改卫生检查" key="firs6t" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="审核修改检查">
        <veStuHygieneModifyAdmin slot="table"></veStuHygieneModifyAdmin>
      </edu-layout>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuHygieneNorm from '../view/veStuHygieneNorm/veStuHygieneNorm';
import veStuHygieneItem from '../view/veStuHygieneItem/veStuHygieneItem';
import veStuHygieneStudent from '../view/veStuHygieneStudent/veStuHygieneStudent';
import veStuHygieneStudentMy from '../view/veStuHygieneStudent/veStuHygieneStudentMy';
import veStuHygieneModifyAdmin from '../view/veStuHygieneModify/veStuHygieneModifyAdmin';
import veStuHygieneModifyMy from '../view/veStuHygieneModify/veStuHygieneModifyMy';

export default {
  components: {
    veStuHygieneNorm,
    veStuHygieneItem,
    veStuHygieneStudent,
    veStuHygieneStudentMy,
    veStuHygieneModifyAdmin,
    veStuHygieneModifyMy
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