<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 12:22:28
-->
<template>
  <edu-layout type="table">
    <veJkyFundClaim viewType="my" slot="table"></veJkyFundClaim>
  </edu-layout>
</template>

<script>
import veJkyFundClaim from './base/veJkyFundClaim';
export default {
  components: {
    veJkyFundClaim
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
