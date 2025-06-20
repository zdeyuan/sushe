<template>
  <a-card :bordered="false">
    <div class="flex-column">
      <a-tabs class="tabs-inside" @change="onTabChange">
        <a-tab-pane key="1" tab="惩罚管理">
          <hq-hr-cheng-fa-manager-list />
        </a-tab-pane>
        <a-tab-pane key="2" tab="惩罚查询">
          <hq-hr-chengfa-list />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import HqHrChengfaList from './HqHrChengfaList.vue'
import HqHrChengFaManagerList from './HqHrChengFaManagerList.vue'
export default {
  name:'HqHrChengFa',
  components: { HqHrChengfaList, HqHrChengFaManagerList },
  data() {
    return {
      activeKey:0,
      grayTab:'奖惩管理>惩罚管理',
      tabPaths: ['>惩罚管理','>惩罚查询'],
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