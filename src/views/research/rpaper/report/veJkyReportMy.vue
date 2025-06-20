<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-13 18:39:21
-->
<template>
  <edu-layout type="table">
    <veJkyReport viewType="my" slot="table"></veJkyReport>
  </edu-layout>
</template>

<script>
import veJkyReport from './base/veJkyReport';
export default {
  components: {
    veJkyReport
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
