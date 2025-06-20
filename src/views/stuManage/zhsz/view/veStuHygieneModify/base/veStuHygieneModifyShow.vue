<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="修改申请详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuHygieneModifyDataForm" labelAlign="right">
        <a-form-model-item label="项目Id">
          {{ veStuHygieneModifyVo.itemId }}
        </a-form-model-item>
        <a-form-model-item label="学生Id">
          {{ veStuHygieneModifyVo.stuId }}
        </a-form-model-item>
        <a-form-model-item label="是否修改（0：未修改，1：申请中，2：已修改">
          {{ veStuHygieneModifyVo.status }}
        </a-form-model-item>
        <a-form-model-item label="申请修改原因">
          {{ veStuHygieneModifyVo.reason }}
        </a-form-model-item>
        <a-form-model-item label="修改人">
          {{ veStuHygieneModifyVo.modifyUser }}
        </a-form-model-item>
        <a-form-model-item label="修改人">
          {{ veStuHygieneModifyVo.modifyUserName }}
        </a-form-model-item>
        <a-form-model-item label="修改日志">
          {{ veStuHygieneModifyVo.modifyTime }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuHygieneModifyApi from '../../../api/veStuHygieneModifyApi';

export default {
  components: {},
  data() {
    const data = {
      veStuHygieneModifyVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuHygieneModifyVo = Object.assign({}, row);
      //    veStuHygieneModifyApi.get(row.id).then((res) => {
      //      this.veStuHygieneModifyVo = res.result
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
