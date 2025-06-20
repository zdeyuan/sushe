<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="奖励信息详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuRewardDataForm" labelAlign="right">
        <a-form-model-item label="奖励类型">
          {{ veStuRewardVo.typeName }}
        </a-form-model-item>
        <a-form-model-item label="申请材料">
			<uploadFiles ref="uploadFiles" :edit="true" serviceType="stuReward" />
        </a-form-model-item>
        <a-form-model-item label="获奖时间">
          {{ veStuRewardVo.rewardTime }}
        </a-form-model-item>
        <a-form-model-item label="获奖描述">
          {{ veStuRewardVo.content }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuRewardApi from '../../api/veStuRewardApi';
import uploadFiles from '@/components/kqManageComponent/uploadFiles';
export default {
  components: {uploadFiles},
  data() {
    const data = {
      veStuRewardVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuRewardVo = Object.assign({}, row);
	  this.$refs.uploadFiles.setValue(row.id);
      //    veStuRewardApi.get(row.id).then((res) => {
      //      this.veStuRewardVo = res.result
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
