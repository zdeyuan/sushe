<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="检查指标详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuCheckNormDataForm" labelAlign="right">
        <a-form-model-item label="指标类型">
          {{ veStuCheckNormVo.type }}
        </a-form-model-item>
        <a-form-model-item label="指标名称">
          {{ veStuCheckNormVo.name }}
        </a-form-model-item>
        <a-form-model-item label="指标描述">
          {{ veStuCheckNormVo.description }}
        </a-form-model-item>
        <a-form-model-item label="排序字段">
          {{ veStuCheckNormVo.listSort }}
        </a-form-model-item>
        <a-form-model-item label="父Id">
          {{ veStuCheckNormVo.pid }}
        </a-form-model-item>
        <a-form-model-item label="路径">
          {{ veStuCheckNormVo.path }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuCheckNormApi from '../../api/veStuCheckNormApi';

export default {
  components: {},
  data() {
    const data = {
      veStuCheckNormVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuCheckNormVo = Object.assign({}, row);
      //    veStuCheckNormApi.get(row.id).then((res) => {
      //      this.veStuCheckNormVo = res.result
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
