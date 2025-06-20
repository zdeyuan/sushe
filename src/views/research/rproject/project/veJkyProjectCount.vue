<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:34:32
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-16 01:36:06
-->
<template>
  <edu-layout type="table">
    <a-tabs slot="table">
      <a-tab-pane key="1" tab="项目统计">
        <projectCount></projectCount>
      </a-tab-pane>
      <a-tab-pane key="2" tab="根据人员统计">
        <projectUserCount></projectUserCount>
      </a-tab-pane>
    </a-tabs>
  </edu-layout>
</template>

<script>
import projectCount from './count/projectCount';
import projectUserCount from './count/projectUserCount';

export default {
  components: {
    projectUserCount,
    projectCount
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
