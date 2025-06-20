<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="惩罚类型详情" :isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuPunishTypeDataForm" labelAlign="right">
        <a-form-model-item label="名称">
          {{ veStuPunishTypeVo.title }}
        </a-form-model-item>
        <a-form-model-item label="代码，同一终端唯一">
          {{ veStuPunishTypeVo.code }}
        </a-form-model-item>
        <a-form-model-item label="状态;1启用2禁用">
          {{ veStuPunishTypeVo.status }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuPunishTypeApi from '../../api/veStuPunishTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuPunishTypeVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuPunishTypeVo = Object.assign({}, row);
      //    veStuPunishTypeApi.get(row.id).then((res) => {
      //      this.veStuPunishTypeVo = res.result
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
