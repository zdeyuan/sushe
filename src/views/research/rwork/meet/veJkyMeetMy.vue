<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:34:32
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 15:37:33
-->
<template>
  <edu-layout type="table">
    <a-tabs slot="table">
      <a-tab-pane key="1" tab="我参加的会议">
        <veJkyMeet viewType="apply"></veJkyMeet>
      </a-tab-pane>
      <a-tab-pane key="2" tab="我申请的会议">
        <veJkyMeet viewType="my"></veJkyMeet>
      </a-tab-pane>
    </a-tabs>
  </edu-layout>
</template>

<script>
import veJkyMeet from './base/veJkyMeet';

export default {
  components: {
    veJkyMeet
  }
};
</script>
