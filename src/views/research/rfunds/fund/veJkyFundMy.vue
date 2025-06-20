<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 08:41:05
-->
<template>
  <edu-layout type="table">
    <veJkyFund viewType="my" slot="table"></veJkyFund>
  </edu-layout>
</template>

<script>
import veJkyFund from './base/veJkyFund';
export default {
  components: {
    veJkyFund
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
