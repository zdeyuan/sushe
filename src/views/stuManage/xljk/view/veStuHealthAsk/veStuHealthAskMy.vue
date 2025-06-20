<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-01 18:38:52
-->
<template>
  <edu-layout type="table">
    <veStuHealthAsk viewType="my" slot="table"></veStuHealthAsk>
  </edu-layout>
</template>

<script>
import veStuHealthAsk from './base/veStuHealthAsk';
export default {
  components: {
    veStuHealthAsk
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
