<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="修改申请详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuCheckModifyDataForm" labelAlign="right">
        <a-form-model-item label="项目Id">
          {{ veStuCheckModifyVo.itemId }}
        </a-form-model-item>
        <a-form-model-item label="学生Id">
          {{ veStuCheckModifyVo.stuId }}
        </a-form-model-item>
        <a-form-model-item label="是否修改（0：未修改，1：申请中，2：已修改">
          {{ veStuCheckModifyVo.status }}
        </a-form-model-item>
        <a-form-model-item label="申请修改原因">
          {{ veStuCheckModifyVo.reason }}
        </a-form-model-item>
        <a-form-model-item label="修改人">
          {{ veStuCheckModifyVo.modifyUser }}
        </a-form-model-item>
        <a-form-model-item label="修改人">
          {{ veStuCheckModifyVo.modifyUserName }}
        </a-form-model-item>
        <a-form-model-item label="修改日志">
          {{ veStuCheckModifyVo.modifyTime }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuCheckModifyApi from '../../../api/veStuCheckModifyApi';

export default {
  components: {},
  data() {
    const data = {
      veStuCheckModifyVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuCheckModifyVo = Object.assign({}, row);
      //    veStuCheckModifyApi.get(row.id).then((res) => {
      //      this.veStuCheckModifyVo = res.result
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
