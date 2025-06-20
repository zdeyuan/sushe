<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:36:16
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-20 21:39:36
-->
<template>
  <a-tabs class="auto-tabs">
    <a-tab-pane tab="文体计划管理" key="fir1s3t" v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="文体计划管理">
        <veStuLiteraryProgramAdmin slot="table"></veStuLiteraryProgramAdmin>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="文体计划查询" key="firs4t">
      <edu-layout type="table" :extHeight="50" topName="文体计划查询">
        <veStuLiteraryProgramMy slot="table"></veStuLiteraryProgramMy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="文体活动管理" key="f6irs1t">
      <edu-layout type="table" :extHeight="50" topName="文体活动管理">
        <veStuLiteraryActiveAdmin slot="table"></veStuLiteraryActiveAdmin>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="文体活动查询" key="fi3rs2t">
      <edu-layout type="table" :extHeight="50" topName="文体活动查询">
        <veStuLiteraryActiveMy slot="table"></veStuLiteraryActiveMy>
      </edu-layout>
    </a-tab-pane>

    <a-tab-pane tab="文体获奖管理" key="fi5rs5t">
      <edu-layout type="table" :extHeight="50" topName="文体获奖管理">
        <veStuLiteraryAwardAdmin slot="table"></veStuLiteraryAwardAdmin>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="文体奖项管理" key="fir1s6t"  v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="文体奖项管理" >
        <veStuLiteraryAwardItem slot="table"></veStuLiteraryAwardItem>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="文体获奖查询" key="fir2s46t">
      <edu-layout type="table" :extHeight="50" topName="文体获奖查询">
        <veStuLiteraryAwardMy slot="table"></veStuLiteraryAwardMy>
      </edu-layout>
    </a-tab-pane>
    <a-tab-pane tab="文体获奖审核" key="f4irs46t"  v-if="$hasPer(['system'])">
      <edu-layout type="table" :extHeight="50" topName="文体获奖审核" >
        <veStuLiteraryAwardShen slot="table"></veStuLiteraryAwardShen>
      </edu-layout>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import veStuLiteraryActiveMy from '../view/veStuLiteraryActive/veStuLiteraryActiveMy';
import veStuLiteraryActiveAdmin from '../view/veStuLiteraryActive/veStuLiteraryActiveAdmin';
import veStuLiteraryProgramAdmin from '../view/veStuLiteraryProgram/veStuLiteraryProgramAdmin';
import veStuLiteraryProgramMy from '../view/veStuLiteraryProgram/veStuLiteraryProgramMy';
import veStuLiteraryAwardItem from '../view/veStuLiteraryAwardItem/veStuLiteraryAwardItem';

import veStuLiteraryAwardAdmin from '../view/veStuLiteraryAward/veStuLiteraryAwardAdmin';
import veStuLiteraryAwardMy from '../view/veStuLiteraryAward/veStuLiteraryAwardMy';
import veStuLiteraryAwardShen from '../view/veStuLiteraryAward/veStuLiteraryAwardShen';

export default {
  components: {
    veStuLiteraryActiveAdmin,
    veStuLiteraryActiveMy,
    veStuLiteraryProgramAdmin,
    veStuLiteraryProgramMy,
    veStuLiteraryAwardItem,
    veStuLiteraryAwardAdmin,
    veStuLiteraryAwardMy,
    veStuLiteraryAwardShen
  },
  data() {
    return {
      activeName: 'fir1s3t'
    };
  },
  mounted() {},
  methods: {}
};
</script>
