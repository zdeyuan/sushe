<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-06 16:04:14
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-06 16:10:45
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="维修详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqWeixiuDataForm" labelAlign="right">
        <a-form-model-item label="物品名称" prop="name">
          {{ veHqWeixiuVo.name }}
        </a-form-model-item>
        <a-form-model-item label="维修地点" prop="place">
          {{ veHqWeixiuVo.place }}
        </a-form-model-item>

        <a-form-model-item label="维修方式" prop="type">
          {{ veHqWeixiuVo.type }}
        </a-form-model-item>

        <a-form-model-item label="申请人" prop="applyUser">
          {{ veHqWeixiuVo.applyUserName }}
        </a-form-model-item>
        <a-form-model-item label="经手人" prop="jsUser">
          {{ veHqWeixiuVo.jbUserName }}
        </a-form-model-item>
        <a-form-model-item label="批准人" prop="pjUser">
          {{ veHqWeixiuVo.pjUserName }}
        </a-form-model-item>
        <a-form-model-item label="维修结果" prop="status">
          <edu-dict-text code="wxStatus" :value="veHqWeixiuVo.status"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remark">
          {{ veHqWeixiuVo.name }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqWeixiuApi from '@/views/logistics/ct/api/veHqWeixiuApi';

export default {
  components: {},
  data() {
    const data = {
      veHqWeixiuVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      veHqWeixiuApi.get(row.id).then(res => {
        this.veHqWeixiuVo = res.result;
      });
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
