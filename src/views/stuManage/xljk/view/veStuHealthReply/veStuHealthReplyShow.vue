<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="保险理赔咨询回复详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuHealthReplyDataForm" labelAlign="right">
        <a-form-model-item label="回复内容">
          {{ veStuHealthReplyVo.answer }}
        </a-form-model-item>
        <a-form-model-item label="咨询内容Id">
          {{ veStuHealthReplyVo.aId }}
        </a-form-model-item>
        <a-form-model-item label="回复人Id">
          {{ veStuHealthReplyVo.answerUserId }}
        </a-form-model-item>
        <a-form-model-item label="">
          {{ veStuHealthReplyVo.answerUserName }}
        </a-form-model-item>
        <a-form-model-item label="回复时间">
          {{ veStuHealthReplyVo.answerTime }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuHealthReplyApi from '../../api/veStuHealthReplyApi';

export default {
  components: {},
  data() {
    const data = {
      veStuHealthReplyVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuHealthReplyVo = Object.assign({}, row);
      //    veStuHealthReplyApi.get(row.id).then((res) => {
      //      this.veStuHealthReplyVo = res.result
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
