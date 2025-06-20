<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form title="考勤类型详情" width="1073px":isShowBtnSure="false" @cancel="handelCancel">
      <a-form-model ref="veStuCheckTypeDataForm" labelAlign="right">
        <a-form-model-item label="名称">
          {{ veStuCheckTypeVo.title }}
        </a-form-model-item>
        <a-form-model-item label="代码，同一终端唯一">
          {{ veStuCheckTypeVo.code }}
        </a-form-model-item>
        <a-form-model-item label="状态;1启用2禁用">
          {{ veStuCheckTypeVo.status }}
        </a-form-model-item>
        <a-form-model-item label="1正常，0为异常">
          {{ veStuCheckTypeVo.kqType }}
        </a-form-model-item>
      </a-form-model>
    </edu-form>
  </div>
</template>

<script>
import veStuCheckTypeApi from '../../api/veStuCheckTypeApi';

export default {
  components: {},
  data() {
    const data = {
      veStuCheckTypeVo: {}
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 初始化修改
     */
    doShow(row) {
      this.veStuCheckTypeVo = Object.assign({}, row);
      //    veStuCheckTypeApi.get(row.id).then((res) => {
      //      this.veStuCheckTypeVo = res.result
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
