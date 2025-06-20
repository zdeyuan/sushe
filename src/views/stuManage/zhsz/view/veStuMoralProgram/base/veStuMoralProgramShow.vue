<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-18 17:42:55
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-20 20:46:02
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="德育计划详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuMoralProgramDataForm" labelAlign="right">
        <a-form-model-item label="计划标题">
          {{ veStuMoralProgramVo.title }}
        </a-form-model-item>
        <a-form-model-item label="内容">
          <div class="dhtml">
            <div v-html="veStuMoralProgramVo.content"></div>
          </div>
        </a-form-model-item>
        <a-form-model-item label="是否发布">
          <edu-dict-text code="statusFb" :value="veStuMoralProgramVo.status"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="发布时间">
          {{ veStuMoralProgramVo.status == 1 ? veStuMoralProgramVo.pushTime : '---' }}
        </a-form-model-item>
        <a-form-model-item label="发布人">
          {{ veStuMoralProgramVo.status == 1 ? veStuMoralProgramVo.pushUserName : '---' }}
        </a-form-model-item>
        <a-form-model-item label="是否所有人员">
          <edu-dict-text code="shifou" :value="veStuMoralProgramVo.isAll"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="接收教师" v-if="veStuMoralProgramVo.isAll == 0">
          {{ veStuMoralProgramVo.userNames }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuMoralProgramApi from '../../../api/veStuMoralProgramApi';

export default {
  components: {},
  data() {
    const data = {
      veStuMoralProgramVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuMoralProgramVo = Object.assign({}, row);
      //    veStuMoralProgramApi.get(row.id).then((res) => {
      //      this.veStuMoralProgramVo = res.result
      // });
    },
    /**
     * @msg: 编辑页取消
     */
    handelCancel() {
      this.$emit('onCancel');
    }
  }
};
</script>
<style lang="less" scoped></style>
