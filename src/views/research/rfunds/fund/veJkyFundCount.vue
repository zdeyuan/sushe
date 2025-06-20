<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:34:32
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 08:43:11
-->
<template>
  <edu-layout type="table">
    <a-tabs slot="table">
      <a-tab-pane key="1" tab="预算统计">
        <fundCount></fundCount>
      </a-tab-pane>
      <a-tab-pane key="2" tab="报销统计">
        <claimCount></claimCount>
      </a-tab-pane>
    </a-tabs>
  </edu-layout>
</template>

<script>
import fundCount from './count/fundCount';
import claimCount from './count/claimCount';

export default {
  components: {
    fundCount,
    claimCount
  },
  data() {
    const data = {};
    return data;
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
