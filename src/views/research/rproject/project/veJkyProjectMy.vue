<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:34:32
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-20 13:50:18
-->
<template>
  <edu-layout type="table">
    <a-tabs slot="table">
      <a-tab-pane key="1" tab="已完成项目">
        <veJkyProject viewType="over"></veJkyProject>
      </a-tab-pane>
      <a-tab-pane key="2" tab="未完成项目">
        <veJkyProject viewType="wait"></veJkyProject>
      </a-tab-pane>
    </a-tabs>
  </edu-layout>
</template>

<script>
import veJkyProject from './base/veJkyProject';

export default {
  components: {
    veJkyProject
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
