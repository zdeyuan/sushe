<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-05-02 09:49:46
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-05-02 09:57:15
-->
<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="检查指标详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuHygieneNormDataForm" labelAlign="right">
        <a-form-model-item label="指标类型">
          {{ veStuHygieneNormVo.type }}
        </a-form-model-item>
        <a-form-model-item label="指标名称">
          {{ veStuHygieneNormVo.name }}
        </a-form-model-item>
        <a-form-model-item label="指标描述">
          {{ veStuHygieneNormVo.description }}
        </a-form-model-item>
        <a-form-model-item label="排序字段">
          {{ veStuHygieneNormVo.listSort }}
        </a-form-model-item>
        <a-form-model-item label="父Id">
          {{ veStuHygieneNormVo.pid }}
        </a-form-model-item>
        <a-form-model-item label="路径">
          {{ veStuHygieneNormVo.path }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuHygieneNormApi from '../../api/veStuHygieneNormApi';

export default {
  components: {},
  data() {
    const data = {
      veStuHygieneNormVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuHygieneNormVo = Object.assign({}, row);
      //    veStuHygieneNormApi.get(row.id).then((res) => {
      //      this.veStuHygieneNormVo = res.result
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
