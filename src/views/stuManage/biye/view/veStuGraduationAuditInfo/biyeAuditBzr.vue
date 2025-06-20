<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-10 21:25:47
-->
<template>
  <edu-layout type="table">
    <veStuGraduationAuditInfo viewType="BZR" slot="table"></veStuGraduationAuditInfo>
  </edu-layout>
</template>

<script>
import veStuGraduationAuditInfo from './base/veStuGraduationAuditInfoBzr';
export default {
  components: {
    veStuGraduationAuditInfo
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
