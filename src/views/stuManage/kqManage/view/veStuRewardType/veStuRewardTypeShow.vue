<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="奖励类型详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuRewardTypeDataForm" labelAlign="right">
        <a-form-model-item label="奖励名称">
          {{ veStuRewardTypeVo.title }}
        </a-form-model-item>
        <a-form-model-item label="奖励代码，同一终端唯一">
          {{ veStuRewardTypeVo.code }}
        </a-form-model-item>
        <a-form-model-item label="奖励级别">
          {{ veStuRewardTypeVo.level }}
        </a-form-model-item>
        <a-form-model-item label="奖励属性;1个人2集体">
          {{ veStuRewardTypeVo.attribute }}
        </a-form-model-item>
        <a-form-model-item label="状态;1启用2禁用">
          {{ veStuRewardTypeVo.status }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuRewardTypeApi from '../../api/veStuRewardTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuRewardTypeVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuRewardTypeVo = Object.assign({}, row);
      //    veStuRewardTypeApi.get(row.id).then((res) => {
      //      this.veStuRewardTypeVo = res.result
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
