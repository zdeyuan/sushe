<template>
  <a-card :bordered="false">
    <div class="flex-column">
      <a-tabs class="tabs-inside" @change="onTabChange">
        <a-tab-pane key="1" tab="奖励管理">
          <hq-hr-jiang-li-manager-list />
        </a-tab-pane>
        <a-tab-pane key="2" tab="奖励查询">
          <hq-hr-jiangli-list />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import HqHrJiangliList from './HqHrJiangliList.vue'
import HqHrJiangLiManagerList from './HqHrJiangLiManagerList.vue'
export default {
  components: { HqHrJiangliList, HqHrJiangLiManagerList },
  data() {
    return {
      activeKey:0,
      grayTab:'奖惩管理>奖励管理',
      tabPaths: ['>奖励管理','>奖励查询'],
    }
  },
  methods:{
     onTabChange(e){
      this.activeKey=e-1
    }
  }
}
</script>

<style>
</style>