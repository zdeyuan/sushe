<!--
 * @since: 2021-03-17 16:42:54
 * @lastTime: 2021-03-20 15:25:11
 * @Description: 合同管理首页
-->
<template>
  <a-card :bordered="false">
    <a-tabs class="tabs-inside" @change="onTabChange">
      <a-tab-pane key="1" tab="合同管理">
        <VeHrHetongManageList />
      </a-tab-pane>
      <a-tab-pane key="2" tab="合同查询">
        <VeHrHetongList />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import VeHrHetongList from './VeHrHetongList'
import VeHrHetongManageList from './VeHrHetongManageList'
export default {
  name: 'HqHrChengFa',
  components: { VeHrHetongList, VeHrHetongManageList },
  data() {
    return {
      activeKey: '1',
      tabPaths: ['合同管理', '合同查询'],
    }
  },
  methods: {
    onTabChange(e) {
      this.activeKey = e
    },
  },
}
</script>

<style></style>
