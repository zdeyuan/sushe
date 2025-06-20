<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="库存详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veHqWupinDataForm" labelAlign="right">
        <a-form-model-item label="仓库名称" prop="jhsynx">
          {{ veHqWupinVo.ckName }}
        </a-form-model-item>
        <a-form-model-item label="物品名称" prop="remark">
          {{ veHqWupinVo.wpName }}
        </a-form-model-item>
        <a-form-model-item label="库存数量" prop="remark">
          {{ veHqWupinVo.number }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    const data = {
      veHqWupinVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doUpdate(row) {
      this.veHqWupinVo = Object.assign({}, row);
      this.$nextTick(() => {
        this.$refs.uploadFiles.setValue(row.id);
        this.$refs.veHqWupinDataForm.clearValidate();
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
