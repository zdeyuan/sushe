<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05 14:58:45
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-05 15:06:11
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="安保记录详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqAnbaoDataForm" labelAlign="right">
        <a-form-model-item label="记录时间" prop="jlTime">
          {{ veHqAnbaoVo.jlTime }}
        </a-form-model-item>
        <a-form-model-item label="记录人姓名" prop="hqUserId">
          {{ veHqAnbaoVo.userName }}
        </a-form-model-item>
        <a-form-model-item label="安保状态" prop="jllx">
          <edu-dict-text code="anbaozStatus" :value="veHqAnbaoVo.jllx"></edu-dict-text>
        </a-form-model-item>
        <a-form-model-item label="详细说明" prop="remark">
          {{ veHqAnbaoVo.remark }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veHqAnbaoApi from '@/views/logistics/base/api/veHqAnbaoApi';

export default {
  components: {},
  data() {
    const data = {
      veHqAnbaoVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      this.veHqAnbaoVo = Object.assign({}, row);
      this.$nextTick(() => {
        this.$refs.veHqAnbaoDataForm.clearValidate();
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
