<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-04-05 11:36:43
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-05 15:50:06
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="a-低耗品管理详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqHaopinDataForm" labelAlign="right">
        <a-form-model-item label="物品编号">
          {{ veHqHaopinVo.code }}
        </a-form-model-item>
        <a-form-model-item label="物品名称">
          {{ veHqHaopinVo.name }}
        </a-form-model-item>
        <a-form-model-item label="物品描述">
          {{ veHqHaopinVo.remark }}
        </a-form-model-item>
        <a-form-model-item label="计划使用年限">
          {{ veHqHaopinVo.jhsynx }}
        </a-form-model-item>
        <a-form-model-item label="物品单价">
          {{ veHqHaopinVo.wpdj }}
        </a-form-model-item>
        <a-form-model-item label="品牌">
          {{ veHqHaopinVo.wppp }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqHaopinApi from '@/views/logistics/bx/api/veHqHaopinApi';

export default {
  components: {},
  data() {
    const data = {
      veHqHaopinVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veHqHaopinVo = Object.assign({}, row);
      //    veHqHaopinApi.get(row.id).then((res) => {
      //      this.veHqHaopinVo = res.result
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
