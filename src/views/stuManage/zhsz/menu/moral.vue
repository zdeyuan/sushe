<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-18 18:20:23
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="德育计划管理" key="firs1t" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="德育计划管理">
        <veStuMoralProgramAdmin slot="table"></veStuMoralProgramAdmin>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="德育计划查询" key="firs2t">
      <edu-layout type="table" :extHeight="50" topName="德育计划查询">
        <veStuMoralProgramMy slot="table"></veStuMoralProgramMy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="德育活动管理" key="firs3t">
      <edu-layout type="table" :extHeight="50" topName="德育活动管理">
        <veStuMoralActiveAdmin slot="table"></veStuMoralActiveAdmin>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="德育活动查询" key="firs4t">
      <edu-layout type="table" :extHeight="50" topName="德育活动查询">
        <veStuMoralActiveMy slot="table"></veStuMoralActiveMy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="德育资源管理" key="firs5t"  v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="德育资源管理">
        <veStuMoralResourceAdmin slot="table"></veStuMoralResourceAdmin>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="德育资源查询" key="firs6t">
      <edu-layout type="table" :extHeight="50" topName="德育资源查询">
        <veStuMoralResourceMy slot="table"></veStuMoralResourceMy>
      </edu-layout>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuMoralProgramAdmin from '../view/veStuMoralProgram/veStuMoralProgramAdmin';
import veStuMoralProgramMy from '../view/veStuMoralProgram/veStuMoralProgramMy';
import veStuMoralActiveAdmin from '../view/veStuMoralActive/veStuMoralActiveAdmin';
import veStuMoralActiveMy from '../view/veStuMoralActive/veStuMoralActiveMy';
import veStuMoralResourceAdmin from '../view/veStuMoralResource/veStuMoralResourceAdmin';
import veStuMoralResourceMy from '../view/veStuMoralResource/veStuMoralResourceMy';

export default {
  components: {
    veStuMoralProgramAdmin,
    veStuMoralProgramMy,
    veStuMoralActiveAdmin,
    veStuMoralActiveMy,
    veStuMoralResourceAdmin,
    veStuMoralResourceMy
  },
  data() {
    return {
      activeName: 'firs1t'
    };
  },
  mounted() {},
  methods: {}
};
</script>
