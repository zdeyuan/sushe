<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-13 22:33:03
-->
<template>
  <edu-layout type="table">
    <veStuStipend viewType="my" slot="table"></veStuStipend>
  </edu-layout>
</template>

<script>
import veStuStipend from './base/veStuStipend';
export default {
  components: {
    veStuStipend
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
