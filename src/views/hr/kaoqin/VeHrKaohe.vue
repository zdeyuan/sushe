
<template>
  <a-card :bordered="false">
    <div class="flex-column">
      <a-tabs class="tabs-inside" @change="onTabChange">
        <a-tab-pane key="1" tab="考核信息管理">
            <ve-hr-kaohe-manager-list />
        </a-tab-pane>
        <a-tab-pane key="2" tab="考核记录查询">
            <ve-hr-kaohe-list />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>
</template>

<script>
import VeHrKaoheList from './VeHrKaoheList.vue'
import VeHrKaoheManagerList from './VeHrKaoheManagerList.vue'
export default {
  components: {VeHrKaoheList, VeHrKaoheManagerList },
  data() {
    return {
      activeKey:0,
      grayTab:'考情考核管理>考核管理',
      tabPaths: ['>考核信息管理','>考核记录查询'],
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