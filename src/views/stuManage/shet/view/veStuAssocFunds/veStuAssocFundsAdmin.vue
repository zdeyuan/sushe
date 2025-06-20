<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-22 23:11:56
-->
<template>
  <edu-layout type="table">
    <veStuAssocFunds viewType="admin" slot="table"></veStuAssocFunds>
  </edu-layout>
</template>

<script>
import veStuAssocFunds from './base/veStuAssocFunds';
export default {
  components: {
    veStuAssocFunds
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
