<!--
 * @since: 2021-03-17 16:42:54
 * @lastTime: 2021-03-20 15:16:31
 * @Description: 教职工页面首页
-->
<template>
  <a-card :bordered="false">

    <a-tabs class="tabs-inside" @change="onTabChange">
      <a-tab-pane key="1" tab="教职工信息">
        <BaseTeacherListFacultyInformation />
      </a-tab-pane>
      <a-tab-pane key="2" tab="师资统计">
        <BaseTeacherListTeacherStatistics />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import BaseTeacherListFacultyInformation from './BaseTeacherListFacultyInformation'
import BaseTeacherListTeacherStatistics from './BaseTeacherListTeacherStatistics'
export default {
  name: 'HqHrChengFa',
  components: { BaseTeacherListFacultyInformation, BaseTeacherListTeacherStatistics },
  data() {
    return {
      activeKey: '1',
      tabPaths: ['教职工信息', '师资统计']
    }
  },
  methods: {
    onTabChange(e) {
      this.activeKey = e
    }
  }
}
</script>

<style></style>
