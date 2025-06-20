<!--
 * @since: 2021-03-17 16:42:54
 * @lastTime: 2021-03-20 15:17:20
 * @Description: 家庭信息首页
-->
<template>
  <a-card :bordered="false">
    <a-tabs class="tabs-inside" @change="onTabChange">
      <a-tab-pane key="1" tab="家庭信息管理">
        <VeHrJiatingManageList />
      </a-tab-pane>
      <a-tab-pane key="2" tab="家庭信息查询">
        <VeHrJiatingList />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import VeHrJiatingList from './VeHrJiatingList'
import VeHrJiatingManageList from './VeHrJiatingManageList'
export default {
  name: 'HqHrChengFa',
  components: { VeHrJiatingList, VeHrJiatingManageList },
  data() {
    return {
      activeKey: '1',
      tabPaths: ['家庭信息管理', '家庭信息查询'],
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
